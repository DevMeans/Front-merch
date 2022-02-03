import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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
  buscar(tipo: 'usuarios' | 'categorias' | 'productos', termino: string = '') {
    const url = `${base_url}/busqueda/${tipo}/${termino}`
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => resp.results)
    )
  }
}
