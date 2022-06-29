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
const puppeteer_1 = __importDefault(require("puppeteer"));
class Scraper {
    constructor() {
    }
    screenshot(url, format, output, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch({ args: ['--no-sandbox'] });
            const page = yield browser.newPage();
            const response = yield page.goto(url, { waitUntil: 'networkidle0' });
            if (!response || !response.ok()) {
                throw new Error(`url=${url}, this page is now avairable now.`);
            }
            yield this.takeScreenShot(page, format, output, selector);
            yield browser.close();
        });
    }
    /**
     * 対象要素のスクショをとって保存する
     * @param page
     * @param format
     * @param output
     * @param selector
     * @returns
     */
    takeScreenShot(page, format, output, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            if (format === 'pdf' && selector) {
                throw new Error('selector is not avairable in pdf format.');
            }
            // pngの場合は必要に応じてセレクタから要素を絞ってスクショをとる
            if (format === 'png') {
                if (!selector) {
                    yield page.screenshot({ path: output, type: 'png', fullPage: true });
                    return;
                }
                else {
                    const target = yield page.$(selector);
                    if (!target) {
                        throw new Error(`selector"${selector}" element not found.`);
                    }
                    yield (target === null || target === void 0 ? void 0 : target.screenshot({ type: 'png', path: output }));
                    return;
                }
            }
            // pdfの場合は現状はセレクタで絞るなどはしない
            if (format === 'pdf') {
                if (!selector) {
                    yield page.pdf({ path: output, printBackground: true });
                    return;
                }
                else {
                    throw new Error('selector is not avairable in pdf format.');
                }
            }
            throw new Error('unknown error.');
        });
    }
}
exports.default = Scraper;
