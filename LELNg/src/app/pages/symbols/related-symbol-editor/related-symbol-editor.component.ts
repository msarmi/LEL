import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category, Symbol, Synonym, Notion, BehaviouralResponse } from '../../../shared/models/index';
import { SymbolsService } from '../../../shared/services/symbols/symbols.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ViewChild } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';
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
    if (symbolId !== this._symbolId) {
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
  }

  @Input() canSave: boolean;

  @Output('saved') saved = new EventEmitter<Symbol>();
  @Output('canceled') canceled = new EventEmitter<void>();
  @Output('loadRelatedSymbol') loadRelatedSymbol = new EventEmitter<number>();

  categories = Category;
  mode: string;
  newNotion: string;
  newNotionCursorIndex: number;
  newBehaviouralResponse: string;

  visible: true;
  selectable: true;
  removable: true;
  addOnBlur: true;

  separatorKeysCodes = [ENTER, COMMA];

  notionControl = new FormControl();

  symbols: Symbol[];
  options: string[] = [];

  filteredOptions: Observable<string[]>;
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;

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

  relatedSymbolSelected(symbolId: number) {
    this.loadRelatedSymbol.emit(symbolId);
  }
}
