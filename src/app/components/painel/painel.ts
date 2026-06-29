import { CommonModule } from '@angular/common';
import { AnuncioService } from './../../service/anuncios.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-painel',
  imports: [CommonModule, RouterLink],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel implements OnInit {

  meusAnuncios: any[] = [];

  constructor(
    private anuncioService: AnuncioService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.carregarAnuncio();
  }

  carregarAnuncio() {
    this.anuncioService.getAnuncios().subscribe({
      next: (dados) => {
        console.log('Dados do back', dados);
        this.meusAnuncios = [...dados]
        this.cdr.detectChanges();
      },
      error: (erro: any) => console.error('Erro ao buscar anúncios', erro)
    });
  }

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
