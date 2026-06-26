
import { Component, Input } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { Cabecalho } from "../cabecalho/cabecalho";
import { FormsModule } from '@angular/forms';
import { AnuncioService } from '../../service/anuncios.service';

@Component({
  selector: 'app-cadastro',
  imports: [Cabecalho, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  
  dadosFormulario = {
    nomeProjeto: '',
    categoria: '',
    descricao: '',
    localizacao: '',
    contato: ''
  };

  arquivoImagem: File | null = null;

  constructor(
    private http: AnuncioService,
    private router: Router
  ) {}

  aoSelecionarImagem(event: any): void {
    const elemento = event.target as HTMLInputElement
    if (elemento && elemento.files && elemento.files.length > 0) {
      this.arquivoImagem = elemento.files[0];
    }
  }

  enviarDados(): void {
    const formData = new FormData();

    formData.append('nomeProjeto', this.dadosFormulario.nomeProjeto);
    formData.append('categoria', this.dadosFormulario.categoria);
    formData.append('descricao', this.dadosFormulario.descricao);
    formData.append('localizacao', this.dadosFormulario.localizacao);
    formData.append('contato', this.dadosFormulario.contato);

    if (this.arquivoImagem) {
      formData.append('imagemCapa', this.arquivoImagem);
    }

  this.http.cadastrarAnuncio(formData).subscribe({
    next: (resposta) => {
      console.log('Anuncio cadastrado com sucesso', resposta);
      alert('Anuncio cadastrado com sucesso');
      this.router.navigate(['/home']);
    },
    error: (erro) => {
      console.error('erro ao salvar anúncio', erro);
      alert('Houve um erro ao cadastrar ação!')
    }
  })
  }
}
