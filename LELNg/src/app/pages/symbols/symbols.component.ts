import { Component, OnInit } from '@angular/core';
import { LelProjectsService } from '../../shared/services/lel-projects/lel-projects.service';
import { ActivatedRoute } from '@angular/router';
import { SymbolModalComponent } from './symbol-modal/symbol-modal.component';
import { MatDialog } from '@angular/material';
import { Symbol } from '../../shared/models/index';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { SymbolsService } from '../../shared/services/symbols/symbols.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { SymbolLike } from '../../shared/models/symbol-like';
import { SymbolsLikeService } from '../../shared/services/symbols-like/symbols-like.service';

@Component({
  selector: 'app-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.scss']
})
export class SymbolsComponent implements OnInit {

  symbols: Symbol[];

  constructor(private route: ActivatedRoute,
    private lelProjectsService: LelProjectsService,
    private symbolsService: SymbolsService,
    private authenticationService: AuthenticationService,
    private symbolsLikeService: SymbolsLikeService,
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
      width: '80%',
      height: '80%',
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


  removeSymbol(symbol: Symbol): void {
    const dialogRef = this.dialog.open(AlertComponent, {
    data: { message: `Are you sure you want to delete ${symbol.name} ?`  }
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result){
        this.symbolsService.remove(symbol).subscribe(result => result);
      }

    });
  }

  like(symbol: Symbol): void {
    const like = new SymbolLike();
    like.authorId = this.authenticationService.getUser().id;
    like.symbolId= symbol.id;
    like.isLike = true; 
    this.symbolsLikeService.saveOrUpdate(like).subscribe();
  }

  disLike(symbol: Symbol): void {
    const dislike = new SymbolLike();
    dislike.authorId = this.authenticationService.getUser().id;
    dislike.symbolId= symbol.id;
    dislike.isLike = false; 
    this.symbolsLikeService.saveOrUpdate(dislike).subscribe();
  }

}
