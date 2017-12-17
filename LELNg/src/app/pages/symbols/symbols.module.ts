import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolsComponent } from './symbols.component';
import { MaterialModule } from '../../shared/modules/material.module';
//import { MdListModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule
    ],
  declarations: [SymbolsComponent]
})
export class SymbolsModule { }
