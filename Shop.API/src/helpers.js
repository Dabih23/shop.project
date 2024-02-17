"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhanceProductsImages = exports.getProductsFilterQuery = exports.enhanceProductsComments = exports.checkCommentUniq = exports.validateComment = void 0;
var mapping_1 = require("./services/mapping");
var mapping_2 = require("./services/mapping");
var validateComment = function (comment) {
    if (!comment || !Object.keys(comment).length) {
        return "Comment is absent or empty";
    }
    var requiredFields = new Set([
        "name",
        "email",
        "body",
        "productId"
    ]);
    var wrongFieldName;
    requiredFields.forEach(function (fieldName) {
        if (!comment[fieldName]) {
            wrongFieldName = fieldName;
            return;
        }
    });
    if (wrongFieldName) {
        return "Field '".concat(wrongFieldName, "' is absent");
    }
    return null;
};
exports.validateComment = validateComment;
var compareValues = function (target, compare) {
    return target.toLowerCase() === compare.toLowerCase();
};
var checkCommentUniq = function (payload, comments) {
    var byEmail = comments.find(function (_a) {
        var email = _a.email;
        return compareValues(payload.email, email);
    });
    if (!byEmail) {
        return true;
    }
    var body = byEmail.body, name = byEmail.name, productId = byEmail.productId;
    return !(compareValues(payload.body, body) &&
        compareValues(payload.name, name) &&
        compareValues(payload.productId, productId));
};
exports.checkCommentUniq = checkCommentUniq;
var enhanceProductsComments = function (products, commentRows) {
    var commentsByProductId = new Map();
    for (var _i = 0, commentRows_1 = commentRows; _i < commentRows_1.length; _i++) {
        var commentEntity = commentRows_1[_i];
        var comment = (0, mapping_1.mapCommentEntity)(commentEntity);
        if (!commentsByProductId.has(comment.productId)) {
            commentsByProductId.set(comment.productId, []);
        }
        var list = commentsByProductId.get(comment.productId);
        commentsByProductId.set(comment.productId, __spreadArray(__spreadArray([], list, true), [comment], false));
    }
    for (var _a = 0, products_1 = products; _a < products_1.length; _a++) {
        var product = products_1[_a];
        if (commentsByProductId.has(product.id)) {
            product.comments = commentsByProductId.get(product.id);
        }
    }
    return products;
};
exports.enhanceProductsComments = enhanceProductsComments;
var getProductsFilterQuery = function (filter) {
    var title = filter.title, description = filter.description, priceFrom = filter.priceFrom, priceTo = filter.priceTo;
    var query = "SELECT * FROM products WHERE ";
    var values = [];
    if (title) {
        query += "title LIKE ? ";
        values.push("%".concat(title, "%"));
    }
    if (description) {
        if (values.length) {
            query += " OR ";
        }
        query += "description LIKE ? ";
        values.push("%".concat(description, "%"));
    }
    if (priceFrom || priceTo) {
        if (values.length) {
            query += " OR ";
        }
        query += "(price > ? AND price < ?)";
        values.push(priceFrom || 0);
        values.push(priceTo || 999999);
    }
    return [query, values];
};
exports.getProductsFilterQuery = getProductsFilterQuery;
/**
 * Задание 34.10 – хелпер для сопоставления изображений и комментариев по productId
 */
var enhanceProductsImages = function (products, imageRows) {
    var imagesByProductId = new Map();
    var thumbnailsByProductId = new Map();
    for (var _i = 0, imageRows_1 = imageRows; _i < imageRows_1.length; _i++) {
        var imageEntity = imageRows_1[_i];
        var image = (0, mapping_2.mapImageEntity)(imageEntity);
        if (!imagesByProductId.has(image.productId)) {
            imagesByProductId.set(image.productId, []);
        }
        var list = imagesByProductId.get(image.productId);
        imagesByProductId.set(image.productId, __spreadArray(__spreadArray([], list, true), [image], false));
        if (image.main) {
            thumbnailsByProductId.set(image.productId, image);
        }
    }
    for (var _a = 0, products_2 = products; _a < products_2.length; _a++) {
        var product = products_2[_a];
        product.thumbnail = thumbnailsByProductId.get(product.id);
        if (imagesByProductId.has(product.id)) {
            product.images = imagesByProductId.get(product.id);
            if (!product.thumbnail) {
                product.thumbnail = product.images[0];
            }
        }
    }
    return products;
};
exports.enhanceProductsImages = enhanceProductsImages;
//# sourceMappingURL=helpers.js.map