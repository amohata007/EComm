import { Component, OnInit } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { UserService } from '../servies/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  isLoad: boolean = false;
  isSignedUp: boolean = false;
  isAuthError: boolean = false;
  constructor(private _service: UserService, private _router: Router) {}

  ngOnInit(): void {
    this._service.userAUthReload();
  }

  sendData(data: SignUp) {
    this._service.userSignup(data).subscribe((res) => {
      if (res) {
        localStorage.setItem('user', JSON.stringify(res));
        this._router.navigate(['/']);
      }
    });
  }

  sendDataLogin(data: Login) {
    this._service.userLogin(data).subscribe((res) => {
      console.warn(res, 'resss');
      if (res && res.length > 0) {
        localStorage.setItem('user', JSON.stringify(res));
        this._router.navigate(['/']);
      } else {
        this.isAuthError = true;
      }
    });
  }

  changeToggle() {
    if (this.isSignedUp) {
      this.isSignedUp = false;
    } else {
      this.isSignedUp = true;
    }
  }
}
