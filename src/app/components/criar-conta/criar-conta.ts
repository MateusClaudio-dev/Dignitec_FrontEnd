import { Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-criar-conta',
   standalone: true,
  imports: [ FormsModule],
  templateUrl: './criar-conta.html',
  styleUrl: './criar-conta.css',
})
export class CriarConta implements OnInit {
  termosAceitos: boolean = false 
  usuarios: any[] | null = null 

    constructor(
      private auth: AuthService,
      private router: Router
    ) {}

    ngOnInit(): void {

    }

  dadosCadastro = {
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipoConta: ''
  }

  enviarDados():void {
    if (!this.dadosCadastro.nome.trim() || 
        !this.dadosCadastro.email.trim()  || 
        !this.dadosCadastro.senha.trim() || 
        !this.dadosCadastro.confirmarSenha.trim() || 
        !this.dadosCadastro.tipoConta ) {
          alert('Preencha todos os campos')
          return;
        }

    if (!this.termosAceitos) {
      alert('Dependemos dos termos de privacidade')
      return;
    }

        if (this.dadosCadastro.senha !== this.dadosCadastro.confirmarSenha) {
          alert('As senhas não coincidem')
          return;
        }

    this.auth.criarConta(this.dadosCadastro).subscribe({
      next: (res) => {
        console.log('Conta criada com sucesso', res);
        alert('Conta criada com sucesso')
        this.router.navigate(['/login'])
      },
      error: (err) => console.error('Erro ao criar conta', err)
    });
  }
  
}
