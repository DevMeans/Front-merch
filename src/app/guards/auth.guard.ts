import { computeMsgId } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService:UsuarioService,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
     
    console.log('paso por el canActive')
  //  console.log(this.usuarioService.validarToken().subscribe( resp=>console.log(resp)))
  
    return this.usuarioService.validarToken().pipe(
      tap(estaAuth=>{
        if(!estaAuth){
          this.router.navigateByUrl('/login')
        }
      })
    )
  }

}
