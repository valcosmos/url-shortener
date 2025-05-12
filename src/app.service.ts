import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { LoggerService } from './core/logger/logger.service';
// import { DatabaseService } from './database/database.service';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';
// import { CacheService } from '@/core/cache/cache.service';

@Injectable()
export class AppService {
  constructor() {} // private readonly cache: CacheService, // private readonly databaseService: DatabaseService, // private readonly logger: LoggerService, // private readonly configService: ConfigService,

  getHello(): string {
    // const env = this.configService.get<string>('environment');
    // this.logger.log(`Hello World! ${env}`);
    // // void this.databaseService.user.findMany();
    // await this.cache.set(`key`, `VALUE FROM CACHE`, 1000);
    // const value = await this.cache.get<string>(`key`);
    // console.log('xxx', value);
    return `Hello World!`;
  }
}
