import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) {}

  checkIdentity() {
    const token = localStorage?.getItem('accessToken');
    let isExpired: boolean;

    try {
      const state = localStorage?.getItem('hasAccessToAdminDashboard');
      if (state == '' || state == null) {
        _hasAccessToAdminDashboard = false;
      } else {
        _hasAccessToAdminDashboard = state == 'true' ? true : false;
      }
      isExpired = this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      isExpired = true;
    }

    _isAuthenticated = !isExpired && token != null;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
  get hasAccessToAdminDashboard(): boolean {
    return _hasAccessToAdminDashboard;
  }
  set hasAccessToAdminDashboard(state: boolean) {
    _hasAccessToAdminDashboard = state;
  }
}

export let _isAuthenticated: boolean;
export let _hasAccessToAdminDashboard: boolean;
