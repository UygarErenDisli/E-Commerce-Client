export class CancelOrder {
  id!: string;
  orderCode!: string;
  username!: string;
  userEmail!: string;
  totalPrice!: number;
  createdDate!: Date;
  reason?: string;

  constructor(
    id: string,
    orderCode: string,
    username: string,
    userEmail: string,
    totalPrice: number,
    createdDate: Date
  ) {
    this.id = id;
    this.orderCode = orderCode;
    this.username = username;
    this.userEmail = userEmail;
    this.totalPrice = totalPrice;
    this.createdDate = createdDate;
  }
}
