import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../servies/product.service';
import { Product_List } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  allProductList: undefined | Product_List[];

  constructor(
    private _activate: ActivatedRoute,
    private _service: ProductService
  ) {}

  ngOnInit(): void {
    let queryFetch = this._activate.snapshot.paramMap.get('query'); //query - same name as route path
    queryFetch &&
      this._service.searchProducts(queryFetch).subscribe((res) => {
        this.allProductList = res;
      });
  }
}
