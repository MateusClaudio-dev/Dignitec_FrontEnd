import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-criar-conta',
   standalone: true,
  imports: [ FormsModule],
  templateUrl: './criar-conta.html',
  styleUrl: './criar-conta.css',
})
export class CriarConta implements OnInit {
  enviarDados() {}

    ngOnInit(): void {
      
    }

  dadosCadastro = {
    nome: " ",
    email: " ",
    senha: " ",
    confirmarSenha: " ",
    tipo: " ",
  }
}
