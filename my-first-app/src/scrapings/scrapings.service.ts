import { Injectable } from '@nestjs/common';
import { CreateScrapingDto } from './dto/create-scraping.dto';
import { UpdateScrapingDto } from './dto/update-scraping.dto';
import puppeteer from 'puppeteer';
import { PrismaClient } from '@prisma/client';
import {appendFile} from 'fs';

@Injectable()
export class ScrapingsService {


  async create(createScrapingDto: CreateScrapingDto) {
    // スクレイピング
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.setViewport({width:1920, height:1080})
    const response = await page.goto(createScrapingDto.url, {waitUntil: 'networkidle0'});

    const title = await page.title();

    // エラー処理
    if(!response.ok){
      throw new Error('this page is now avairable now.')
    }

    let imageBuffer:Buffer;
    // スクリーンショットのデータ取得
    if(createScrapingDto.format === 'png'){
      if(createScrapingDto.selector){
        const target = await page.$(createScrapingDto.selector);
        imageBuffer = await target.screenshot() as Buffer;
      }else{
        imageBuffer = await page.screenshot({type: 'png', fullPage: true}) as Buffer;
      }
    }else if(createScrapingDto.format === 'pdf'){
      imageBuffer = await page.pdf({printBackground: true});
    }else {
      throw new Error("format must be 'pdf' or 'png'");
    }

    // データの作成
    const prismaClient = new PrismaClient();
    const result = await prismaClient.bookMark.create({
      data: {
        url: createScrapingDto.url,
        title: title,
        screenShotImageBuffer: imageBuffer
      }
    })

    return result;
  }

  async findAll() {
    const prismaClient = new PrismaClient();
    const result = await prismaClient.bookMark.findMany()
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} scraping`;
  }

  update(id: number, updateScrapingDto: UpdateScrapingDto) {
    return `This action updates a #${id} scraping`;
  }

  remove(id: number) {
    return `This action removes a #${id} scraping`;
  }
}
