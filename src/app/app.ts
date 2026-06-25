import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Cabecalho } from './components/cabecalho/cabecalho';
import { Home } from "./components/home/home";
import { Cadastro } from "./components/cadastro/cadastro";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-dignitec');
}
