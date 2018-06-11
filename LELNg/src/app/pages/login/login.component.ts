import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { ThemingService } from '../../shared/services/theming/theming.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  themeClass: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private themingService: ThemingService) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

      this.themingService.getTheme().subscribe(theme => this.themeClass = theme);
  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
              data => {
                  if (this.returnUrl) {
                    this.router.navigate([this.returnUrl]);
                  }
                  this.router.navigate(['']);
              },
              error => {
                 // this.alertService.error(error);
                  this.loading = false;
              });
  }

}
