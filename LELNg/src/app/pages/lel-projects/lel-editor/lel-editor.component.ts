import { Component, OnInit , Inject, Input, Output, EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LELProject } from '../../../shared/models/index';
import {FormControl, Validators} from '@angular/forms';
import { LelProjectsService } from '../../../shared/services/lel-projects/lel-projects.service';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';


@Component({
  templateUrl: './lel-editor.component.html',
  styleUrls: ['./lel-editor.component.css']
})
export class LelEditorComponent implements OnInit {

  lelProject: LELProject;
  name: FormControl;
  lelProjectId: number;

  constructor(public dialogRef: MatDialogRef<LelEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private lelProjectsService: LelProjectsService, 
    private authenticationService: AuthenticationService) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    // validar que se ingrese el nombre
    this.lelProject.name = this.name.value;
    if (this.isModeNew()) {
        this.lelProjectsService.save(this.lelProject).subscribe();
    } else {  
      this.lelProjectsService.update(this.lelProject)
      .subscribe();
    }  

  }

  isModeNew(): boolean {
    return !this.lelProjectId;
  }

  ngOnInit() {
    this.lelProjectId = this.data.lelProjectId;
    if (this.isModeNew()) {
      this.name = new FormControl(' ', [Validators.required]);
      this.lelProject = new LELProject();
      this.lelProject.authorId = this.authenticationService.getUser().id;

    } else {
      this.lelProject = this.data.lelProject;
      this.name = new FormControl(this.lelProject.name, [Validators.required]);
    }

  }

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

}
