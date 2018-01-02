import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LELProject } from '../../../shared/models/index';
import {FormControl, Validators} from '@angular/forms';

@Component({
  templateUrl: './lel-editor.component.html',
  styleUrls: ['./lel-editor.component.css']
})
export class LelEditorComponent implements OnInit {

  lelProject: LELProject;
  name: FormControl;

  constructor(public dialogRef: MatDialogRef<LelEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    // validar que se ingrese el nombre
  }

  ngOnInit() {
    this.lelProject = new LELProject();
    this.name = new FormControl('', [Validators.required]);
  }

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

}
