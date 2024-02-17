"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_IMAGES_QUERY = exports.INSERT_PRODUCT_IMAGES_QUERY = exports.INSERT_PRODUCT_QUERY = exports.INSERT_COMMENT_QUERY = exports.COMMENT_DUPLICATE_QUERY = void 0;
exports.COMMENT_DUPLICATE_QUERY = "\n  SELECT * FROM comments c\n  WHERE LOWER(c.email) = ?\n  AND LOWER(c.name) = ?\n  AND LOWER(c.body) = ?\n  AND c.product_id = ?\n";
exports.INSERT_COMMENT_QUERY = "\n  INSERT INTO comments\n  (comment_id, email, name, body, product_id)\n  VALUES\n  (?, ?, ?, ?, ?)\n";
exports.INSERT_PRODUCT_QUERY = "\n  INSERT INTO products\n  (product_id, title, description, price)\n  VALUES\n  (?, ?, ?, ?)\n";
exports.INSERT_PRODUCT_IMAGES_QUERY = "\n  INSERT INTO images\n  (image_id, url, product_id, main)\n  VALUES ?\n";
exports.DELETE_IMAGES_QUERY = "\n  DELETE FROM images \n  WHERE image_id IN ?;\n";
//# sourceMappingURL=queries.js.map