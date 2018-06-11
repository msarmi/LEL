import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { RegisterUser } from '../../models';

@Injectable()
export class AuthenticationService {
    private lelProjectsUrl = environment.apiUrl + 'user';
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(this.lelProjectsUrl + '/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    register(user: RegisterUser) {
        return this.http.post<any>(this.lelProjectsUrl + '/register', user)
            .map(usr => {
                // login successful if there's a jwt token in the response
                if (usr && usr.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return usr;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
