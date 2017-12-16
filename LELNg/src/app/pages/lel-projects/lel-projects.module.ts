import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LelProjectsComponent } from './lel-projects.component';
import { MaterialModule } from '../../shared/modules/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [LelProjectsComponent]
})
export class LelProjectsModule { }
