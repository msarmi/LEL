import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../../shared/models';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ThemingService } from '../../shared/services/theming/theming.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loading: boolean;
  user: RegisterUser;
  repeatPassword: string;
  themeClass: string;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private themingService: ThemingService) { }

  ngOnInit() {
    this.user = new RegisterUser();
    this.themingService.getTheme().subscribe(theme => this.themeClass = theme);
  }

  register() {
    // validate password matching
    this.loading = true;
      this.authenticationService.register(this.user)
          .subscribe(
              data => {
                  this.router.navigate(['']);
              },
              error => {
                 // this.alertService.error(error);
                  this.loading = false;
              });
  }

}
