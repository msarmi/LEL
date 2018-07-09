import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolsComponent } from './symbols.component';
import { MaterialModule } from '../../shared/modules/material.module';

import { SymbolEditorComponent } from './symbol-editor/symbol-editor.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SymbolModalComponent } from './symbol-modal/symbol-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RelatedSymbolEditorComponent } from './related-symbol-editor/related-symbol-editor.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SymbolsComponent, SymbolEditorComponent, SymbolModalComponent, RelatedSymbolEditorComponent],
  exports: [SymbolsComponent, SymbolEditorComponent, SymbolModalComponent, RelatedSymbolEditorComponent]
})
export class SymbolsModule { }
