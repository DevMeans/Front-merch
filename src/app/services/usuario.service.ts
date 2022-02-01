import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { registerForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario = new Usuario('', '', '', '', '');
  constructor(private http: HttpClient) {

  }
  get uid(): string {
    return this.usuario.uid
  }
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  logout() {
    localStorage.removeItem('token')
  }
  validarToken() {

    return this.http.get(`${base_url}/auth/login/renovarToken`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { uid, correo, nombre, img = '', rol } = resp.usuario
        this.usuario = new Usuario(uid, correo, nombre, img, rol)
        localStorage.setItem('token', resp.token)
        return true
      }),
      catchError(err => of(false))
    )

  }
  actualizarPerfil(data: { email: string, nombre: string, rol: string }) {
    data = {
      ...data,
      rol: this.usuario.rol
    }

    return this.http.put(`${base_url}/usuario/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    })
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
