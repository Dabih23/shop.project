"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
var express_1 = require("express");
var index_1 = require("../../index");
var uuid_1 = require("uuid");
var helpers_1 = require("../helpers");
var mapping_1 = require("../services/mapping");
var queries_1 = require("../services/queries");
exports.productsRouter = (0, express_1.Router)();
var throwServerError = function (res, e) {
    console.debug(e.message);
    res.status(500);
    res.send("Something went wrong");
};
/**
 * Задание 34.10 – доработанный метод получения списка товаров вместе с изображениями
 */
exports.productsRouter.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productRows, commentRows, imageRows, products, withComments, withImages, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, index_1.connection.query("SELECT * FROM products")];
            case 1:
                productRows = (_a.sent())[0];
                return [4 /*yield*/, index_1.connection.query("SELECT * FROM comments")];
            case 2:
                commentRows = (_a.sent())[0];
                return [4 /*yield*/, index_1.connection.query("SELECT * FROM images")];
            case 3:
                imageRows = (_a.sent())[0];
                products = (0, mapping_1.mapProductsEntity)(productRows);
                withComments = (0, helpers_1.enhanceProductsComments)(products, commentRows);
                withImages = (0, helpers_1.enhanceProductsImages)(withComments, imageRows);
                res.send(withImages);
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                throwServerError(res, e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * Задание 34.10 – доработанный метод поиска товаров вместе с изображениями
 */
exports.productsRouter.get('/search', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, query, values, rows, commentRows, imageRows, products, withComments, withImages, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = (0, helpers_1.getProductsFilterQuery)(req.query), query = _a[0], values = _a[1];
                return [4 /*yield*/, index_1.connection.query(query, values)];
            case 1:
                rows = (_b.sent())[0];
                if (!(rows === null || rows === void 0 ? void 0 : rows.length)) {
                    res.send([]);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, index_1.connection.query("SELECT * FROM comments")];
            case 2:
                commentRows = (_b.sent())[0];
                return [4 /*yield*/, index_1.connection.query("SELECT * FROM images")];
            case 3:
                imageRows = (_b.sent())[0];
                products = (0, mapping_1.mapProductsEntity)(rows);
                withComments = (0, helpers_1.enhanceProductsComments)(products, commentRows);
                withImages = (0, helpers_1.enhanceProductsImages)(withComments, imageRows);
                res.send(withImages);
                return [3 /*break*/, 5];
            case 4:
                e_2 = _b.sent();
                throwServerError(res, e_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * Задание 34.10 – доработанный метод получения товара по id вместе с изображениями
 */
exports.productsRouter.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, comments, images, product, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, index_1.connection.query("SELECT * FROM products WHERE product_id = ?", [req.params.id])];
            case 1:
                rows = (_a.sent())[0];
                if (!(rows === null || rows === void 0 ? void 0 : rows[0])) {
                    res.status(404);
                    res.send("Product with id ".concat(req.params.id, " is not found"));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, index_1.connection.query("SELECT * FROM comments WHERE product_id = ?", [req.params.id])];
            case 2:
                comments = (_a.sent())[0];
                return [4 /*yield*/, index_1.connection.query("SELECT * FROM images WHERE product_id = ?", [req.params.id])];
            case 3:
                images = (_a.sent())[0];
                product = (0, mapping_1.mapProductsEntity)(rows)[0];
                if (comments.length) {
                    product.comments = (0, mapping_1.mapCommentsEntity)(comments);
                }
                if (images.length) {
                    product.images = (0, mapping_1.mapImagesEntity)(images);
                    product.thumbnail = product.images.find(function (image) { return image.main; }) || product.images[0];
                }
                res.send(product);
                return [3 /*break*/, 5];
            case 4:
                e_3 = _a.sent();
                throwServerError(res, e_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * Задание 34.10 – доработанный метод добавления товара с добавлением изображений в соответствующую таблицу
 */
exports.productsRouter.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, price, images, productId_1, values, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, title = _a.title, description = _a.description, price = _a.price, images = _a.images;
                productId_1 = (0, uuid_1.v4)();
                return [4 /*yield*/, index_1.connection.query(queries_1.INSERT_PRODUCT_QUERY, [productId_1, title || null, description || null, price || null])];
            case 1:
                _b.sent();
                if (!images) return [3 /*break*/, 3];
                values = images.map(function (image) { return [(0, uuid_1.v4)(), image.url, productId_1, image.main]; });
                return [4 /*yield*/, index_1.connection.query(queries_1.INSERT_PRODUCT_IMAGES_QUERY, [values])];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                res.status(201);
                res.send("Product id:".concat(productId_1, " has been added!"));
                return [3 /*break*/, 5];
            case 4:
                e_4 = _b.sent();
                throwServerError(res, e_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * Задание 34.10
 * доработанный метод удаления товара с предварительным удалением всех изображений и комментариев,
 * которые относятся к этому товару
 */
exports.productsRouter.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, index_1.connection.query("SELECT * FROM products WHERE product_id = ?", [req.params.id])];
            case 1:
                rows = (_a.sent())[0];
                if (!(rows === null || rows === void 0 ? void 0 : rows[0])) {
                    res.status(404);
                    res.send("Product with id ".concat(req.params.id, " is not found"));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, index_1.connection.query("DELETE FROM images WHERE product_id = ?", [req.params.id])];
            case 2:
                _a.sent();
                return [4 /*yield*/, index_1.connection.query("DELETE FROM comments WHERE product_id = ?", [req.params.id])];
            case 3:
                _a.sent();
                return [4 /*yield*/, index_1.connection.query("DELETE FROM products WHERE product_id = ?", [req.params.id])];
            case 4:
                _a.sent();
                res.status(200);
                res.end();
                return [3 /*break*/, 6];
            case 5:
                e_5 = _a.sent();
                throwServerError(res, e_5);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/**
 * Задание 34.10 – добавление изображений конкретному товару
 */
exports.productsRouter.post('/add-images', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productId_2, images, values, e_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, productId_2 = _a.productId, images = _a.images;
                if (!(images === null || images === void 0 ? void 0 : images.length)) {
                    res.status(400);
                    res.send("Images array is empty");
                    return [2 /*return*/];
                }
                values = images.map(function (image) { return [(0, uuid_1.v4)(), image.url, productId_2, image.main]; });
                return [4 /*yield*/, index_1.connection.query(queries_1.INSERT_PRODUCT_IMAGES_QUERY, [values])];
            case 1:
                _b.sent();
                res.status(201);
                res.send("Images for a product id:".concat(productId_2, " have been added!"));
                return [3 /*break*/, 3];
            case 2:
                e_6 = _b.sent();
                throwServerError(res, e_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Задание 34.10 – удаление списка изображений из таблицы images
 */
exports.productsRouter.post('/remove-images', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imagesToRemove, info, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imagesToRemove = req.body;
                if (!(imagesToRemove === null || imagesToRemove === void 0 ? void 0 : imagesToRemove.length)) {
                    res.status(400);
                    res.send("Images array is empty");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, index_1.connection.query(queries_1.DELETE_IMAGES_QUERY, [[imagesToRemove]])];
            case 1:
                info = (_a.sent())[0];
                if (info.affectedRows === 0) {
                    res.status(404);
                    res.send("No one image has been removed");
                    return [2 /*return*/];
                }
                res.status(200);
                res.send("Images have been removed!");
                return [3 /*break*/, 3];
            case 2:
                e_7 = _a.sent();
                throwServerError(res, e_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=products-api.js.map