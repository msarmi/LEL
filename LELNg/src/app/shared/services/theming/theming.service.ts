import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ThemingService {

  private localStorageThemeKey = 'currentTheme';
  private currentTheme: string;
  constructor(private overlayContainer: OverlayContainer) { }

  init(): Observable<string> {
    this.currentTheme = localStorage.getItem(this.localStorageThemeKey);
    if (!this.currentTheme) {
      this.currentTheme = environment.defaultTheme;
      localStorage.setItem(this.localStorageThemeKey, this.currentTheme);
    }
    this.setOverlayTheme(this.currentTheme);
    return this.getTheme();
  }

  getTheme(): Observable<string> {
    return Observable.of(`${this.currentTheme} mat-app-background mat-typography`);
  }

  setTheme(currentTheme: string): Observable<string> {
    this.currentTheme = currentTheme;
    this.setOverlayTheme(this.currentTheme);
    localStorage.setItem(this.localStorageThemeKey, this.currentTheme);
    return this.getTheme();
  }

  private setOverlayTheme(theme: string) {
    this.overlayContainer.getContainerElement().className = `${theme} cdk-overlay-container`;
  }
}
