export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Product_List {
  name: string;
  price: number;
  code: string;
  category: string;
  description: string;
  imageUrl: string;
  id: string;
}

// {
//   "id": "5fba",
//   "name": "Iphone 15 pro",
//   "price": 149999,
//   "code": "Blue",
//   "category": "Mobile",
//   "description": "An Apple product",
//   "imageUrl": "https://m.media-amazon.com/images/I/81CgtwSII3L._SL1500_.jpg"
// }
