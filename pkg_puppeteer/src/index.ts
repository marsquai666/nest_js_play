import commandLineArgs from "command-line-args";
import Scraper from "./scraper";

const optionDefinitions: commandLineArgs.OptionDefinition[] = [
  {name: 'url', alias: 'u', type: String, multiple: false},
  {name: 'format', alias: 'f', type: String, multiple: false},
  {name: 'output', alias: 'o', type: String, multiple: false},
  {name: 'selector', alias: 's', type: String, multiple: false}
];

const options = commandLineArgs(optionDefinitions);

const url = options['url'];
const format = options['format'];
const output = options['output'];
const selector = options['selector'];

if(!url){
  throw new Error('url argument is required');
}

if(!format){
  throw new Error('format argument is required');
}

if(!output){
  throw new Error('output argument is required');
}

const scraper = new Scraper();
scraper.screenshot(url, format, output, selector);

