import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loginForm } from '../interfaces/login-form.interface';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  loginService(formData: loginForm) {
    return this.http.post(`${base_url}/auth/login`, formData).pipe(
      tap((resp:any) =>{
        console.log(resp)
        localStorage.setItem('token',resp.token)
      })
    )
  }
}
