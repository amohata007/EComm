import { Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient, private _rouer: Router) {}

  userSignup(user: SignUp) {
    return this._http.post('http://localhost:3000/users', user);
  }

  userAUthReload() {
    if (localStorage.getItem('user')) {
      this._rouer.navigate(['/']);
    }
  }

  userLogin(data: Login) {
    return this._http.get<Login[]>(
      `http://localhost:3000/users?email=${data.email}&password=${data.password}`
    );
  }
}
