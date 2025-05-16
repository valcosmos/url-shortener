import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { UrlService } from '../../url.service';

@Injectable()
export class UrlExistsPipe implements PipeTransform {
  constructor(private readonly urlService: UrlService) {}

  async transform(uid: string, metadata: ArgumentMetadata) {
    // const host = this.configService.getOrThrow<string>('HOST');
    // const redirectUrl = await this.databaseService.url.findUnique({
    //   where: {
    //     url: `${host}/${uid}`,
    //   },
    // });
    const redirectUrl = await this.urlService.findOne(uid);

    if (!redirectUrl) {
      throw new NotFoundException('URL not found');
    }

    return redirectUrl;
  }
}
