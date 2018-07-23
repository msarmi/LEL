import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  message: String;

  constructor(public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.message = this.data.message;
  }

}
