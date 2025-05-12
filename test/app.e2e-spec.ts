import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { LoggerService } from '@/core/logger/logger.service';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let server: App;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(app.get(LoggerService));
    app.use(helmet());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    server = app.getHttpServer();
    configService = app.get(ConfigService);
  });

  it('/ (GET)', async () => {
    const environment = configService.get<string>('environment');
    console.log('environment', environment);

    return request(server)
      .get('/')
      .expect(200)
      .expect(({ body }) => {
        expect((body as { data: string }).data).toBe('Hello World!');
      });
  });
});
