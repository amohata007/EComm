import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../servies/product.service';
import { Product_List } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  public sellerName: string = 'Seller Name';
  public userName: string = 'User Name';
  searchResult: undefined | Product_List[];
  cartLength = 0;

  constructor(private _router: Router, private _service: ProductService) {}

  ngOnInit(): void {
    this._router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          let namee = localStorage.getItem('seller');
          let nameData = namee && JSON.parse(namee);
          this.sellerName = nameData[0].name;
        } else if (localStorage.getItem('user')) {
          this.menuType = 'user';
          const userStr = localStorage.getItem('user');
          const user = userStr && JSON.parse(userStr);
          if (user) {
            this.userName = user.name;
            this._service.getCartList(user.id);
          }
        } else {
          this.menuType = 'default';
        }
      }
    });

    let cartDataLength = localStorage.getItem('localCart');
    if (cartDataLength) {
      this.cartLength = JSON.parse(cartDataLength).length;
    }
    this._service.cartData.subscribe((item) => {
      this.cartLength = item.length;
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this._router.navigate(['/']);
    this._service.cartData.emit([]);
  }

  searchProd(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.log(element.value, 'el');
      this._service.searchProducts(element.value).subscribe((res) => {
        console.log(res, 'res');
        this.searchResult = res;
      });
    }
  }

  logoutUser() {
    localStorage.removeItem('user');
    this._router.navigate(['user-auth']);
  }

  redirectToDetails(id: string) {
    this._router.navigate(['/details/' + id]);
  }

  hideSearch() {
    this.searchResult = [];
  }

  submitSearch(val: string) {
    this._router.navigate([`search/${val}`]);
  }
}
