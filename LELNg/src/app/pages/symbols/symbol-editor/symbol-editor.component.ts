import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-symbol-editor',
  templateUrl: './symbol-editor.component.html',
  styleUrls: ['./symbol-editor.component.css']
})
export class SymbolEditorComponent  {
  selectedValue: string;

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

}
