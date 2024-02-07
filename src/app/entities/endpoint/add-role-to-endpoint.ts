export class AddRoleToEndpoint {
  menuName!: string;
  actionType!: string;
  httpType!: string;
  definition!: string;
  actionCode!: string;

  constructor(
    menuName: string,
    actionCode: string,
    actionType: string,
    httpType: string,
    definition: string
  ) {
    this.menuName = menuName;
    this.actionCode = actionCode;
    this.actionType = actionType;
    this.httpType = httpType;
    this.definition = definition;
  }
}
