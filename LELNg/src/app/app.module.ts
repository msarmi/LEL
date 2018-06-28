import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routing';
import 'hammerjs';
import { PagesModule } from './pages/pages.module';
import { LayoutModule } from './layout/layout.module';
import { LelProjectsService } from './shared/services/lel-projects/lel-projects.service';
import { LelEditorComponent } from './pages/lel-projects/lel-editor/lel-editor.component';
import { MatIconRegistry } from '@angular/material';
import { SymbolsService } from './shared/services/symbols/symbols.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from './shared/interceptors/custom-http-interceptor';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PagesModule,
    routing,
    LayoutModule,
    RouterModule
  ],
  entryComponents: [LelEditorComponent],
  providers: [
    LelProjectsService, MatIconRegistry, SymbolsService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
