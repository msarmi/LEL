import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  themeClass: string;
  constructor() {
    this.themeClass = 'default-theme mat-app-background';
  }

  updateTheme($event) {
    this.themeClass = $event + ' mat-app-background mat-typography';
  }
}
