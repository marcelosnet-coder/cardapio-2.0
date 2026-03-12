
export type Category = 'PIZZA' | 'COMBO' | 'BEVERAGE';

export interface Product {
  id: string;
  name: string;
  price: number;
  ingredients?: string;
  imageUrl: string;
  category: Category;
}

export interface OrderItem {
  id: string;
  product1: Product;
  product2?: Product; // For half-and-half
  quantity: number;
  observations: string;
  totalPrice: number;
}

export interface CustomerData {
  name: string;
  phone: string;
  address: string;
  paymentMethod?: string;
  changeFor?: string;
}

export interface OrderHistory {
  orderNumber: string;
  items: OrderItem[];
  customer: CustomerData;
  date: string;
}
