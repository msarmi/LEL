import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LELProject, Symbol } from '../../models';
import { environment } from '../../../../environments/environment';
import { LelProjectTeam } from '../../models/lel-project-team';

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

  getLelProjectTeam(id: number): Observable<LelProjectTeam[]> {
    return this.http.get<LelProjectTeam[]>(this.lelProjectsUrl + `/${id}/team`);
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
    return this.http.delete<LELProject>(`${this.lelProjectsUrl}/${lelProject.id}/`)
    .pipe(
      tap(response => console.log('lelProject'))
    );
  }
}

export interface LELProjectsApi {
  items: LELProject[];
  total_count: number;
}
