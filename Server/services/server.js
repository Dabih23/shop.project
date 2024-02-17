"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = void 0;
var express_1 = __importDefault(require("express"));
var host = process.env.LOCAL_HOST;
var port = Number(process.env.LOCAL_PORT);
function initServer() {
    var app = (0, express_1.default)();
    var jsonMiddleware = express_1.default.json();
    app.use(jsonMiddleware);
    app.listen(port, host, function () {
        console.log("Server running on port ".concat(port));
    });
    return app;
}
exports.initServer = initServer;
//# sourceMappingURL=server.js.map