import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const logado = localStorage.getItem('usuarioLogado');
    if (logado === 'true') {
        return true
    } else {
        alert('Para ter acesso esteja logado como anunciante')
        router.navigate(['/login'])
        return false
    }
};
