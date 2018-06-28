import { Component, OnInit } from '@angular/core';
import { LelProjectsService } from '../../shared/services/lel-projects/lel-projects.service';
import { ActivatedRoute } from '@angular/router';
import { SymbolModalComponent } from './symbol-modal/symbol-modal.component';
import { MatDialog } from '@angular/material';
import { Symbol } from '../../shared/models/index';

@Component({
  selector: 'app-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.scss']
})
export class SymbolsComponent implements OnInit {

  symbols: Symbol[];

  constructor(private route: ActivatedRoute,
    private lelProjectsService: LelProjectsService,
    public dialog: MatDialog) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.lelProjectsService.getLelProjectSymbols(+id).subscribe(
      (result) => {
        this.symbols = result;
      });
  }

  openSymbolEditor(symbolId: number): void {
    const dialogRef = this.dialog.open(SymbolModalComponent, {
      data: { symbolId: symbolId },
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (symbolId) {
          for (let i = 0; i < this.symbols.length; i++) {
            if (this.symbols[i].id === result.id) {
              this.symbols[i] = result;
              break;
            }
          }
        } else {
          this.symbols.push(result);
        }
        // si estuvo todo bien hago alguna cosa para informar el cambio.
      }
    });
  }
}
