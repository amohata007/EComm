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
  searchResult: undefined | Product_List[];
  constructor(private _router: Router, private _service: ProductService) {}

  ngOnInit(): void {
    this._router.events.subscribe((val: any) => {
      // console.log(val.url);
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          let namee = localStorage.getItem('seller');
          let nameData = namee && JSON.parse(namee);
          this.sellerName = nameData[0].name;
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this._router.navigate(['/']);
  }

  searchProd(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.log(element.value, 'el');
      this._service.searchProducts(element.value).subscribe((res) => {
        console.log(res, 'res');
        this.searchResult = res;
        // console.log(this.searchResult, 'ok');
      });
    }
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
