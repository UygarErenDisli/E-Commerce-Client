export class ListProducts {
  totalCount?: number;
  products?: ListProduct[];
}

export class ListProduct {
  id?: string;
  name?: string;
  stock?: number;
  price?: number;
  createdDate?: Date;
  updatedDate?: Date;
}
