import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { SymbolLike } from '../../models/symbol-like';

@Injectable()
export class SymbolsLikeService {

  private symbolUrl = environment.apiUrl + 'symbolLike';

  constructor(private http: HttpClient) { }

  saveOrUpdate(symbolLike: SymbolLike): Observable<SymbolLike> {    
    return this.http.post<SymbolLike>(this.symbolUrl, symbolLike)
    .pipe(
      tap(response => console.log('symbolLike'))
    );
  }

}
