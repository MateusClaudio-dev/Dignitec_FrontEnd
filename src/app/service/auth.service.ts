
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    private API_URL_BASE = 'https://dignitecbackend-production-5ee4.up.railway.app';
    // private API_URL_BASE = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  criarConta(dados: any): Observable<any> {
    return this.http.post(`${this.API_URL_BASE}/criarConta`, dados)
  }

  fazerLogin(dados: any): Observable<any> {
    return this.http.post(`${this.API_URL_BASE}/login`, dados)
  }
}
