"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_line_args_1 = __importDefault(require("command-line-args"));
const scraper_1 = __importDefault(require("./scraper"));
const optionDefinitions = [
    { name: 'url', alias: 'u', type: String, multiple: false },
    { name: 'format', alias: 'f', type: String, multiple: false },
    { name: 'output', alias: 'o', type: String, multiple: false },
    { name: 'selector', alias: 's', type: String, multiple: false }
];
const options = (0, command_line_args_1.default)(optionDefinitions);
console.log(options);
const url = options['url'];
const format = options['format'];
const output = options['output'];
const selector = options['selector'];
if (!url) {
    throw new Error('url argument is required');
}
if (!format) {
    throw new Error('format argument is required');
}
if (!output) {
    throw new Error('output argument is required');
}
const scraper = new scraper_1.default();
scraper.screenshot(url, format, output, selector);
