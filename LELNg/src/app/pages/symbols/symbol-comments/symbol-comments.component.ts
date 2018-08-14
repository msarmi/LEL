import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';

@Component({
  selector: 'app-symbol-comments',
  templateUrl: './symbol-comments.component.html',
  styleUrls: ['./symbol-comments.component.css']
})
export class SymbolCommentsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SymbolCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
