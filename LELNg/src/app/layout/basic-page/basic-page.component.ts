import { Component, OnInit } from '@angular/core';
import { ThemingService } from '../../shared/services/theming/theming.service';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css']
})
export class BasicPageComponent implements OnInit {

  themeClass: string;

  constructor(private themingService: ThemingService) {    }

  ngOnInit() {
    this.themingService.init().subscribe(theme => this.themeClass = theme);
  }

  updateTheme($event) {
    this.themingService.setTheme($event).subscribe(theme => this.themeClass = theme);
  }
}
