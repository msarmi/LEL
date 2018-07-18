import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LelProjectsComponent } from './lel-projects.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { LelEditorComponent } from './lel-editor/lel-editor.component';
import { FormsModule } from '@angular/forms';
import { LelViewComponent } from './lel-view/lel-view.component';
// import { LelProjectsRoutingModule } from './lel-projects-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SymbolsModule } from '../symbols/symbols.module';
import { SymbolModalComponent } from '../symbols/symbol-modal/symbol-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SymbolsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
    // ,
    // LelProjectsRoutingModule
  ],
  entryComponents: [SymbolModalComponent],
  declarations: [LelProjectsComponent, LelEditorComponent, LelViewComponent]
})
export class LelProjectsModule { }
