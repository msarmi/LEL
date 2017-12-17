import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { MatPaginator, MatSort } from '@angular/material';
import { LelProjectsService } from '../services/lel-projects/lel-projects.service';
import { LELProject } from '../models/index';

export class LELProjectsDataSource extends DataSource<LELProject> {
    resultsLength = 0;
    isLoadingResults = false;

    constructor(private lelProjectsDatabase: LelProjectsService,
        private paginator: MatPaginator,
        private sort: MatSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<LELProject[]> {
        const displayDataChanges = [
            this.sort.sortChange,
            this.paginator.page
        ];

        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        return Observable.merge(...displayDataChanges)
            .startWith(null)
            .switchMap(() => {
                this.isLoadingResults = true;
                return this.lelProjectsDatabase.getLelProjects(
                    this.sort.active, this.sort.direction, this.paginator.pageIndex);
            })
            .map(data => {
                // Flip flag to show that loading has finished.
                this.isLoadingResults = false;
                this.resultsLength = data.length;

                return data;
            })
            .catch(() => {
                this.isLoadingResults = false;
                return Observable.of(null);
            });
    }

    disconnect() { }
}
