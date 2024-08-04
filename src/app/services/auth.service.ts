import { Injectable, inject } from '@angular/core';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import { LOGIN } from '../components/login/constants/login.constants';
import { LoginApiResponse } from '../components/login/models/login.models';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private helper = new JwtHelperService();
  apollo = inject(Apollo);

  login(
    authRequest: Partial<{ userName: string | null; password: string | null }>
  ): Observable<MutationResult<LoginApiResponse>> {
    return this.apollo.mutate<LoginApiResponse>({
      mutation: LOGIN,
      variables: {
        authRequest: authRequest
      },
    });
  }



  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): { token: any, role: string | null } {
    const token = this.getToken();
    const decodedToken = token ? this.helper.decodeToken(token) : null;
    const role = decodedToken.authorities;
    return { token: decodedToken, role };
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const isExpired = this.helper.isTokenExpired(token);
      if (isExpired) {
        this.logout();
        return false;
      }
      return true;
    }
    return false;
  }

  checkTokenExpiry() {
    const token = this.getToken();
    if (token && this.helper.isTokenExpired(token)) {
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem('token');
  }
}
