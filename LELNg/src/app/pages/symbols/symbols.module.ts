import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolsComponent } from './symbols.component';
import { MaterialModule } from '../../shared/modules/material.module';

import { SymbolEditorComponent } from './symbol-editor/symbol-editor.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [SymbolsComponent, SymbolEditorComponent]
})
export class SymbolsModule { }
