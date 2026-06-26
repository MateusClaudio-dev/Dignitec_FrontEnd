import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeService } from '../../service/anuncios.service';
import { Cabecalho } from "../cabecalho/cabecalho";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Cabecalho],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{

listaDeAnuncios: any[] = [
    {
      id: 1,
      nomeProjeto: 'Sistema Dignitec Alpha',
      categoria: 'Websites',
      descricao: 'Protótipo de teste local para validar a renderização do grid do Angular.',
      localizacao: 'Salvador - BA',
      contato: '(71) 99999-9999',
      imagemCapa: 'mock-foto1.jpg' // imagem temporária
    },
    {
      id: 2,
      nomeProjeto: 'E-commerce Automação',
      categoria: 'Sistemas Internos',
      descricao: 'Segunda linha de teste para garantir que o @for está duplicando os cards corretamente.',
      localizacao: 'São Paulo - SP',
      contato: '(11) 98888-8888',
      imagemCapa: 'mock-foto2.jpg'
    }
  ];

  constructor(
    private homeService: HomeService,
    private changeDetector: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.homeService.getAnuncios().subscribe({
      next: (dados) => {
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
