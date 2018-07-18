import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LELProject, Symbol } from '../../models';
import { environment } from '../../../../environments/environment';

@Injectable()
export class LelProjectsService {
  private lelProjectsUrl = environment.apiUrl + 'lelproject';
  constructor(private http: HttpClient) { }

  getLelProjects(sort: string, order: string, page: number): Observable<LELProject[]> {
    return this.http.get<LELProject[]>(this.lelProjectsUrl);
  }

  getLelProject(id: number): Observable<LELProject> {
    return this.http.get<LELProject>(this.lelProjectsUrl + `/${id}`);
  }

  getLelProjectSymbols(id: number): Observable<Symbol[]> {
    return this.http.get<Symbol[]>(this.lelProjectsUrl + `/${id}/symbols`);
  }

  save(lelProject: LELProject): Observable<LELProject> {
    return this.http.post<LELProject>(this.lelProjectsUrl, lelProject)
                    .pipe(
                      tap(response => console.log('lelProject'))
                    );
  }

  update(lelProject: LELProject): Observable<LELProject> {
    return this.http.put<LELProject>(`${this.lelProjectsUrl}/${lelProject.id}/`, lelProject)
                    .pipe(
                      tap(response => console.log('lelProject'))
                    );
  }

  remove(lelProject: LELProject) {
    // ToDo
  }
}

export interface LELProjectsApi {
  items: LELProject[];
  total_count: number;
}
