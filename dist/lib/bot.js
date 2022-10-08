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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("../utils/request"));
const NFT_Listener_1 = __importDefault(require("../templates/NFT Listener"));
class Bot {
    constructor(hookUrl) {
        this.request = new request_1.default(hookUrl);
        this._initTemplates();
    }
    _initTemplates() {
        this.registeTemplate('NFT', NFT_Listener_1.default);
    }
    _genTemplate(id, args) {
        const template = this.templates.find((item) => item.id === id);
        if (!template)
            throw new Error('Template not found');
        const tags = template.content.tags;
        if (tags.length !== args.length)
            throw new Error('Template arguments not match');
        tags.forEach((tag, index) => {
            if (typeof tag !== typeof args[index])
                throw new Error('Template arguments not match');
            template.content.template = template.content.template.replace(tag, args[index]);
        });
        return JSON.parse(template.content.template);
    }
    _genPrepareTemplace(id, template) {
        const _templace = JSON.stringify(template);
        const tags = _templace.match(/\{[A-Z].*?\}/g) || [];
        const prepareTemplate = {
            id,
            content: {
                tags,
                template: _templace,
            },
        };
        return prepareTemplate;
    }
    registeTemplate(id, template, forceReplace) {
        let idx;
        idx =
            this.templates !== undefined
                ? this.templates.findIndex((item) => item.id === id)
                : -1;
        if (idx !== -1 && !forceReplace) {
            throw new Error(`The template id of ${id} has already used`);
        }
        const prepareTemplate = this._genPrepareTemplace(id, template);
        if (idx !== -1) {
            this.templates[idx] = prepareTemplate;
        }
        else {
            !this.templates
                ? (this.templates = [prepareTemplate])
                : this.templates.push(prepareTemplate);
        }
        return this.templates;
    }
    sendText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.request.post('', {
                msg_type: 'text',
                content: { text },
            });
            return typeof resp === 'string' ? false : true;
        });
    }
    sendRichText(id, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = this._genTemplate(id, args);
            const resp = yield this.request.post('', template);
            return typeof resp === 'string' ? false : true;
        });
    }
}
exports.default = Bot;
