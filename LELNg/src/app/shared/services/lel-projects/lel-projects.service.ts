import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { LELProject } from '../../models';
import { LELPROJECTS } from './mock-lel-projects';
import { environment } from '../../../../environments/environment';

@Injectable()
export class LelProjectsService {
  private lelProjectsUrl = environment.apiUrl + 'lelproject';
  constructor(private http: Http) { }

  getLelProjects(sort: string, order: string, page: number): Observable<LELProject[]> {
    return this.http.get(this.lelProjectsUrl)
                    .map(response => response.json() as LELProject[]);
  }
}

export interface LELProjectsApi {
  items: LELProject[];
  total_count: number;
}
