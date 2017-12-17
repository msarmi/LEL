import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { MaterialModule } from '../../shared/modules/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [UsersComponent, UserEditorComponent]
})
export class UsersModule { }
