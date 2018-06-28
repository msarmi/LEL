import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    constructor(
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const token = currentUser ? currentUser.token : null;

        // Clone the request to add the new header.
        const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });

        // send the newly created request
        return next.handle(authReq)
            .catch((error) => {
                // intercept the respons error and displace it to the console
                console.log('Error Occurred');
                console.log(error);

                if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
                    // localStorage.removeItem('currentUser');
                    // window.location.href = window.location.href + '?' + new Date().getMilliseconds();
                    // this.router.navigate([`/login?returnUrl=${this.router.url}`]);
                    this.router.navigate([`/login`]);
                }
                // return the error to the method that called it
                return Observable.throw(error);
            }) as any;
    }
}
