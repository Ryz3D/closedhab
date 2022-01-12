const fs = require("fs");
const express = require("express");
const yaml = require('js-yaml');
const { log, warn, error } = require("../../out");

var ctx;
var app, listener;
const publicDir = "./setup/addons/close/public/";
const layoutDir = "./setup/addons/close/layouts/";
const layoutExt = ".yaml";
const layoutParser = yaml.load;

function checkAuth(req, res) {
    if (ctx.setup.auth) {
        const result = req.headers.authorization === ctx.setup.auth;
        if (!result) {
            res.sendStatus(403);
        }
        return result;
    }
    else {
        return true;
    }
}

function cors(req, res) {
    if (ctx.setup.cors) {
        if (ctx.setup.cors === "echo") {
            res.set("Access-Control-Allow-Origin", req.headers.origin);
        }
        else {
            res.set("Access-Control-Allow-Origin", ctx.setup.cors);
        }
        res.set("Access-Control-Allow-Headers", ["Authorization"]);
        res.set("Access-Control-Allow-Credentials", "true");
    }
}

function options(req, res) {
    cors(req, res);
    res.end();
}

function run(c) {
    ctx = c;
    startRetries = 0;

    const varForwConvs = {};
    const varBackConvs = {};
    for (var e of Object.entries(ctx.setup.converters)) {
        varForwConvs[e[0]] = [];
        for (var c of Object.values(e[1].forwardConverters || {})) {
            const idBuf = c.id;
            const ctxBuf = { ...ctx, setup: c.setup || {} };
            varForwConvs[e[0]].push(v => require(`./${idBuf}.js`).convert(v, ctxBuf));
        }
        varBackConvs[e[0]] = [];
        for (var c of Object.values(e[1].backwardConverters || {})) {
            const idBuf = c.id;
            const ctxBuf = { ...ctx, setup: c.setup || {} };
            varBackConvs[e[0]].push(v => require(`./${idBuf}.js`).convert(v, ctxBuf));
        }
    }

    app = express();

    app.options("/api/layout/list", options);
    app.options("/api/layout/get", options);
    app.options("/api/var/list", options);
    app.options("/api/var/get", options);
    app.options("/api/var/set", options);
    app.options("/api/var/sub", options);
    app.options("/api/setup", options);

    app.get("/api/layout/list", (req, res) => {
        cors(req, res);
        if (!checkAuth(req, res)) {
            return;
        }
        fs.opendir(layoutDir, (e, dir) => {
            if (e) {
                warn(`close: /api/layout/list failed: ${e}`);
                res.json({ error: 1, message: e.toString() });
            }
            else {
                var layouts = [];
                try {
                    while (f = dir.readSync()) {
                        if (f.isFile() && f.name.endsWith(layoutExt)) {
                            layouts.push(f.name.slice(0, -layoutExt.length));
                        }
                    }
                    dir.closeSync();
                    res.json({ error: 0, data: layouts });
                }
                catch (e) {
                    warn(`close: /api/layout/list failed: ${e}`);
                    res.json({ error: 1, message: e.toString() });
                }
            }
        });
    });
    app.get("/api/layout/get", (req, res) => {
        cors(req, res);
        if (!checkAuth(req, res)) {
            return;
        }
        if (req.query.q) {
            const path = `${layoutDir}${decodeURIComponent(req.query.q).replace(/[^\w/_]/g, "")}${layoutExt}`;
            try {
                fs.readFile(path, (e, data) => {
                    if (e) {
                        warn(`close: /api/layout/get couldn't read file "${path}": ${e}`);
                        res.json({ error: 1, message: e.toString() });
                    }
                    else {
                        res.json({ error: 0, data: layoutParser(data.toString("utf-8")) });
                    }
                });
            }
            catch (e) {
                warn(`close: /api/layout/get couldn't read file "${path}": ${e}`);
                res.json({ error: 1, message: e.toString() });
            }
        }
        else {
            warn("close: /api/layout/get needs ?q query for layout path");
            res.json({ error: 1, message: "need ?q query for layout path" });
        }
    });
    app.get("/api/var/list", (req, res) => {
        cors(req, res);
        if (!checkAuth(req, res)) {
            return;
        }
        res.json({ error: 0, data: ctx.listVars().map(v => v.id) });
    });
    app.get("/api/var/get", (req, res) => {
        cors(req, res);
        if (!checkAuth(req, res)) {
            return;
        }
        res.set("Access-Control-Allow-Origin", "*");
        if (req.query.q) {
            const id = decodeURIComponent(req.query.q).replace(/[^\w/_]/g, "");
            const vr = ctx.findVar(id);
            if (vr) {
                if (vr.initialized) {
                    var data = vr.read();
                    for (var f of varBackConvs[vr.id] || []) {
                        data = f(data);
                    }
                    res.json({ error: 0, data });
                }
                else {
                    res.json({ error: 1, message: "uninitialized" });
                }
            }
            else {
                warn(`close: /api/var/get can't find var "${id}"`);
                res.json({ error: 1, message: "not found" });
            }
        }
        else {
            warn("close: /api/var/get needs ?q query for id");
            res.json({ error: 1, message: "need ?q query for id" });
        }
    });
    app.get("/api/var/set", (req, res) => {
        cors(req, res);
        if (!checkAuth(req, res)) {
            return;
        }
        if (req.query.q && req.query.v) {
            const id = decodeURIComponent(req.query.q).replace(/[^\w/_]/g, "");
            var val = decodeURIComponent(req.query.v);
            const vr = ctx.findVar(id);
            if (vr) {
                for (var f of varForwConvs[vr.id] || []) {
                    val = f(val);
                }
                vr.send(val, req.query.f);
                res.json({ error: 0 });
            }
            else {
                warn(`close: /api/var/set can't find var "${id}"`);
                res.json({ error: 1, message: "not found" });
            }
        }
        else {
            warn("close: /api/var/set needs ?q query for id and ?v for value");
            res.json({ error: 1, message: "need ?q query for id and ?v for value" });
        }
    });
    app.get("/api/var/sub", (req, res) => {
        cors(req, res);
        /*
        if (!checkAuth(req, res)) {
            return;
        }
        */
        res.contentType("text/event-stream");
        res.flushHeaders();
        const subClosers = [];
        for (var v of ctx.listVars()) {
            const idBuf = v.id;
            subClosers.push(v.sub(val => {
                for (var f of varBackConvs[idBuf] || []) {
                    val = f(val);
                }
                res.write(`event: ${idBuf}\ndata: ${val}\n\n`);
            }));
        }
        req.on("close", _ => {
            for (var f of subClosers) {
                f();
            }
        });
    });
    app.get("/api/setup", (req, res) => {
        cors(req, res);
        if (!checkAuth(req, res)) {
            return;
        }
        res.json({ error: 0, data: ctx.setup.frontend || {} });
    });

    app.use("/", express.static(publicDir));
    app.use((req, res, next) => {
        res.statusCode = 404;
        if (req.path.startsWith("/api/")) {
            cors(req, res);
            res.json({ error: 1, message: "not found" });
        }
        else {
            if (ctx.setup.notFoundPath) {
                res.redirect(ctx.setup.notFoundPath);
            }
            else {
                res.statusCode = 404;
                res.send("Not Found");
            }
        }
    });

    app.on("error", e => error(`close: Server failed: ${e}`));
    const port = ctx.setup.port || 8080;
    listener = app.listen(port, _ => {
        log(`close: Listening on port ${port}`);
    }).on("error", e => error(`close: Can't start server: ${e}`));
}

function stop() {
    return new Promise(resolve => {
        listener.close();
        app.emit("close");
        setTimeout(resolve, 1000);
    });
}

module.exports = {
    run,
    stop,
};
