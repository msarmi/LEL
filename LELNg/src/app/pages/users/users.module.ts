import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { MdCardModule , MdButtonModule, MdIconModule } from '@angular/material';
import {MdInputModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule
  ],
  declarations: [UsersComponent, UserEditorComponent]
})
export class UsersModule { }
