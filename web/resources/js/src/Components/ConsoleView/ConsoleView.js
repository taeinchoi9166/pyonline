"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./ConsoleView.css");
function ConsoleView(props) {
    var textRef = react_1.createRef();
    react_1.useEffect(function () {
        console.log('after', props);
        if (textRef && textRef.current) {
            textRef.current.innerText = props.result;
        }
    }, [props.result]);
    return (react_1.default.createElement("div", { className: 'console-view-wrap' },
        react_1.default.createElement("div", { className: "console-view-title" },
            react_1.default.createElement("h2", null, "\uACB0\uACFC")),
        react_1.default.createElement("div", { className: "console-view-text", ref: textRef })));
}
exports.default = ConsoleView;
//# sourceMappingURL=ConsoleView.js.map