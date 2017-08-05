import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LelProjectsComponent } from './lel-projects.component';
import { SharedModule } from '../../shared/shared.module';

const LELPROJECTS_ROUTES = [
    { path: '', component: LelProjectsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(LELPROJECTS_ROUTES)
  ],
  declarations: [LelProjectsComponent]
})
export class LelProjectsModule { }
