import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryService } from '../history.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  public formError: string = '';

  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private historyService: HistoryService
  ) { }

  ngOnInit() {
  }

  public onLoginSubmit(): void {
    /* implement this later if you have time, lol
    this.formError = '';
    if (
      !this.credentials.email ||
      !this.credentials.password
    ) {
      this.formError = 'All fields are required, please try again';
    } else {
      this._doLogin();
    }
    */

    this._doLogin();
    console.log('THIS.ROUTER.NAVIGATE', this.router.url);
    this.router.navigate[('app-admin-location-list')];
  }

  private _doLogin(): void {
    this.authenticationService.login(this.credentials)
    .then(() => {
      this.router.navigateByUrl('admin/location');
    })
    .catch((message) => this.formError = message);
  }


}
