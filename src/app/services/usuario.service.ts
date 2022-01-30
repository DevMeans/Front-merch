import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { registerForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private http: HttpClient) {

  }
  logout(){
    localStorage.removeItem('token')
  }
  validarToken() {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/auth/login/renovarToken`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      }),
      map(resp => true),
      catchError(err => of(false))
    )

  }

  tokenValidacion() {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/auth/login/renovarToken`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }
  crearUsuario(formData: registerForm) {
    return this.http.post(`${base_url}/usuario`, formData).pipe(
      tap((resp: any) => {
        console.log(resp)
        localStorage.setItem('token', resp.token)
      })
    )
  }
}
