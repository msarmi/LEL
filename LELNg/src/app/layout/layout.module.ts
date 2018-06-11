import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { BasicPageComponent } from './basic-page/basic-page.component';
import { MaterialModule } from '../shared/modules/material.module';
import { LayoutRoutingModule } from './layout.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    LayoutRoutingModule
  ],
  declarations: [HeaderComponent, SidenavComponent, FooterComponent, BasicPageComponent]
})
export class LayoutModule { }
