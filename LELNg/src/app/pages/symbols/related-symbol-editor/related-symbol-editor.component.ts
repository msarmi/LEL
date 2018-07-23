import { Component, OnInit, Input } from '@angular/core';
import { Symbol } from '../../../shared/models/index';
import { SymbolsService } from '../../../shared/services/symbols/symbols.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { LelProjectsService } from '../../../shared/services/lel-projects/lel-projects.service';

@Component({
  selector: 'app-related-symbol-editor',
  templateUrl: './related-symbol-editor.component.html',
  styleUrls: ['./related-symbol-editor.component.scss']
})
export class RelatedSymbolEditorComponent implements OnInit {
  symbol: Symbol;

  _symbolId: number;
  get symbolId(): number {
    return this._symbolId;
  }
  @Input('symbolId')
  set symbolId(symbolId: number) {
    this._symbolId = symbolId;
    if (this._symbolId) {
      this.symbolsService.get(this.symbolId)
        .subscribe(
          (response) => {
            this.symbol = response;
            this.lelProjectsService.getLelProjectSymbols(response.lelProjectId).subscribe(
              (symbols) => {
                this.symbols = symbols;
                this.symbols.forEach(
                  (sym) => this.options.push('#' + sym.name)
                );
              }
            );
          }
        );
    }
  }

  newNotion: string;
  newNotionCursorIndex: number;
  newBehaviouralResponse: string;

  symbols: Symbol[];
  options: string[] = [];

  constructor(
    private symbolsService: SymbolsService,
    private lelProjectsService: LelProjectsService) {
  }

  ngOnInit() { }

  getBehaviouralResponsesDescription(): string {
    if ((this.symbol.behaviouralResponses.length)) {
      return `${this.symbol.behaviouralResponses.length.toString()} expression${this.symbol.behaviouralResponses.length > 1 ? 's' : ''}`;
    }
    return '';
  }

  getNotionsDescription(): string {
    if ((this.symbol.notions.length)) {
      return `${this.symbol.notions.length.toString()} expression${this.symbol.notions.length > 1 ? 's' : ''}`;
    }
    return '';
  }

  notionSymbolSelected(event: MatAutocompleteSelectedEvent) {
    if (this.newNotion) {
      const subStringInput = this.newNotion.substring(0, this.newNotionCursorIndex);
      const splitted = subStringInput.split(' ');
      splitted.pop();
      splitted.push(event.option.value);
      const replaced = splitted.join(' ');

      this.newNotion = replaced + this.newNotion.substring(this.newNotionCursorIndex);
    } else {
      this.newNotion = event.option.value;
    }
  }

  filter(val: string): string[] {
    return this.options.filter(symbol => {
      return symbol.toLowerCase().includes(val.toLowerCase());
    });
  }

  replaceTagsWithJSON(expression: string): string {
    const splitted = expression.split(' ');
    splitted.forEach(
      (word, index, theArray) => {
        if (word.startsWith('#')) {
          const symbolName = word.replace('#', '');
          const symbol = this.symbols.find((sym) => sym.name === symbolName);
          const jsonReference = `{"id":${symbol.id},"lelProjectId":${symbol.lelProjectId},"name":"${symbolName}"}`;
          theArray[index] = jsonReference;
        }
      }
    );
    return splitted.join(' ');
  }

  replaceSymbolsWithLinks(expression: string): string {
    const splitted = expression.split(' ');
    splitted.forEach(
      (word, index, theArray) => {
        if (word.startsWith('{') && word.endsWith('}')) {
          const parsedJson = JSON.parse(word);
          const linkString = `<mat-chip color="primary">#${parsedJson.name}</mat-chip>`;
          theArray[index] = linkString;
        }
      }
    );
    return splitted.join(' ');
  }

  getParsedExpression(expression: string): any[] {
    const splitted = expression.split(' ');
    splitted.forEach(
      (word, index, theArray) => {
        if (word.startsWith('{') && word.endsWith('}')) {
          theArray[index] = JSON.parse(word);
        }
      }
    );
    return splitted;
  }
}
