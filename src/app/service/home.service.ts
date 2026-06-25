import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  private API_URL = 'http://localhost:3001/anuncios';

  constructor(private http: HttpClient) {
    console.log(this.API_URL)
  }

  getAnuncios(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  cadastrarAnuncio(dados: FormData): Observable<any> {
    return this.http.post(this.API_URL, dados);
  }
  
}
