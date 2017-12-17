import {Component, OnInit, ViewChild} from '@angular/core';
import {Http} from '@angular/http';

import {MatPaginator, MatSort} from '@angular/material';
import { LELProjectsDataSource } from '../../shared/datasources/index';
import { LELProject } from '../../shared/models/index';
import { LelProjectsService } from '../../shared/services/lel-projects/lel-projects.service';

@Component({
  selector: 'app-lel-projects',
  templateUrl: './lel-projects.component.html',
  styleUrls: ['./lel-projects.component.css']
})
export class LelProjectsComponent implements OnInit {
  displayedColumns = ['id', 'name', 'authorId'];
  dataSource: LELProjectsDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private lelProjectsService: LelProjectsService) {}

  ngOnInit() {
    this.dataSource = new LELProjectsDataSource(this.lelProjectsService, this.paginator, this.sort);
  }
}
