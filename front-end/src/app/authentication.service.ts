import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from './storage';
import { Admin } from './admin';
import { AuthResponse } from './authresponse';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
  private dataService: DataService ) { }

  public getToken(): string {
    return this.storage.getItem('admin-token');
  }
  public saveToken(token: string): void {
    this.storage.setItem('admin-token', token);
  }

  public login(admin: Admin): Promise<any> {
    return this.dataService.login(admin)
    .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  public register(admin: Admin): Promise<any> {
    return this.dataService.register(admin)
    .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  public logout(): void {
    this.storage.removeItem('admin-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now () / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser(): Admin {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as Admin;
    }
  }
}
