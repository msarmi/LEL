import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { MatPaginator, MatSort } from '@angular/material';
import { LELProjectsDataSource } from '../../shared/datasources/index';
import { LELProject } from '../../shared/models/index';
import { LelProjectsService } from '../../shared/services/lel-projects/lel-projects.service';
import { LelEditorComponent } from './lel-editor/lel-editor.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-lel-projects',
  templateUrl: './lel-projects.component.html',
  styleUrls: ['./lel-projects.component.css']
})
export class LelProjectsComponent implements OnInit {

  displayedColumns = ['view', 'edit', 'delete', 'id', 'name', 'authorName' ];
  dataSource: LELProjectsDataSource | null;
  lelProject: LELProject;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private lelProjectsService: LelProjectsService , public dialog: MatDialog ) { }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(LelEditorComponent, {
      width: '400px',
      data: {lelProject: this.lelProject}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lelProject = result;
        this.dataSource = new LELProjectsDataSource(this.lelProjectsService, this.paginator, this.sort);
        //this.lelProjectsService.save(this.lelProject);
      }
    });
  }

  openEditDialog(lelProject: LELProject ): void {
    const dialogRef = this.dialog.open(LelEditorComponent, {
      data: { lelProjectId: lelProject.id, lelProject: lelProject },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.lelProject = result;
    });

  }

  removeLelProject(): void {
    // this.lelProjectsService.remove(this.lelProject);
  }

  ngOnInit() {
    this.dataSource = new LELProjectsDataSource(this.lelProjectsService, this.paginator, this.sort);
  }
}
