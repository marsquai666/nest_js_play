import puppeteer, { Page } from "puppeteer";

export default class Scraper {
  constructor(){
  }

  async screenshot(url: string, format: 'png' | 'pdf', output: string, selector: string): Promise<void> {
    const browser = await puppeteer.launch({args:['--no-sandbox']})
    const page = await browser.newPage();
    const response = await page.goto(url, {waitUntil: 'networkidle0'});

    if(!response || !response.ok()){
      throw new Error(`url=${url}, this page is now avairable now.`)
    }

    await this.takeScreenShot(page, format, output, selector);

    await browser.close();
  }

  /**
   * 対象要素のスクショをとって保存する
   * @param page 
   * @param format 
   * @param output 
   * @param selector 
   * @returns 
   */
  private async takeScreenShot(page: Page, format: 'png' | 'pdf', output: string, selector?: string){
    if(format === 'pdf' && selector){
      throw new Error('selector is not avairable in pdf format.')
    }

    // pngの場合は必要に応じてセレクタから要素を絞ってスクショをとる
    if(format === 'png'){
      if(!selector){
        await page.screenshot({path: output, type: 'png', fullPage: true})
        return;
      }else{
        const target = await page.$(selector);
        if(!target){
          throw new Error(`selector"${selector}" element not found.`)
        }
        await target?.screenshot({type: 'png', path: output});
        return;
      }
    }

    // pdfの場合は現状はセレクタで絞るなどはしない
    if(format === 'pdf'){
      if(!selector){
        await page.pdf({path: output, printBackground: true});
        return;
      }else{
        throw new Error('selector is not avairable in pdf format.')
      }
    }

    throw new Error('unknown error.');
  }
}