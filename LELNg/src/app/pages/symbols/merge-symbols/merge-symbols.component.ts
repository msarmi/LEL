import { Component, OnInit } from '@angular/core';
import { LelProjectsService } from '../../../shared/services/lel-projects/lel-projects.service';
import { Symbol, MergeSymbolsData } from '../../../shared/models';
import { Router } from '@angular/router';
import { SymbolsService } from '../../../shared/services/symbols/symbols.service';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-merge-symbols',
  templateUrl: './merge-symbols.component.html',
  styleUrls: ['./merge-symbols.component.css']
})
export class MergeSymbolsComponent implements OnInit {
  selectedSymbol1: Symbol;
  selectedSymbol2: Symbol;
  name: string;

  lelProjectId: number;
  symbols: Symbol[];  
  symbolsCombo2: Symbol[];
  constructor(
    private router: Router,
    private lelProjectsService: LelProjectsService,
    private symbolsService: SymbolsService,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    this.lelProjectId = +this.router.url.split('/')[2];
    this.lelProjectsService.getLelProjectSymbols(this.lelProjectId).subscribe(
      symbols => this.symbols = symbols
    );
  }

  merge(): void {
    const mergeSymbols = new MergeSymbolsData(this.selectedSymbol1.id, this.selectedSymbol2.id, this.name, this.authenticationService.getUser().id);
    this.symbolsService.merge(mergeSymbols).subscribe(result => result);
  }
}
