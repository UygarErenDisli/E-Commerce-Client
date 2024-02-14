export class LoginUserResponse {
  accessToken!: string;
  refreshToken!: string;
  expiration!: Date;
  hasAccessToAdminDashboard!: boolean;
}
