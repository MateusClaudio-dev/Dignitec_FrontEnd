
import { Component, Input } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { Cabecalho } from "../cabecalho/cabecalho";
import { FormsModule } from '@angular/forms';
import { AnuncioService } from '../../service/anuncios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [Cabecalho, FormsModule, RouterLink],
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

  latitudeAnuncio: number | undefined;
  longitudeAnuncio: number | undefined;
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

  

  capturarLocalizacao(): void {
    if (navigator.geolocation) {
      this.dadosFormulario.localizacao = 'Obtendo cordenadas do GPS...';

      navigator.geolocation.getCurrentPosition(
        (posicao) => {
          this.latitudeAnuncio = posicao.coords.latitude;
          this.longitudeAnuncio = posicao.coords.longitude;

          this.dadosFormulario.localizacao = 'Localização capturada com sucesso!'
          console.log('Coordenadas salvas:', this.latitudeAnuncio, this.longitudeAnuncio);
        }, 
        (erro) => {
          console.error('Erro ao tentar obter localização', erro)
          this.dadosFormulario.localizacao = '';
          alert('Não conseguimos acessar seu GPS. Por favor, digite sua localização manualmente.')
        } 
      );
    } else {
        alert('Seu navegador não possui suporte para geolocalização. Por favor insira manualmente.')
      }
  }

  buscarCoordenadas(){
    this.capturarLocalizacao();
  }

  enviarDados(): void {
    const formData = new FormData();

    formData.append('nomeProjeto', this.dadosFormulario.nomeProjeto);
    formData.append('categoria', this.dadosFormulario.categoria);
    formData.append('descricao', this.dadosFormulario.descricao);
    // formData.append('localizacao', this.dadosFormulario.localizacao);
    formData.append('contato', this.dadosFormulario.contato);

    if (this.arquivoImagem) {
      formData.append('imagemCapa', this.arquivoImagem);
    }

    if (this.latitudeAnuncio && this.longitudeAnuncio) {
      formData.append('latitude', this.latitudeAnuncio.toString());
      formData.append('longitude', this.longitudeAnuncio.toString());
    }

  this.http.cadastrarAnuncio(formData).subscribe({
    next: (resposta) => {
      console.log('Anuncio cadastrado com sucesso', resposta);
      alert('Anuncio cadastrado com sucesso');
      this.router.navigate(['/painelAnunciante']);
    },
    error: (erro) => {
      console.error('erro ao salvar anúncio', erro);
      alert('Houve um erro ao cadastrar ação!')
    }
  })
  }
}
