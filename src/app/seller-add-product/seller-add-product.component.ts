import { Component, OnInit } from '@angular/core';
import { ProductService } from '../servies/product.service';
import { Product_List } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  public displayMessage: string | undefined = '';
  constructor(private _service: ProductService) {}

  ngOnInit(): void {}

  onSubmit(data: Product_List) {
    this._service.addProduct(data).subscribe((res) => {
      if (data) {
        this.displayMessage = 'Product is Successfully Added..!!';
      }
      setTimeout(() => (this.displayMessage = undefined), 3000);
    });
  }
}
