import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          // 判断401权限错误
          if (error.status === 401) {
            return throwError(error.statusText);
          }

          // 获取Application-Error信息并抛出异常信息
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            console.error(applicationError);
            return throwError(applicationError);
          }

          // 获取其他服务错误

          const serveError = error.error;
          let modalStateErrors = '';
          // 判断错误是否存在并且是否是object类型
          if (serveError && typeof serveError === 'object') {
            for (const key in serveError) {
              if (serveError[key]) {
                modalStateErrors += serveError[key] + '\n';
              }
            }
          }
          // 返回这些错误
          return throwError(modalStateErrors || serveError || 'Server Error');
        }
      })
    );
  }
}

// 提供ErrorInterceptor服务注册类
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
