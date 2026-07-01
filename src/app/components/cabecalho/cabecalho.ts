import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
})
export class Cabecalho {

  constructor(private router: Router) {}
  executarLogout(): void {
    localStorage.clear();
    this.router.navigate(["/login"]) 
  }
}
