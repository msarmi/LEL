import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  themeChanged: EventEmitter<string> = new EventEmitter();

  themes: any[];

  constructor() {

  }

  ngOnInit() {
    this.themes = Array.from([
      { text: 'default-theme', cols: 1, rows: 1, color: 'lightblue' },
      { text: 'my-theme', cols: 1, rows: 1, color: 'lightgreen' },
      { text: 'm2app-dark', cols: 1, rows: 1, color: 'lightpink' },
      { text: 'Four', cols: 1, rows: 1, color: '#DDBDF1' },
    ]);
  }

  themeClassChanged(selectedTheme) {
    this.themeChanged.emit(selectedTheme);
  }
}
