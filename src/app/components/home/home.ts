import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{

  listaDeAnuncios: any[] = [];
  constructor(private homeService: HomeService ) {}

  ngOnInit(): void {
    this.homeService.getAnuncios().subscribe({
      next: (dados) => {
        this.listaDeAnuncios = dados
        console.log('Dados capturados', this.listaDeAnuncios)
      },
      error: (erro) => {
        console.error('Erro ao conectar na API', erro);
      }
    })
  }
}
