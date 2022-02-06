import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { cargarCategorias } from '../interfaces/cargar-categorias.interface';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }
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
  mostrarCategorias(desde: number = 0, limite = 5) {
    const url = `${base_url}/categoria/${desde}/${limite}`
    return this.http.get<cargarCategorias>(url, this.headers)
  }
  actualizarCategoria(uid: string, nombre: string) {
    const url = `${base_url}/categoria/${uid}`
    return this.http.put(url, { nombre }, this.headers)
  }
  cambiarEstado(uid: string, estado: boolean) {
    const url = `${base_url}/categoria/estado/${uid}`
    return this.http.put(url, { estado }, this.headers)
  }
  eliminarCategoria(uid: string) {
    const url = `${base_url}/categoria/${uid}`
    return this.http.delete(url, this.headers)
  }
  crearCategoria(nombre: any) {
    const url = `${base_url}/categoria`
    return this.http.post(url, { nombre: nombre }, this.headers)
  }
}
