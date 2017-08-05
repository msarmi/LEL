import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { LELProject } from '../../classes/lel-project';
import { LELPROJECTS } from './mock-lel-projects';

@Injectable()
export class LelProjectsService {
  private lelProjectsUrl = 'http://localhost:5000/api/lelproject';
  constructor(private http: Http) { }

  getLelProjects(): Promise<LELProject[]> {
    return this.http.get(this.lelProjectsUrl)
                    .toPromise()
                    .then(response => response.json() as LELProject[])
                    .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error ocurred', error);
    return Promise.reject(error.message || error);
  }
}
