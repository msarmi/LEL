import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../../models';

@Injectable()
export class UsersService {

  private userUrl = environment.apiUrl + 'user';

  constructor(private http: HttpClient) { }

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
