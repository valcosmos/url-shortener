import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UidService } from '@/services/uid/uid.service';
import { DatabaseService } from '@/database/database.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class UrlService {
  private host: string;

  constructor(
    private readonly uidService: UidService,
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.host = this.configService.getOrThrow<string>('host');
  }

  async create(createUrlDto: CreateUrlDto) {
    const randomId = this.uidService.generate(5);
    const url = await this.databaseService.url.create({
      data: {
        ...createUrlDto,
        url: `${this.host}/${randomId}`,
      },
    });

    return url;
  }

  findAll() {
    return `This action returns all url`;
  }

  async findOne(uid: string, res: Response) {
    const redirect = await this.databaseService.url.findUnique({
      where: {
        url: `${this.host}/${uid}`,
      },
    });

    if (!redirect) {
      throw new NotFoundException('URL not found');
    }

    return redirect;
  }

  update(uid: string, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${uid} url`;
  }

  remove(uid: string) {
    return `This action removes a #${uid} url`;
  }
}
