import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // themeClass: string;
  // constructor(private overlayContainer: OverlayContainer) {
  //   this.themeClass = 'default-theme mat-app-background';
  //   this.overlayContainer.getContainerElement().className = 'default-theme cdk-overlay-container';
  // }

  // updateTheme($event) {
  //   this.themeClass = $event + ' mat-app-background mat-typography';
  //   this.overlayContainer.getContainerElement().className = $event + ' cdk-overlay-container';
  // }
}
