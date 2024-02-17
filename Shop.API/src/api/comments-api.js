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
exports.commentsRouter = void 0;
var express_1 = require("express");
var helpers_1 = require("../helpers");
var uuid_1 = require("uuid");
var index_1 = require("../../index");
var mapping_1 = require("../services/mapping");
var queries_1 = require("../services/queries");
exports.commentsRouter = (0, express_1.Router)();
exports.commentsRouter.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var comments, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, index_1.connection.query("SELECT * FROM comments")];
            case 1:
                comments = (_a.sent())[0];
                res.setHeader('Content-Type', 'application/json');
                res.send((0, mapping_1.mapCommentsEntity)(comments));
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.debug(e_1.message);
                res.status(500);
                res.send("Something went wrong");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.commentsRouter.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, index_1.connection.query("SELECT * FROM comments WHERE comment_id = ?", [req.params.id])];
            case 1:
                rows = (_a.sent())[0];
                if (!(rows === null || rows === void 0 ? void 0 : rows[0])) {
                    res.status(404);
                    res.send("Comment with id ".concat(req.params.id, " is not found"));
                    return [2 /*return*/];
                }
                res.setHeader('Content-Type', 'application/json');
                res.send((0, mapping_1.mapCommentsEntity)(rows)[0]);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.debug(e_2.message);
                res.status(500);
                res.send("Something went wrong");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.commentsRouter.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validationResult, _a, name_1, email, body, productId, sameResult, id, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                validationResult = (0, helpers_1.validateComment)(req.body);
                if (validationResult) {
                    res.status(400);
                    res.send(validationResult);
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                _a = req.body, name_1 = _a.name, email = _a.email, body = _a.body, productId = _a.productId;
                return [4 /*yield*/, index_1.connection.query(queries_1.COMMENT_DUPLICATE_QUERY, [email.toLowerCase(), name_1.toLowerCase(), body.toLowerCase(), productId])];
            case 2:
                sameResult = (_b.sent())[0];
                if (sameResult.length) {
                    res.status(422);
                    res.send("Comment with the same fields already exists");
                    return [2 /*return*/];
                }
                id = (0, uuid_1.v4)();
                return [4 /*yield*/, index_1.connection.query(queries_1.INSERT_COMMENT_QUERY, [id, email, name_1, body, productId])];
            case 3:
                _b.sent();
                res.status(201);
                res.send("Comment id:".concat(id, " has been added!"));
                return [3 /*break*/, 5];
            case 4:
                e_3 = _b.sent();
                console.debug(e_3.message);
                res.status(500);
                res.send("Server error. Comment has not been created");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.commentsRouter.patch('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updateQuery_1, valuesToUpdate_1, info, newComment, validationResult, id, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                updateQuery_1 = "UPDATE comments SET ";
                valuesToUpdate_1 = [];
                ["name", "body", "email"].forEach(function (fieldName) {
                    if (req.body.hasOwnProperty(fieldName)) {
                        if (valuesToUpdate_1.length) {
                            updateQuery_1 += ", ";
                        }
                        updateQuery_1 += "".concat(fieldName, " = ?");
                        valuesToUpdate_1.push(req.body[fieldName]);
                    }
                });
                updateQuery_1 += " WHERE comment_id = ?";
                valuesToUpdate_1.push(req.body.id);
                return [4 /*yield*/, index_1.connection.query(updateQuery_1, valuesToUpdate_1)];
            case 1:
                info = (_a.sent())[0];
                if (info.affectedRows === 1) {
                    res.status(200);
                    res.end();
                    return [2 /*return*/];
                }
                newComment = req.body;
                validationResult = (0, helpers_1.validateComment)(newComment);
                if (validationResult) {
                    res.status(400);
                    res.send(validationResult);
                    return [2 /*return*/];
                }
                id = (0, uuid_1.v4)();
                return [4 /*yield*/, index_1.connection.query(queries_1.INSERT_COMMENT_QUERY, [id, newComment.email, newComment.name, newComment.body, newComment.productId])];
            case 2:
                _a.sent();
                res.status(201);
                res.send(__assign(__assign({}, newComment), { id: id }));
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                console.log(e_4.message);
                res.status(500);
                res.send("Server error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.commentsRouter.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var info, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, index_1.connection.query("DELETE FROM comments WHERE comment_id = ?", [req.params.id])];
            case 1:
                info = (_a.sent())[0];
                if (info.affectedRows === 0) {
                    res.status(404);
                    res.send("Comment with id ".concat(req.params.id, " is not found"));
                    return [2 /*return*/];
                }
                res.status(200);
                res.end();
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                console.log(e_5.message);
                res.status(500);
                res.send("Server error. Comment has not been deleted");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=comments-api.js.map