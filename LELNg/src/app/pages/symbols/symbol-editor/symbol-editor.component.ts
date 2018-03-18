import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Category, Symbol, Synonym, Notion, BehaviouralResponse } from '../../../shared/models/index';
import { SymbolsService } from '../../../shared/services/symbols/symbols.service';
import { Observable } from 'rxjs/Observable';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { KeysPipe } from '../../../shared/pipes/KeysPipe';

@Component({
  selector: 'app-symbol-editor',
  templateUrl: './symbol-editor.component.html',
  styleUrls: ['./symbol-editor.component.scss']
})
export class SymbolEditorComponent implements OnInit {
  symbol: Symbol;
  symbolId: number;
  categories = Category;
  mode: string;
  newNotion: string;
  newBehaviouralResponse: string;

  visible: true;
  selectable: true;
  removable: true;
  addOnBlur: true;

  separatorKeysCodes = [ENTER, COMMA];

  constructor(public dialogRef: MatDialogRef<SymbolEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private symbolsService: SymbolsService) {
    this.symbolId = data.symbolId;
    this.mode = data.mode;
  }

  ngOnInit() {
    if (this.symbolId) {
      this.symbolsService.get(this.symbolId)
        .subscribe(
          (response) => {
            this.symbol = response;
          }
        );
    } else {
      this.symbol = new Symbol();
      this.symbol.authorId = 1;
    }
  }

  save(): void {
    if (this.mode === 'new') {
      this.symbolsService.save(this.symbol).subscribe(response => this.dialogRef.close(response));
    } else {
      this.symbolsService.update(this.symbol).subscribe(response => this.dialogRef.close(response));
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

  addNotion(): void {
    if ((this.newNotion || '').trim()) {
      const notion = new Notion();
      notion.expression = this.newNotion.trim();
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

  removeBehaviouralResponse(behaviouralResponse: BehaviouralResponse): void {
    const index = this.symbol.behaviouralResponses.indexOf(behaviouralResponse);

    if (index >= 0) {
      this.symbol.behaviouralResponses.splice(index, 1);
    }
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
}
