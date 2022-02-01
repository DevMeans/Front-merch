import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }
  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'categorias' | 'productos',
    id: string

  ) {
    try {
      const url = `${base_url}/subirimagen/${tipo}/${id}`
      const formdData = new FormData();
      formdData.append('img', archivo);
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formdData
      })
      const data = await resp.json()
      //  return 'Data'
      if (data.ok) {
        return data.results.img
      } else {
        console.log(data.msg)
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
