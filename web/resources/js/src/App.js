"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
require("./App.css");
var Header_1 = __importDefault(require("./Components/Header/Header"));
var ConsoleView_1 = __importDefault(require("./Components/ConsoleView/ConsoleView"));
var CodeForm_1 = __importDefault(require("./Components/CodeForm/CodeForm"));
var _AppContext = react_1.createContext({ onExecuteScript: function () { } });
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            code_input: '',
            td: new TextDecoder(),
            code_result: ''
        };
        _this.onChangeCode = function (e) {
            _this.setState(__assign(__assign({}, _this.state), { code_input: e.target && e.target.innerText ? e.target.innerText : '' }));
        };
        _this.onExecuteScript = function () {
            var _editor = document.body.querySelector('.ace_content');
            if (_editor && _editor.innerText) {
                fetch('/console', {
                    method: 'POST',
                    body: JSON.stringify({ 'code': _editor.innerText }),
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    credentials: 'same-origin'
                })
                    .then(function (rs) { return rs.body.getReader(); })
                    .then(function (reader) { return reader.read(); })
                    .then(function (data) {
                    if (data && data.value) {
                        var decodedResult = _this.state.td.decode(data.value);
                        var json = JSON.parse(decodedResult);
                        _this.setState(__assign(__assign({}, _this.state), { code_result: json['result'] }));
                    }
                }).catch(function (err) {
                    console.error(err);
                });
            }
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
    };
    App.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
        if (nextState.code_result !== this.state.code_result)
            return true;
        else
            return false;
    };
    App.prototype.render = function () {
        return (react_1.default.createElement(_AppContext.Provider, { value: { onExecuteScript: this.onExecuteScript } },
            react_1.default.createElement("div", { className: 'container' },
                react_1.default.createElement(Header_1.default, null),
                react_1.default.createElement("div", { className: "content-wrap" },
                    react_1.default.createElement(CodeForm_1.default, { executeScript: this.onExecuteScript }),
                    react_1.default.createElement(ConsoleView_1.default, { result: this.state.code_result })))));
    };
    return App;
}(react_1.Component));
exports.default = App;
exports.AppContext = _AppContext;
//# sourceMappingURL=App.js.map