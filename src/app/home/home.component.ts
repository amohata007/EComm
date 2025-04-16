import { Component, OnInit } from '@angular/core';
import { Product_List } from '../data-type';
import { ProductService } from '../servies/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  popular_products: undefined | Product_List[];

  constructor(private _service: ProductService) {}

  ngOnInit(): void {
    this._service.popularProduct().subscribe((data) => {
      this.popular_products = data;
      // console.log(this.popular_products, 'check');
    });
  }
}
