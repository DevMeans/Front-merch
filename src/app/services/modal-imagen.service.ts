import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  public _ocultarModal: string = 'none'
  public img = ''
  public usuario: any
  public coleccion: 'usuarios' | 'productos' | 'categorias' = 'usuarios'
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>()
  constructor() { }
  get ocutalModal() {
    return this._ocultarModal = 'none'
  }
  abrirModal(usuario: any, tipo: 'usuarios' | 'productos' | 'categorias') {
    console.log(tipo)
    this._ocultarModal = 'block'
    this.img = usuario.img
    this.usuario = usuario
    this.coleccion = tipo
  }
}
