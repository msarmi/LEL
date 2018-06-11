import { Component, OnInit } from '@angular/core';
import { LelProjectsService } from '../../shared/services/lel-projects/lel-projects.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SymbolEditorComponent } from './symbol-editor/symbol-editor.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Symbol } from '../../shared/models/index';

@Component({
  selector: 'app-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.scss']
})
export class SymbolsComponent implements OnInit {

  symbols: Symbol[];
  openedEditor: boolean[];
  currentEditor: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private lelProjectsService: LelProjectsService,
              public dialog: MatDialog) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.lelProjectsService.getLelProjectSymbols(+id).subscribe(
      (result) => {
        this.symbols = result;
        this.openedEditor = this.symbols.map(() => false);
      });
  }

  openSymbolEditor(symbol: Symbol = new Symbol(), mode: string = 'new'): void {
    if (mode === 'new') {
      symbol.lELProjectId = +this.route.snapshot.paramMap.get('id');
    }

    const dialogRef = this.dialog.open(SymbolEditorComponent, {
      data: { symbolId: symbol.id , mode: mode }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (mode === 'new') {
          this.symbols.push(result);
        } else {
          for (let i = 0; i < this.symbols.length; i++) {
            if (this.symbols[i].id === result.id) {
              this.symbols[i] = result;
              break;
            }
          }
       }
        // si estuvo todo bien hago alguna cosa para informar el cambio.
      }
    });
  }

  viewSymbol(symbolIndex: number): void {
    if (symbolIndex >= 0 && symbolIndex !== this.currentEditor) {
      if (this.currentEditor) {
        this.openedEditor[this.currentEditor] = false;
      }
      this.currentEditor = symbolIndex;
      this.openedEditor[this.currentEditor] = true;
    }
  }

  isSymbolDetailVisible(symbolIndex: number): boolean {
    if (symbolIndex >= 0 && this.openedEditor && this.openedEditor.length > 0) {
      return this.openedEditor[symbolIndex];
    }
    return false;
  }

  closeEditor(): void {
    this.currentEditor = null;
  }

}
