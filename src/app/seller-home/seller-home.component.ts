import { Component, OnInit } from '@angular/core';
import { ProductService } from '../servies/product.service';
import { Product_List } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  public product_list: undefined | Product_List[];
  public deleteMessage: undefined | string;

  constructor(private _service: ProductService) {}

  ngOnInit(): void {
    this._service.getProduct().subscribe((res) => {
      // console.log(res);
      this.product_list = res;
    });
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this._service.deleteProduct(id).subscribe(() => {
        this.product_list = this.product_list?.filter((p) => p.id !== id);
      });
      this.deleteMessage = 'Product is Successfully Deleted..!!';
      setTimeout(() => (this.deleteMessage = undefined), 3000);
    }
  }
}
