"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Header.css");
function Header() {
    return (react_1.default.createElement("header", null,
        react_1.default.createElement("div", { className: "header-text" }, "PyOnline")));
}
exports.default = Header;
//# sourceMappingURL=Header.js.map