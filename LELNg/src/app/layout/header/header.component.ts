import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { DerpPipe } from '../../shared/pipes/derp-pipe';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';
import { concatMap, delay } from 'rxjs/operators';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  themeChanged: EventEmitter<string> = new EventEmitter();

  themes$;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.themes$ = Observable.of([
        { text: 'light-blue', cols: 1, rows: 1, color: '#2196f3' },
        { text: 'light-green', cols: 1, rows: 1, color: '#4caf50' },
        { text: 'pink-dark', cols: 1, rows: 1, color: '#e91e63' },
        { text: 'purple', cols: 1, rows: 1, color: '#DDBDF1' },
      ]);
      // this.getThemes();
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

  themeClassChanged(selectedTheme) {
    this.themeChanged.emit(selectedTheme);
  }
}
