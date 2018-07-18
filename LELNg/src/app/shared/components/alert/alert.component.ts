import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-symbol-modal',
  templateUrl: './symbol-modal.component.html',
  styleUrls: ['./symbol-modal.component.scss']
})
export class SymbolModalComponent implements OnInit {

  symbolId: number;
  relatedSymbolId: number;
  constructor(
    public dialogRef: MatDialogRef<SymbolModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.symbolId = this.data.symbolId;
  }

  saved(symbol: Symbol) {
    this.dialogRef.close(symbol);
  }

  canceled() {
    this.dialogRef.close();
  }

  loadRelatedSymbol(symbolId:number){
    this.relatedSymbolId = symbolId;
  }
}
