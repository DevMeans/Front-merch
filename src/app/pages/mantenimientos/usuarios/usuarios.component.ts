import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios: number = 0
  public usuarios: Usuario[] = []
  public usuariosTemp: Usuario[] = []
  public desde: number = 0;
  public cargando: boolean = true;
  constructor(private usuarioService: UsuarioService,
    private busquedaServices: BusquedasService,
    private modalImagenServices: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarUsuarios()
    this.modalImagenServices.nuevaImagen.subscribe(img=>this.cargarUsuarios)
  }
  cargarUsuarios() {
    this.cargando = true

    this.usuarioService.mostrarUsuarios(this.desde).subscribe(

      ({ total, results }) => {

        this.totalUsuarios = total
        this.usuarios = results
        this.usuariosTemp = results
        this.cargando = false
      }
    )
  }
  cambiarPagina(valor: number) {
    this.desde += valor
    if (this.desde < 0) {
      this.desde = 0
      return;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor
      return;
    }
    this.cargarUsuarios()
  }
  buscar(termino: string) {
    console.log(termino)
    if (termino.length === 0) {
      this.usuarios = this.usuariosTemp
      return;
    }
    this.busquedaServices.buscar('usuarios', termino).subscribe(
      resp => {
        this.usuarios = resp
      }
    )
  }
  eliminarUsuario(usuario: any) {

    if (usuario.uid == this.usuarioService.uid) {
      return Swal.fire('error', 'No puedes borrate a ti mismo', 'error')
    }

    return Swal.fire({
      title: `deseas eliminar a ${usuario.nombre}`,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario.uid).subscribe(
          resp => {
            console.log(resp)
          }, err => {
            Swal.fire('Usuario No existe', 'Usuario no existe', 'warning')
          }
        )
        Swal.fire('Eliminado', 'Proceso ejecutado correctamente', 'success')
        this.cargarUsuarios()
      }
    })
  }
  cambiarEstado(usuario: any) {
    console.log(usuario)
    this.usuarioService.cambiarEstado(usuario.uid, usuario.estado).subscribe(resp => {
      console.log(resp)
    })
  }
  cambiarRol(usuario: any) {
    this.usuarioService.cambiarRol(usuario.uid, usuario.rol).subscribe(resp => {
      console.log(resp)
    })
  }
  abrirModal(usuario: any,) {
    console.log(usuario)
    this.modalImagenServices.abrirModal(usuario,'usuarios')
  }
}
