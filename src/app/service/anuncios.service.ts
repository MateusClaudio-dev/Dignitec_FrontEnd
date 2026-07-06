import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnuncioService {

  private API_URL = 'http://localhost:3001/anuncios';

  constructor(private http: HttpClient) {
    // console.log(this.API_URL)
  }

  //Requisição de anúncios por proximidade
  // listarAnunciosProximos(lat?: number, lng?: number): Observable<any[]> {
  //   let params = new HttpParams();

  //   if (lat && lng) {
  //     params = params.set('lat', lat.toString());
  //     params = params.set('lng', lng.toString());
  //   }
  //   return this.http.get<any[]>(this.API_URL, {params})
  // }

  // Rota (sem proximidade)
  getAnuncios(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  cadastrarAnuncio(dados: FormData): Observable<any> {
    return this.http.post(this.API_URL, dados);
  }

  editarAnuncios(id: number, dados: FormData): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, dados);
  }

  deletarAnuncios(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  registarClique(id: number): Observable<any> {
    return this.http.post(`${this.API_URL}/${id}/clique`, {});
  }
  
}
