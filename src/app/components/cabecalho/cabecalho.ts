import { AuthService } from './../../service/auth.service';
import { CriarConta } from './../criar-conta/criar-conta';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";


@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
})
export class Cabecalho implements OnInit {

  menuAberto: boolean = false
  IsAnunciante: boolean = false



  constructor(
    private router: Router,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    const tipo = localStorage.getItem('tipoConta');
    if (tipo === 'anunciante') {
      this.IsAnunciante = true
    } 
  }
  
  openMenu(): void { this.menuAberto = true };
  outMenu(): void { this.menuAberto = false };
  closeMenu(): void { this.menuAberto = false };

  executarLogout(): void {
    localStorage.clear();
    this.router.navigate(["/login"]) 
  }
}
