import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolsModule } from './symbols/symbols.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LelProjectsModule } from './lel-projects/lel-projects.module';

import { SharedModule } from '../shared/shared.module';
import { UsersModule } from './users/users.module';

@NgModule({
  imports: [
    CommonModule,
    SymbolsModule,
    DashboardModule,
    LelProjectsModule,
    SharedModule,
    UsersModule
  ],
  declarations: [],
  providers: []
})
export class PagesModule { }

