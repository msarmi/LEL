import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolsComponent } from './symbols.component';
import { MdListModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MdListModule
  ],
  declarations: [SymbolsComponent]
})
export class SymbolsModule { }
