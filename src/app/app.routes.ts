import { Cadastro } from './components/cadastro/cadastro';
import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';

export const routes: Routes = [
    {path: '', component: Home},
    {path: "login", component: Login},
    {path: "home", component: Home},
    {path: "cadastrar", component: Cadastro}
];
