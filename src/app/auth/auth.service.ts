import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface LoginInput {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.backendUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(loginInput: LoginInput) {
    return this.http.post(`${this.baseUrl}/login`, loginInput);
  }
}
