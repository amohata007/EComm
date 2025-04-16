import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../servies/product.service';
import { Product_List } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | Product_List;
  updateMessage: undefined | string;

  constructor(
    private route: ActivatedRoute,
    private _service: ProductService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this._service.getProductList(productId).subscribe((res) => {
        this.productData = res;
      });
  }

  onSubmit(data: Product_List) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this._service.updateProduct(data).subscribe((res) => {
      if (res) {
        this.updateMessage = `Product ${res.name} has been updated.`;
      }
      setTimeout(() => {
        this.updateMessage = undefined;
        this._router.navigate(['seller-home']);
      }, 2000);
    });
  }
}
