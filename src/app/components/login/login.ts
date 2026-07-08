import { CommonModule } from '@angular/common';
import { AuthService } from './../../service/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  dadosLogin = {
    nameUsuario: '',
    senha: ''
  }

  constructor(
    private  auth: AuthService,
    private route: Router
  ) {}

    
  fazerLogin() {
    if (!this.dadosLogin.nameUsuario.trim() || !this.dadosLogin.senha.trim()) {
      alert('Preencha todos os campos')
      return;
    }
    this.auth.fazerLogin(this.dadosLogin).subscribe({
      next: (resposta) => {
        const usuarioLogado = localStorage.setItem('usuarioLogado', 'true');
        this.route.navigate(['/home'])
      },
      error: (err) => {
        console.error('Senha invalida ou usúario não encontrado', err)
        alert('Senha invalida ou usúario não encontrado')
      }
    })
  }

  navegarComoVisitante(): void {
    localStorage.clear()
    this.route.navigate(['/home'])
  }
}
