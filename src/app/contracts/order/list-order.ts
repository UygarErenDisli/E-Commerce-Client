export class ListOrders {
  totalCount?: number;
  orders?: ListOrder[];
}

export class ListOrder {
  id!: string;
  orderCode!: string;
  username!: string;
  userEmail!: string;
  totalPrice!: number;
  createdDate!: Date;
}
