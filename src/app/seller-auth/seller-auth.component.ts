import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  isLoad: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  sendData(data: any) {
    console.log(data);
  }
}
