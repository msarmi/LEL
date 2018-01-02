import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { MatPaginator, MatSort } from '@angular/material';
import { LELProjectsDataSource } from '../../shared/datasources/index';
import { LELProject } from '../../shared/models/index';
import { LelProjectsService } from '../../shared/services/lel-projects/lel-projects.service';
import { LelEditorComponent } from './lel-editor/lel-editor.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-lel-projects',
  templateUrl: './lel-projects.component.html',
  styleUrls: ['./lel-projects.component.css']
})
export class LelProjectsComponent implements OnInit {

  displayedColumns = ['id', 'name', 'authorId', 'editAction', 'deleteAction'];
  dataSource: LELProjectsDataSource | null;
  lelProject: LELProject;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private lelProjectsService: LelProjectsService , public dialog: MatDialog ) { }

  openCreateDialog(): void {
    let dialogRef = this.dialog.open(LelEditorComponent, {
      width: '250px',
      data: {lelProject: this.lelProject}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.lelProject = result;
      // validar que no esté vacio el lel
      this.lelProject.AuthorId = 1;
      this.lelProjectsService.save(this.lelProject);
    });
  }

  openEditDialog(lelProject: LELProject ): void {
    console.log('Lel to edit: ' + lelProject.Name);
    let dialogRef = this.dialog.open(LelEditorComponent, {
      width: '250px',
      data: {lelProject: lelProject}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.lelProject = result;
      this.lelProject.AuthorId = 1;
      // this.lelProjectsService.update(lelProject);
    });

  }

  removeLelProject(): void {
    // this.lelProjectsService.remove(this.lelProject);
  }

  ngOnInit() {
    this.dataSource = new LELProjectsDataSource(this.lelProjectsService, this.paginator, this.sort);
  }
}
