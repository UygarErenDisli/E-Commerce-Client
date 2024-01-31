export class DetailedOrder {
  id!: string;
  orderCode!: string;
  userName!: string;
  userEmail!: string;
  totalPrice!: number;
  description!: string;
  address!: OrderAddress;
  basketItems!: OrderBasketItems[];
  createdDate!: Date;
  isCompleted!: boolean;
}

export class OrderAddress {
  street!: string;
  city!: string;
  state!: string;
  country!: string;
  zipCode!: string;
}

export class OrderBasketItems {
  productId!: string;
  productName!: string;
  price!: number;
  quantity!: number;
}
