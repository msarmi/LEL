import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Symbol, MergeSymbolsData } from '../../models';
import { SymbolComment } from "../../models/symbol-comment";

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

  allWithSynonyms(): Observable<Symbol[]> {
    return this.http.get<Symbol[]>(`${this.symbolUrl}/allwithsynonyms`);
  }

  update(symbol: Symbol): Observable<Symbol> {
    return this.http.put<Symbol>(`${this.symbolUrl}/${symbol.id}/`, symbol)
                    .pipe(
                      tap(response => console.log(`symbol ${symbol.id} updated`))
                    );
  }

  save(symbol: Symbol): Observable<Symbol> {
    return this.http.post<Symbol>(this.symbolUrl, symbol)
    .pipe(
      tap(response => console.log(`symbol ${symbol.id} saved`))
    );
  }

  remove(symbol: Symbol) {
    return this.http.delete(`${this.symbolUrl}/${symbol.id}/`)
    .pipe(
      tap(response => console.log(`symbol ${symbol.id} removed`))
    );
  }

  getComments(symbolId: number): Observable<SymbolComment[]> {
    return this.http.get<SymbolComment[]>(`${this.symbolUrl}/${symbolId}/comments`);
  }

  setComments(comments: SymbolComment[], symbolId: number): Observable<SymbolComment[]> {
    return this.http.post<SymbolComment[]>(`${this.symbolUrl}/${symbolId}/comments`,comments);
  }

  merge(mergeSymbols: MergeSymbolsData): Observable<Symbol> {
    return this.http.post<Symbol>(`${this.symbolUrl}/merge`,mergeSymbols);
  }

}
