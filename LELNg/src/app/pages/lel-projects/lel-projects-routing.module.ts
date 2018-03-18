import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LelProjectsComponent } from './lel-projects.component';
import { LelViewComponent } from './lel-view/lel-view.component';
import { SymbolsComponent } from '../symbols/symbols.component';

const lelProjectsRoutes: Routes = [
  { path: 'lelprojects',  component: LelProjectsComponent },
  { path: 'lelproject/:id', component: LelViewComponent},
  { path: 'lelproject/:id/symbols', component: SymbolsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(lelProjectsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LelProjectsRoutingModule { }