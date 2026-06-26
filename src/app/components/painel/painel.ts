import { CommonModule } from '@angular/common';
import { AnuncioService } from './../../service/anuncios.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-painel',
  imports: [CommonModule, RouterLink],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel implements OnInit {

  meusAnuncios: any[] = [];

  constructor(private anuncioService: AnuncioService){}

  ngOnInit(): void {
    this.carregarAnuncio();
  }

  carregarAnuncio() {};

  excluirAnuncio(id: number): void {
    if (confirm('Tem certeza que deseja excluir anuncio?')) {
      this.anuncioService.deletarAnuncios(id).subscribe({
        next: (resposta: any) => {
          alert(resposta.message)
        },
        error: (erro) => {
          console.error('Erro ao tentar excluir anúncio', erro)
          alert('Erro ao tentar excluir anúncio')
        }
      })
    }
  }

  abrirEdicaoAnuncio(){}
}
