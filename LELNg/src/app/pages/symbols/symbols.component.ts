import { Component, OnInit } from '@angular/core';
import { LelProjectsService } from '../../shared/services/lel-projects/lel-projects.service';
import { ActivatedRoute } from '@angular/router';
import { SymbolModalComponent } from './symbol-modal/symbol-modal.component';
import { MatDialog } from '@angular/material';
import { Symbol, Category } from '../../shared/models/index';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { SymbolsService } from '../../shared/services/symbols/symbols.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { SymbolLike } from '../../shared/models/symbol-like';
import { SymbolsLikeService } from '../../shared/services/symbols-like/symbols-like.service';
import { SymbolCommentsComponent } from './symbol-comments/symbol-comments.component';
import { MergeSymbolsComponent } from './merge-symbols/merge-symbols.component';
@Component({
  selector: 'app-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.scss']
})
export class SymbolsComponent implements OnInit {

  symbols: Symbol[];

  symbolsFiltered: Symbol[];

  symbolFilter: Symbol;
  categories = Category;

  constructor(private route: ActivatedRoute,
    private lelProjectsService: LelProjectsService,
    private symbolsService: SymbolsService,
    private authenticationService: AuthenticationService,
    private symbolsLikeService: SymbolsLikeService,
    public dialog: MatDialog) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.symbolFilter = new Symbol;
    this.lelProjectsService.getLelProjectSymbols(+id).subscribe(
      (result) => {
        this.symbols = result;
        this.symbolsFiltered = result;
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
      data: { message: `Are you sure you want to delete ${symbol.name} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.symbolsService.remove(symbol).subscribe(result => result);
        const index = this.symbols.indexOf(symbol);
        if (index > -1) {
          this.symbols.splice(index, 1);
          this.symbolsFiltered = this.symbols;
        }
      }
    });
  }

  like(symbol: Symbol): void {
    if (this.symbolHasLike(symbol)) { return; }
    const like = new SymbolLike();
    like.authorId = this.authenticationService.getUser().id;
    like.symbolId = symbol.id;
    like.isLike = true;
    this.symbolsLikeService.saveOrUpdate(like).subscribe(response => this.refreshSymbol(symbol));
  }

  disLike(symbol: Symbol): void {
    if (this.symbolHasDislike(symbol)) { return; }
    const dislike = new SymbolLike();
    dislike.authorId = this.authenticationService.getUser().id;
    dislike.symbolId = symbol.id;
    dislike.isLike = false;
    this.symbolsLikeService.saveOrUpdate(dislike).subscribe(response => this.refreshSymbol(symbol));
  }

  refreshSymbol(symbol: Symbol): void {
    this.symbolsService.get(symbol.id).subscribe(symbolUpdated => {
      let index: number;
      for (var i = 0; i < this.symbols.length; i++) {
        if (this.symbols[i].id === symbol.id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        this.symbols[index] = symbolUpdated;
      }
    });
  }

  symbolHasLike(symbol: Symbol): boolean {
    if (symbol) {
      for (let like of symbol.symbolLikes.filter(value => value.isLike)) {
        if (like.authorId === this.authenticationService.getUser().id) {
          return true;
        }
      }
    }
    return false;
  }

  symbolHasDislike(symbol: Symbol): boolean {
    if (symbol) {
      for (let like of symbol.symbolLikes.filter(value => !value.isLike)) {
        if (like.authorId === this.authenticationService.getUser().id) { return true; }
      }
    }
    return false;
  }

  filter(): void {
    if (this.symbolFilter.name) {
      this.symbolsFiltered = this.symbols.filter((aSymbol: Symbol) => aSymbol.name === this.symbolFilter.name);
      if (this.symbolFilter.category >= 0) {
        this.symbolsFiltered = this.symbolsFiltered.filter((aSymbol: Symbol) => aSymbol.category === this.symbolFilter.category);
      }
    } else {
      if (this.symbolFilter.category >= 0) {
        this.symbolsFiltered = this.symbols.filter((aSymbol: Symbol) => aSymbol.category === this.symbolFilter.category);
      } else {
        this.symbolsFiltered = this.symbols;
      }
    }
  }

  openSymbolComments(symbol: Symbol): void {
    const dialogRef = this.dialog.open(SymbolCommentsComponent, {
      data: { symbolId: symbol.id },
      width: '60%',
      height: '60%',
    });
  }

  openSymbolMerge(): void {
    const dialogRef = this.dialog.open(MergeSymbolsComponent, {
      width: '35%',
      height: '40%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const id = this.route.snapshot.paramMap.get('id');
        this.lelProjectsService.getLelProjectSymbols(+id).subscribe(
          (result) => {
            this.symbols = result;
            this.symbolsFiltered = result;
          });
      }
    });

  }

}
