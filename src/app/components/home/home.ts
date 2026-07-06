import { AnuncioService } from './../../service/anuncios.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cabecalho } from "../cabecalho/cabecalho";
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Cabecalho, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{

  imagensHero: string[] = [
    '/IMAGES/1.svg',
    '/IMAGES/2.svg',
    '/IMAGES/3.svg'
  ]
  indiceAtivo: number = 0
  listaDeAnuncios: any[] = [];

  constructor(
    private anuncioService: AnuncioService,
    private changeDetector: ChangeDetectorRef ) {}


  ngOnInit(): void {
    //Metodo de listagem  (sem proximidade)
    this.anuncioService.getAnuncios().subscribe({
      next: (dados: any) => {
        this.listaDeAnuncios = dados
        //console.log('Dados capturados', this.listaDeAnuncios)
        this.changeDetector.detectChanges()
      },
      error: (erro) => {
        console.error('Erro ao conectar na API', erro);
      }
    })

    //this.obterLocalizacaoUser();
  }

  // Lógica carrossel de imagens 
  imagemAnterior() {
    if (this.indiceAtivo === 0) {
      this.indiceAtivo = this.imagensHero.length - 1
    } else {
      this.indiceAtivo--
    }
  }

  proximaImagem() {
    if (this.indiceAtivo === this.imagensHero.length -1) {
      this.indiceAtivo = 0
    } else {
      this.indiceAtivo++
    }
  }


  // obterLocalizacaoUser() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (posicao) => {
  //         const lat = posicao.coords.latitude;
  //         const lng = posicao.coords.longitude;
  //         this.anuncioService.listarAnunciosProximos(lat, lng);
  //       },
  //       (err) => {
  //         console.error('Permissão de localização negada');
  //         this.anuncioService.listarAnunciosProximos()
  //       }
  //     )
  //   } else {
  //     this.anuncioService.listarAnunciosProximos()
  //   }
  // }

  entrarEmContato(idAnuncio: any) {
    this.anuncioService.registarClique(idAnuncio).subscribe({
      next: (result) => {
        console.log('Clique computado no BD');
      },
      error: (err) => {
        console.error('Erro ao computar clique NO BD', err);
      }
    });
  }

}
