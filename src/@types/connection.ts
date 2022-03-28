import { PizzaSize, Topping } from './entity';

export interface PizzaToppingConnection {
  defaultSelected: boolean;
  topping: Topping;
  pizzaSize?: PizzaSize;
}
