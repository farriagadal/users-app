import { Injectable, Inject } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../models/user";
import decode from 'jwt-decode';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class AuthService {

  public user_role: number;
  public user: User = new User();
  private api: string;

  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(Router) private router: Router) {
    this.api = environment.API;
  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  public loginUser(username: string, password: string): Observable<any> {
    const url_api = `${this.api}/api/login/`;
    return this.http
      .post(url_api,{ username, password }, { headers: this.headers });
  }

  public setUserFromJWT(token: string): void {
    let token_data = decode(token);
    this.user.id = token_data.user_id;
    this.user.username = token_data.username;
  }

  public setToken(token: string): void {
    localStorage.setItem("accessToken", token);
  }

  public getToken(): string {
    return localStorage.getItem("accessToken");
  }

  public isLogged(): boolean {
    if (this.getToken() !== null) {
      return true
    } else {
      return false
    }
  } 

  public logoutUser(): void {
    localStorage.removeItem("accessToken");
    this.router.navigate(['/login']);
  }

}





