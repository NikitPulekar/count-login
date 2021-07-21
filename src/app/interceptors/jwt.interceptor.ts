import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private gs: GlobalService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        let user:any = localStorage.getItem('userDetails');
        user = JSON.parse(user) 
        const isLoggedIn = user && user.apiKey;
        const isApiUrl = request.url.startsWith(environment.baseUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.apiKey}`,
                    username: user.user
                }
            });
        }

        return next.handle(request);
    }
}