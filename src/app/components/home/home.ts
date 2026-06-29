import { AnuncioService } from './../../service/anuncios.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cabecalho } from "../cabecalho/cabecalho";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Cabecalho],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{

listaDeAnuncios: any[] = [];

  constructor(
    private anuncioService: AnuncioService,
    private changeDetector: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.anuncioService.getAnuncios().subscribe({
      next: (dados: any) => {
        this.listaDeAnuncios = dados
        console.log('Dados capturados', this.listaDeAnuncios)
        this.changeDetector.detectChanges()
      },
      error: (erro) => {
        console.error('Erro ao conectar na API', erro);
      }
    })
  }
}
