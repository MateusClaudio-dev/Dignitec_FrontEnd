import { CommonModule } from '@angular/common';
import { AnuncioService } from './../../service/anuncios.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cabecalho } from '../cabecalho/cabecalho';

@Component({
  selector: 'app-painel',
  imports: [CommonModule, RouterLink, Cabecalho],
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
    this.cdr.detectChanges();
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
    console.log("ID recebido no clique:", id); // <-- ADICIONE ISSO
    console.log("Lista antes do filtro:", this.meusAnuncios);
    if (confirm('Tem certeza que deseja excluir anuncio?')) {
      this.anuncioService.deletarAnuncios(id).subscribe({
        next: (resposta: any) => {
          this.cdr.detectChanges();
          alert(resposta.message)
          this.meusAnuncios = this.meusAnuncios.filter(anuncio => {
            return anuncio.id !== id;
          })
          
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
