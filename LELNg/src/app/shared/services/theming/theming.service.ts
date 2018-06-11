import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ThemingService {

  private localStorageThemeKey = 'currentTheme';

  constructor(private overlayContainer: OverlayContainer) { }

  getTheme(): Observable<string> {
    let currentTheme = localStorage.getItem(this.localStorageThemeKey);
    if (!currentTheme) {
      currentTheme = environment.defaultTheme;
    }
    return Observable.of(`${currentTheme} mat-app-background mat-typography`);
  }

  setTheme(currentTheme: string) {
    this.overlayContainer.getContainerElement().className = `${currentTheme} cdk-overlay-container`;
    localStorage.setItem(this.localStorageThemeKey, currentTheme);
    return this.getTheme();
  }
}
