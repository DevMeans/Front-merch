import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { registerForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {

  }
  crearUsuario(formData: registerForm) {
   return this.http.post(`${base_url}/usuario`, formData).pipe(
    tap((resp:any) =>{
      console.log(resp)
      localStorage.setItem('token',resp.token)
    })
  )
  }
}
