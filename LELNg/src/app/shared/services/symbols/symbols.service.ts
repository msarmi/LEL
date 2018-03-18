import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Symbol } from '../../models';

@Injectable()
export class SymbolsService {

  private symbolUrl = environment.apiUrl + 'symbol';

  constructor(private http: HttpClient) { }

  get(id: number): Observable<Symbol> {
    return this.http.get<Symbol>(`${this.symbolUrl}/${id}/`)
                    .pipe(
                      tap(response => console.log(`symbol ${id} getted`))
                    );
  }

  update(symbol: Symbol): Observable<Symbol> {
    return this.http.put<Symbol>(`${this.symbolUrl}/${symbol.id}/`, symbol)
                    .pipe(
                      tap(response => console.log('symbol'))
                    );
  }

  save(symbol: Symbol): Observable<Symbol> {
    return this.http.post<Symbol>(this.symbolUrl, symbol)
    .pipe(
      tap(response => console.log('symbol'))
    );
  }
}
