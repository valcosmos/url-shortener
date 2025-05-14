import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Response } from 'express';
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('url')
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  @Get('url')
  findAll() {
    return this.urlService.findAll();
  }

  @Get(':uid')
  findOne(@Param('uid') uid: string, @Res() res: Response) {
    return this.urlService.findOne(uid, res);
  }

  @Patch('url/:uid')
  update(@Param('uid') uid: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlService.update(uid, updateUrlDto);
  }

  @Delete('url/:uid')
  remove(@Param('uid') uid: string) {
    return this.urlService.remove(uid);
  }
}
