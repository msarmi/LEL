import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routing';
import 'hammerjs';
import { PagesModule } from './pages/pages.module';
import { HeaderComponent } from './layout/header/header.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MaterialModule } from './shared/modules/material.module';

import { LelProjectsService } from './shared/services/lel-projects/lel-projects.service';
import { LelEditorComponent } from './pages/lel-projects/lel-editor/lel-editor.component';
import { MatIconRegistry } from '@angular/material';
import { SymbolsService } from './shared/services/symbols/symbols.service';

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, SidenavComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    PagesModule,
    routing
  ],
  entryComponents: [LelEditorComponent],
  providers: [
    LelProjectsService, MatIconRegistry, SymbolsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
   }
}
