import { Cadastro } from './components/cadastro/cadastro';
import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Painel } from './components/painel/painel';
import { EditarAnuncio } from './components/editar-anuncio/editar-anuncio';

export const routes: Routes = [
    {path: '', component: Home},
    {path: "login", component: Login},
    {path: "home", component: Home},
    {path: "cadastrar", component: Cadastro},
    {path: "editar/:id", component: EditarAnuncio},
    {path: "painelAnunciante", component: Painel}
];
