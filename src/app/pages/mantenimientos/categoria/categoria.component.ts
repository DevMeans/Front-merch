import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  public cargando: boolean = true
  public categorias: Categoria[] = []
  public total: number = 0
  public desde: number = 0
  constructor(private modalImagenServices: ModalImagenService, private categoriaService: CategoriaService) {
    this.cargarCategorias()
  }

  ngOnInit(): void {
  }
  cargarCategorias() {
    this.categoriaService.mostrarCategorias(this.desde).subscribe(
      resp => {
        this.categorias = resp.results
        this.total = resp.total
        this.cargando = false
      }
    )
  }
  buscar(termino: string) {
    console.log(termino)
  }
  cambiarPagina(valor: number) {
    this.desde += valor
    if (this.desde < 0) {
      this.desde = 0
      return;
    } else if (this.desde > this.total) {
      this.desde -= valor
      return
    }
    this.cargarCategorias()
  }
  editarCategoria(categoria: any,) {
    this.categoriaService.actualizarCategoria(categoria.uid, categoria.nombre).subscribe(
      resp => {
        console.log(resp)
      }
    )
  }
  editarEstadoCategoria(categoria: any) {
    this.categoriaService.cambiarEstado(categoria.uid, categoria.estado).subscribe(
      resp => {
        console.log(resp)
      }
    )
  }
  eliminarCategoria(categoria: any) {

    return Swal.fire({
      title: `deseas eliminar a ${categoria.nombre}`,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(categoria.uid).subscribe(
          resp => {
            console.log(resp)
          }, err => {
            Swal.fire('Usuario No existe', 'Usuario no existe', 'warning')
          }
        )
        Swal.fire('Eliminado', 'Proceso ejecutado correctamente', 'success')
        this.cargarCategorias()
      }
    })
  }
  async crearCategoria() {
    const { value = '' } = await Swal.fire<string>(
      {
        title: 'Crear hospítal',
        text: 'Ingrese nuevo Hospítal',
        input: 'text',
        inputPlaceholder: 'Nombre del hospital',
        showCancelButton: true

      }
    )
    if (value.trim().length > 0) {
      this.categoriaService.crearCategoria(value).subscribe(
        (resp: any) => {
          console.log(resp)
          this.categorias.push(resp.results)
        }
      )
    }

  }
  abrirModal(categoria:any){
    this.modalImagenServices.abrirModal(categoria,'categorias')
  }
}