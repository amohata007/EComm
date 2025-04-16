import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isError = new EventEmitter<boolean>(false);
  constructor(private _http: HttpClient, private _router: Router) {}

  userSignUp(data: SignUp) {
    return this._http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((res) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(res.body));
        this._router.navigate(['/seller-home']);
        // console.log('res', res);
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this._router.navigate(['/seller-home']);
    }
  }

  userLogin(data: Login) {
    return this._http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((res: any) => {
        // console.log(res, 'login');
        if (res && res.body && res.body.length) {
          localStorage.setItem('seller', JSON.stringify(res.body));
          this._router.navigate(['/seller-home']);
        } else {
          this.isError.emit(true);
        }
      });
  }
}
