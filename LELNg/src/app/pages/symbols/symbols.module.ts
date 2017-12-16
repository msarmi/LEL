import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolsComponent } from './symbols.component';
import { MdListModule } from '@angular/material';
import { SymbolEditorComponent } from './symbol-editor/symbol-editor.component';
import { MdCardModule , MdButtonModule } from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdSelectModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MdListModule,
    MdCardModule,
    MdButtonModule,
    MdInputModule,
    MdSelectModule
  ],
  declarations: [SymbolsComponent, SymbolEditorComponent]
})
export class SymbolsModule { }
