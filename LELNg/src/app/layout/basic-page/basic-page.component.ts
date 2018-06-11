import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemingService } from '../../shared/services/theming/theming.service';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css']
})
export class BasicPageComponent {

  themeClass: string;
  defaultTheme = 'light-blue';

  constructor(private themingService: ThemingService) {
    themingService.getTheme().subscribe(theme => this.themeClass = theme);
    themingService.setTheme(this.themeClass).subscribe();
  }

  updateTheme($event) {
    this.themingService.setTheme($event).subscribe(theme => this.themeClass = theme);
  }
}
