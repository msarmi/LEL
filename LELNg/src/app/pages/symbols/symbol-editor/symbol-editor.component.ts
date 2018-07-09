import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category, Symbol, Synonym, Notion, BehaviouralResponse } from '../../../shared/models/index';
import { SymbolsService } from '../../../shared/services/symbols/symbols.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';
import { LelProjectsService } from '../../../shared/services/lel-projects/lel-projects.service';

@Component({
  selector: 'app-symbol-editor',
  templateUrl: './symbol-editor.component.html',
  styleUrls: ['./symbol-editor.component.scss']
})
export class SymbolEditorComponent implements OnInit {
  symbol: Symbol;

  _symbolId: number;
  get symbolId(): number {
    return this._symbolId;
  }
  @Input('symbolId')
  set symbolId(symbolId: number) {
    this._symbolId = symbolId;
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
    private authenticationService: AuthenticationService,
    private lelProjectsService: LelProjectsService) {
  }

  ngOnInit() {
    if (this.canSave === undefined) {
      this.canSave = true;
    }
    if (this.isModeNew()) {
      this.symbol = new Symbol();
      this.symbol.authorId = this.authenticationService.getUser().id;
    } else {
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
    this.filteredOptions = this.notionControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  isModeNew(): boolean {
    return !this.symbolId;
  }

  cancel() {
    this.canceled.emit();
  }

  save(): void {
    if (this.isModeNew()) {
      this.symbolsService.save(this.symbol)
        .subscribe(response =>
          this.saved.emit(response)
        );
    } else {
      this.symbolsService.update(this.symbol)
        .subscribe(response =>
          this.saved.emit(response)
        );
    }
  }

  addSynonym(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const synonym = new Synonym();
      synonym.name = value.trim();
      this.symbol.synonyms.push(synonym);
    }

    if (input) {
      input.value = '';
    }
  }

  removeSynonym(synonym: Synonym): void {
    const index = this.symbol.synonyms.indexOf(synonym);

    if (index >= 0) {
      this.symbol.synonyms.splice(index, 1);
    }
  }

  addNotion(event): void {
    if (this.trigger.autocomplete.isOpen) {
      this.trigger._handleKeydown(event);
    } else if ((this.newNotion || '').trim()) {
      const notion = new Notion();
      notion.expression = this.replaceTagsWithJSON(this.newNotion.trim());
      notion.authorId = 1;
      this.symbol.notions.push(notion);
      this.newNotion = null;
    }
  }

  removeNotion(notion: Notion): boolean {
    const index = this.symbol.notions.indexOf(notion);

    if (index >= 0) {
      this.symbol.notions.splice(index, 1);
    }
    // to prevent bubbleing
    return false;
  }

  editNotion(notion: Notion): void {

  }

  addBehaviouralResponse(): void {
    if ((this.newBehaviouralResponse || '').trim()) {
      const behaviouralResponse = new BehaviouralResponse();
      behaviouralResponse.expression = this.newBehaviouralResponse.trim();
      behaviouralResponse.authorId = 1;
      this.symbol.behaviouralResponses.push(behaviouralResponse);
      this.newBehaviouralResponse = null;
    }
  }

  removeBehaviouralResponse(behaviouralResponse: BehaviouralResponse): boolean {
    const index = this.symbol.behaviouralResponses.indexOf(behaviouralResponse);

    if (index >= 0) {
      this.symbol.behaviouralResponses.splice(index, 1);
    }
    // to prevent bubbleing
    return false;
  }

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

  notionInputChange(event) {
    if (event.currentTarget.value &&
      event.currentTarget.selectionEnd ===
      event.currentTarget.selectionStart &&
      event.keyCode !== 13
    ) {
      this.newNotionCursorIndex = event.currentTarget.selectionEnd;
      const subStringInput = event.currentTarget.value.substring(0, this.newNotionCursorIndex);
      const splitted = subStringInput.split(' ');
      const lastSymbol = splitted.slice(-1)[0];
      if (lastSymbol.startsWith('#')) {
        this.notionControl.setValue(lastSymbol);
        this.trigger.openPanel();
      } else {
        this.notionControl.setValue('');
        this.trigger.closePanel();
      }
    }
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
