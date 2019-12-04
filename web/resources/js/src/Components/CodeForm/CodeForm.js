"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
// @ts-ignore
var ace_1 = __importDefault(require("ace"));
var FormPanel_1 = __importDefault(require("../FormPanel/FormPanel"));
function CodeForm(props) {
    var editorRef = react_1.createRef();
    react_1.useEffect(function () {
        console.log(ace_1.default);
        ace_1.default.edit(document.body.querySelector('#code-editor'), {
            mode: "ace/mode/python",
            selectionStyle: "text"
        });
        if (editorRef.current)
            editorRef.current.style.height = '90%';
    }, []);
    return (react_1.default.createElement("div", { className: "code-form" },
        react_1.default.createElement(FormPanel_1.default, null),
        react_1.default.createElement("div", { id: 'code-editor', ref: editorRef })));
}
exports.default = CodeForm;
//# sourceMappingURL=CodeForm.js.map