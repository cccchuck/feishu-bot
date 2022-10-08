"use strict";
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("./request"));
var NFT_Listener_1 = __importDefault(require("../templates/NFT Listener"));
var Bot = /** @class */ (function () {
    function Bot(hookUrl) {
        this.request = new request_1.default(hookUrl);
        this._initTemplates();
    }
    Bot.prototype._initTemplates = function () {
        this.registeTemplate('NFT', NFT_Listener_1.default);
    };
    Bot.prototype._genTemplate = function (id, args) {
        var template = this.templates.find(function (item) { return item.id === id; });
        if (!template)
            throw new Error('Template not found');
        var tags = template.content.tags;
        if (tags.length !== args.length)
            throw new Error('Template arguments not match');
        tags.forEach(function (tag, index) {
            if (typeof tag !== typeof args[index])
                throw new Error('Template arguments not match');
            template.content.template = template.content.template.replace(tag, args[index]);
        });
        return JSON.parse(template.content.template);
    };
    Bot.prototype._genPrepareTemplace = function (id, template) {
        var _templace = JSON.stringify(template);
        var tags = _templace.match(/\{[A-Z].*?\}/g) || [];
        var prepareTemplate = {
            id: id,
            content: {
                tags: tags,
                template: _templace,
            },
        };
        return prepareTemplate;
    };
    Bot.prototype.registeTemplate = function (id, template, forceReplace) {
        var idx;
        idx =
            this.templates !== undefined
                ? this.templates.findIndex(function (item) { return item.id === id; })
                : -1;
        if (idx !== -1 && !forceReplace) {
            throw new Error("The template id of " + id + " has already used");
        }
        var prepareTemplate = this._genPrepareTemplace(id, template);
        if (idx !== -1) {
            this.templates[idx] = prepareTemplate;
        }
        else {
            !this.templates
                ? (this.templates = [prepareTemplate])
                : this.templates.push(prepareTemplate);
        }
        return this.templates;
    };
    Bot.prototype.sendText = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.post('', {
                            msg_type: 'text',
                            content: { text: text },
                        })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, typeof resp === 'string' ? false : true];
                }
            });
        });
    };
    Bot.prototype.sendRichText = function (id, args) {
        return __awaiter(this, void 0, void 0, function () {
            var template, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        template = this._genTemplate(id, args);
                        return [4 /*yield*/, this.request.post('', template)];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, typeof resp === 'string' ? false : true];
                }
            });
        });
    };
    return Bot;
}());
exports.default = Bot;
