"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_controller_1 = require("./controllers/products.controller");
var express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
function default_1() {
    var app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.set("view engine", "ejs");
    app.set("views", "Shop.Admin/views");
    app.use(express_ejs_layouts_1.default);
    app.use(express_1.default.static(__dirname + "/public"));
    app.use("/", products_controller_1.productsRouter);
    return app;
}
exports.default = default_1;
//# sourceMappingURL=index.js.map