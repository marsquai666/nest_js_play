import { Controller, Get, Post, Body, Patch, Param, Delete, Res, StreamableFile } from '@nestjs/common';
import { ScrapingsService } from './scrapings.service';
import { CreateScrapingDto } from './dto/create-scraping.dto';
import { UpdateScrapingDto } from './dto/update-scraping.dto';
import puppeteer from 'puppeteer';
import { BookMark } from '@prisma/client';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('scrapings')
export class ScrapingsController {
  constructor(private readonly scrapingsService: ScrapingsService) {}

  @Post()
  async create(@Body() createScrapingDto: CreateScrapingDto, @Res({passthrough: true}) res: Response) {
    const result = await this.scrapingsService.create(createScrapingDto);

    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Disposition': 'attachment; filename="screenshot.jpeg"',
    });

    return new StreamableFile(result.screenShotImageBuffer);
  }

  @Get()
  async findAll() {
    const result = await this.scrapingsService.findAll();
    return result.map(data => {return {...data, screenShotImageBuffer: 'file'}})
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scrapingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScrapingDto: UpdateScrapingDto) {
    return this.scrapingsService.update(+id, updateScrapingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scrapingsService.remove(+id);
  }
}
