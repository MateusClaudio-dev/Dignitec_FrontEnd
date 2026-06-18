import { Cadastro } from './components/cadastro/cadastro';
import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';

export const routes: Routes = [
    {path: "Login", component: Login},
    {path: "Home", component: Home},
    {path: "Cadastrar", component: Cadastro}
];
