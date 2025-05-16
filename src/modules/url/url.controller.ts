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
import { UrlExistsPipe } from './pipes/url-exists/url-exists.pipe';
import { Url } from 'generated/prisma';
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
  findOne(@Param('uid', UrlExistsPipe) uid: Url, @Res() res: Response) {
    return res.redirect(uid.redirect);
  }

  @Patch('url/:uid')
  update(
    @Param('uid', UrlExistsPipe) uid: Url,
    @Body() updateUrlDto: UpdateUrlDto,
  ) {
    return this.urlService.update(uid, updateUrlDto);
  }

  @Delete('url/:uid')
  remove(@Param('uid', UrlExistsPipe) uid: Url) {
    return this.urlService.remove(uid);
  }
}
