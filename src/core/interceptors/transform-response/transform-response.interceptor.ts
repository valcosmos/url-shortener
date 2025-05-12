import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface ResponseData<T = unknown> {
  data?: T;
  meta?: Record<string, any>;
}

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // ... before route handler
    return next.handle().pipe(
      map((response: unknown) => {
        if (!response) return { data: [] };

        const res = response as ResponseData;
        if (res.data && res.meta) {
          return {
            data: res.data,
            meta: res.meta,
          };
        }
        return { data: response };
      }),
    );
  }
}
