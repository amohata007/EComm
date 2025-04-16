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
}
