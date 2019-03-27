import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/modules/material.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { TeamInviteModalComponent } from './team-invite-modal/team-invite-modal.component';
import { UsersService } from '../../shared/services/users/users.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TeamInviteModalComponent],
  exports: [TeamInviteModalComponent],
  entryComponents: [TeamInviteModalComponent],
  providers: [UsersService]
})
export class TeamModule { }
