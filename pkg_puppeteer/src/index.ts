import commandLineArgs from "command-line-args";
import Scraper from "./scraper";

const optionDefinitions: commandLineArgs.OptionDefinition[] = [
  {name: 'url', alias: 'u', type: String, multiple: false},
  {name: 'format', alias: 'f', type: String, group: ['png', 'pdf'], multiple: false},
  {name: 'output', alias: 'o', type: String, multiple: false},
  {name: 'selector', alias: 's', type: String, multiple: false},
  {name: 'chrome-path', alias: 'c', type: String, multiple: false}
];

const options = commandLineArgs(optionDefinitions);

const url = options['url'];
const format = options['format'];
const output = options['output'];
const selector = options['selector'];
const chromePath = process.env.CHROME_PATH || options['chrome-path'] || undefined;

if(url){
  throw new Error('url argument is required');
}

if(format){
  throw new Error('format argument is required');
}

if(output){
  throw new Error('output argument is required');
}

if(selector){
  throw new Error('environment variable "CHROME_PATH" or "--chrome-path" argument is required.')
}

const scraper = new Scraper();
scraper.screenshot(url, format, output, selector, chromePath);

