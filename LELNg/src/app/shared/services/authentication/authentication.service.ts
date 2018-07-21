import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { RegisterUser, User } from '../../models';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    private userUrl = environment.apiUrl + 'user';
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(this.userUrl + '/authenticate', { username: username, password: password })
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
        return this.http.post<any>(this.userUrl + '/register', user)
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

    getUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    get(id: number): Observable<User> {
        return this.http.get<User>(`${this.userUrl}/${id}/`)
            .pipe(
                tap(response => console.log(`user ${id} getted`))
            );
    }

    update(user: User): Observable<User> {
        return this.http.put<User>(`${this.userUrl}/${user.id}/`, user)
            .pipe(
                tap(response => console.log('user'))
            );
    }

    save(user: User): Observable<User> {
        return this.http.post<User>(this.userUrl, user)
            .pipe(
                tap(response => console.log('user'))
            );
    }



}
