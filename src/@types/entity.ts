import { PizzaToppingConnection } from './connection';

export interface PizzaSize {
  name: string;
  basePrice: number;
  maxToppings: number | null;
  toppings: PizzaToppingConnection[];
}

export interface Topping {
  name: string;
  price: number;
}
