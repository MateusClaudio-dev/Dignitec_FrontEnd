import { AnuncioService } from './../../service/anuncios.service';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-painel',
  imports: [],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel {

  constructor(private AnuncioService: AnuncioService){}
}
