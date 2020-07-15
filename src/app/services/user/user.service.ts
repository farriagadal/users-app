import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user_role: number;
  private api: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.api = environment.API;    
  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "JWT " + localStorage.getItem("accessToken")
  });

  public createUser(new_user: any): Observable<any> {    
    const url_api = `${this.api}/users`;
    return this.http
      .post(url_api, new_user, { headers: this.headers });
  }
  
  public getAllUsers(): Observable<any> {
    const url_api = `${this.api}/users`;
    return this.http.get(url_api, { headers: this.headers })
  }
}

