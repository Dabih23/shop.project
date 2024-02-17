"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
var express_1 = __importDefault(require("express"));
var comments_api_1 = require("./src/api/comments-api");
var products_api_1 = require("./src/api/products-api");
function default_1(dbConnection) {
    var app = (0, express_1.default)();
    app.use(express_1.default.json());
    exports.connection = dbConnection;
    app.use('/comments', comments_api_1.commentsRouter);
    app.use('/products', products_api_1.productsRouter);
    return app;
}
exports.default = default_1;
//# sourceMappingURL=index.js.map