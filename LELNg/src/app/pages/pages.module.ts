import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SymbolsModule } from './symbols/symbols.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LelProjectsModule } from './lel-projects/lel-projects.module';

import { SharedModule } from '../shared/shared.module';
import { UsersModule } from './users/users.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../shared/modules/material.module';
import { TeamComponent } from './team/team.component';
import { TeamInviteModalComponent } from './team/team-invite-modal/team-invite-modal.component';
import { TeamModule } from './team/team.module';
import { UsersService } from '../shared/services/users/users.service';

@NgModule({
  imports: [
    CommonModule,
    SymbolsModule,
    DashboardModule,
    LelProjectsModule,
    SharedModule,
    UsersModule,
    TeamModule,
    MaterialModule,
    FormsModule,
    RouterModule
  ],
  declarations: [LoginComponent, RegisterComponent, TeamComponent],
  providers: [UsersService]
})
export class PagesModule { }

