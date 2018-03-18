import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolsComponent } from './symbols.component';
import { MaterialModule } from '../../shared/modules/material.module';

import { SymbolEditorComponent } from './symbol-editor/symbol-editor.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule
  ],
  declarations: [SymbolsComponent, SymbolEditorComponent],
  exports: [SymbolsComponent, SymbolEditorComponent]
})
export class SymbolsModule { }
