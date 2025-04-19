import { Component, OnInit } from '@angular/core';
import { Cart_Data, Login, Product_List, SignUp } from '../data-type';
import { UserService } from '../servies/user.service';
import { Router } from '@angular/router';
import { ProductService } from '../servies/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  isLoad: boolean = false;
  isSignedUp: boolean = false;
  isAuthError: boolean = false;
  constructor(
    private _service: UserService,
    private _router: Router,
    private _product: ProductService
  ) {}

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
        this.localCartToRemoteCart();
      } else {
        this.isAuthError = true;
      }
    });
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    if (data) {
      let cartDataList: Product_List[] = JSON.parse(data);

      cartDataList.forEach((product: Product_List, index) => {
        let cartData: Cart_Data = {
          ...product,
          productId: product.id,
          userId,
        };

        delete cartData.id;
        setTimeout(() => {
          this._product.addToCart(cartData).subscribe((res) => {
            if (res) {
              console.warn('Item stored in db');
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }

    setTimeout(() => {
      this._product.getCartList(userId);
    }, 2000);
  }

  changeToggle() {
    if (this.isSignedUp) {
      this.isSignedUp = false;
    } else {
      this.isSignedUp = true;
    }
  }
}
