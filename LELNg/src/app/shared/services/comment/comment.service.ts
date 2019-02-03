import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LELProject, Symbol } from '../../models';
import { SymbolComment } from "../../models/symbol-comment";
import { environment } from '../../../../environments/environment';
import { LelProjectTeam } from '../../models/lel-project-team';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsUrl = environment.apiUrl + 'comment';
  constructor(private http: HttpClient) { }  

  getComments(symbolId: number): Observable<SymbolComment[]> {
    return this.http.get<SymbolComment[]>(`${this.commentsUrl}/${symbolId}`);
  }

  setComments(comments: SymbolComment[], symbolId: number): Observable<SymbolComment[]> {
    return this.http.post<SymbolComment[]>(`${this.commentsUrl}/${symbolId}`,comments);
  }

  remove(comment: SymbolComment): Observable<Object> {
    return this.http.delete(`${this.commentsUrl}/${comment.id}`);
  }
}
