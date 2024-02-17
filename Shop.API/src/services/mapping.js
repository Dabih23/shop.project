"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapImagesEntity = exports.mapImageEntity = exports.mapProductsEntity = exports.mapCommentsEntity = exports.mapCommentEntity = void 0;
var mapCommentEntity = function (_a) {
    var comment_id = _a.comment_id, product_id = _a.product_id, rest = __rest(_a, ["comment_id", "product_id"]);
    return __assign({ id: comment_id, productId: product_id }, rest);
};
exports.mapCommentEntity = mapCommentEntity;
var mapCommentsEntity = function (data) {
    return data.map(exports.mapCommentEntity);
};
exports.mapCommentsEntity = mapCommentsEntity;
var mapProductsEntity = function (data) {
    return data.map(function (_a) {
        var product_id = _a.product_id, title = _a.title, description = _a.description, price = _a.price;
        return ({
            id: product_id,
            title: title || "",
            description: description || "",
            price: Number(price) || 0
        });
    });
};
exports.mapProductsEntity = mapProductsEntity;
var mapImageEntity = function (_a) {
    var image_id = _a.image_id, product_id = _a.product_id, url = _a.url, main = _a.main;
    return {
        id: image_id,
        productId: product_id,
        main: Boolean(main),
        url: url
    };
};
exports.mapImageEntity = mapImageEntity;
var mapImagesEntity = function (data) {
    return data.map(exports.mapImageEntity);
};
exports.mapImagesEntity = mapImagesEntity;
//# sourceMappingURL=mapping.js.map