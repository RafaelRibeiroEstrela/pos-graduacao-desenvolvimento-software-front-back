"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = hello;
var types_1 = require("skeleton/dist/types");
var world = 'world';
function hello(who) {
    if (who === void 0) { who = world; }
    return "Hello ".concat(who, "! ");
}
console.log(hello());
var a = types_1.ProductCategory.Moda;
