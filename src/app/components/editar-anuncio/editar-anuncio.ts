import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnuncioService } from '../../service/anuncios.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cabecalho } from '../cabecalho/cabecalho';

@Component({
  selector: 'app-editar-anuncio',
  imports: [CommonModule, FormsModule, Cabecalho, RouterLink],
  templateUrl: './editar-anuncio.html',
  styleUrl: './editar-anuncio.css',
})
export class EditarAnuncio implements OnInit {

  idAnuncio: number = 0;
  fotoSelecionada: File | null = null

  constructor(
    private anuncioService: AnuncioService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    const idNumber = Number(id)
    this.idAnuncio = idNumber

    this.anuncioService.getAnuncios().subscribe({
      next: (anuncios: any[]) => {
        const anuncio_a_encontar = anuncios.find(anuncios => anuncios.id === this.idAnuncio)

        if (anuncio_a_encontar) {
          this.anuncio = anuncio_a_encontar
          this.cdr.detectChanges();
        }
      }, 
      error: (err) => console.error('Erro ao buscar anúncios', err)
    });
  }

  // objeto vazio mais é preenchido pelo dados do BD por meio do ngModel no html dinamicamente
  anuncio: any = {
    nomeProjeto: '',
    categoria: '',
    descricao: '',
    localizacao: '',
    contato: ''
  };

  // Pega o arquivo que o usuário escolheu
  aoSelecionarImagem(event: any): void {
      const arquivo = event.target.files[0]; 
      if (arquivo) {
        this.fotoSelecionada = arquivo; // Salva o arquivo na memória para o FormData usar depois
      }
    }
  

  salvarAlteracoes(): void {
    const formData = new FormData
    formData.append('nomeProjeto', this.anuncio.nomeProjeto)
    formData.append('categoria', this.anuncio.categoria)
    formData.append('descricao', this.anuncio.descricao)
    formData.append('localizacao', this.anuncio.localizacao)
    formData.append('contato', this.anuncio.contato)

    if (this.fotoSelecionada) {
      formData.append('imagemCapa', this.fotoSelecionada)
    }

    this.anuncioService.editarAnuncios(this.idAnuncio, formData).subscribe({
      next: (resposta) => {
        alert('Anúncio atualizado com sucesso!')
        this.router.navigate(['/painelAnunciante']);
      },
      error: (err) => {
        console.error('Erro ao tentar atualizar:', err)
        alert('Erro ao tentar salvar alterações.')
      }
    })
  }
}
