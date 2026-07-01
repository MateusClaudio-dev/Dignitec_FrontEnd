import { Cadastro } from './components/cadastro/cadastro';
import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Painel } from './components/painel/painel';
import { EditarAnuncio } from './components/editar-anuncio/editar-anuncio';
import { CriarConta } from './components/criar-conta/criar-conta';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
    {path: '', component: Home},
    {path: "criarConta", component: CriarConta},
    {path: "login", component: Login},
    {path: "home", component: Home},
    {path: "cadastrar", component: Cadastro, canActivate: [authGuard] },
    {path: "editar/:id", component: EditarAnuncio, canActivate: [authGuard] },
    {path: "painelAnunciante", component: Painel, canActivate: [authGuard] }
];
