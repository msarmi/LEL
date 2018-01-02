import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LelProjectsComponent } from './lel-projects.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { LelEditorComponent } from './lel-editor/lel-editor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [LelProjectsComponent, LelEditorComponent]
})
export class LelProjectsModule { }
