import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>): void => {},
                (err: any): void => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            // TODO: Navigate user to login page, if user already in Login Page, show error Banner
                            // this.authService.login({username: "admin", password: "5$c3inw%"}).subscribe({
                            //   next: () => {
                            //     return next.handle(request);
                            //   },
                            // });
                        }
                    }
                },
            ),
        );
    }
}
