import { ListBasketItems } from '../../contracts/basket/list-basket-items';

export class CheckoutDetails {
  basketItems!: ListBasketItems[];
  totalPrice!: number;
  totalItems!: number;
}
