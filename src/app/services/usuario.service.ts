import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { registerForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario = new Usuario('', '', '', '', '', false);
  constructor(private http: HttpClient) {

  }
  get uid(): string {
    return this.usuario.uid
  }
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
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
        const { uid, correo, nombre, img = '', rol, estado } = resp.usuario
        this.usuario = new Usuario(uid, correo, nombre, img, rol, estado)
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
  mostrarUsuarios(desde: number = 0, limite = 5) {
    const url = `${base_url}/usuario/${desde}/${limite}`
    return this.http.get<CargarUsuario>(url, this.headers)
  }
  eliminarUsuario(uid: string) {
    const url = `${base_url}/usuario/${uid}`
    return this.http.delete(url, this.headers)
  }
  cambiarEstado(uid: string, estado: boolean) {
    const url = `${base_url}/usuario/estado/${uid}`
    return this.http.put(url, { estado: estado }, this.headers)
  }
  cambiarRol(uid: string, rol: 'ADMIN_ROL' | 'INVITADO_ROL' | 'VENTAS_ROL') {
    const url = `${base_url}/usuario/rol/${uid}`
    return this.http.put(url, { rol: rol }, this.headers)
  }
}
