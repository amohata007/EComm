import { Component, OnInit } from '@angular/core';
import { SellerService } from '../servies/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  isLoad: boolean = false;
  isSignedUp: boolean = false;
  isAuthError: boolean = false;
  constructor(private _api: SellerService, private _router: Router) {}

  ngOnInit(): void {
    this._api.reloadSeller();
  }

  sendData(data: SignUp) {
    this._api.userSignUp(data);
  }

  sendDataLogin(data: Login) {
    this._api.userLogin(data);
    console.log('Okkk', this._api.isError);
    this._api.isError.subscribe((err) => {
      if (err) {
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
