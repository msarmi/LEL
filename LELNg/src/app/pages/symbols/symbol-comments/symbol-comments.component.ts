import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';
import { SymbolComment } from '../../../shared/models/symbol-comment';

@Component({
  selector: 'app-symbol-comments',
  templateUrl: './symbol-comments.component.html',
  styleUrls: ['./symbol-comments.component.css']
})
export class SymbolCommentsComponent implements OnInit {

  symbolComments : SymbolComment[];

  constructor(public dialogRef: MatDialogRef<SymbolCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.symbolComments= this.data.symbolComments;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
