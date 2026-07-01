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
