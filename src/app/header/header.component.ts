import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  public sellerName: string = 'Seller Name';
  constructor(private _router: Router) {}

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
}
