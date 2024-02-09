export class ListUsers {
  totalCount?: number;
  users?: ListUser[];
}

export class ListUser {
  usesrId!: string;
  userName!: string;
  nameSurname!: string;
  email!: string;
}
