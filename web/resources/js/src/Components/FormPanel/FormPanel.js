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
require("./FormPanel.css");
var App_1 = require("../../App");
function FormPanel() {
    var FormPanelContext = react_1.useContext(App_1.AppContext);
    return (react_1.default.createElement("div", { className: 'form-panel' },
        react_1.default.createElement("button", { className: "code-run-btn", onClick: FormPanelContext.onExecuteScript }, "\u25B6 \uC2E4\uD589")));
}
exports.default = FormPanel;
;
//# sourceMappingURL=FormPanel.js.map