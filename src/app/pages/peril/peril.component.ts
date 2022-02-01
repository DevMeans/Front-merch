import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-peril',
  templateUrl: './peril.component.html',
  styleUrls: ['./peril.component.css']
})
export class PerilComponent implements OnInit {
  public perfilForm: any
  public usuario: any;
  public imagenSubir: any;
  public imgTemp: any = null;
  constructor(private fb: FormBuilder,
    private UsuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {
    this.usuario = UsuarioService.usuario
  }


  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      correo: [this.usuario.correo, [Validators.required, Validators.email]]
    })
  }
  cambiarImagen(file: any) {
    this.imagenSubir = file.files[0]
    if (!file.files[0]) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file.files[0])
    reader.onloadend = (e) => {
      this.imgTemp = reader.result
    }
    return this.imgTemp
  }
  ActualizarPefil() {
    if (this.usuario.correo == this.perfilForm.value.correo) {
      delete this.perfilForm.value.correo
    }

    this.UsuarioService.actualizarPerfil(this.perfilForm.value).subscribe(
      resp => {
        const { nombre, correo } = this.perfilForm.value
        this.usuario.nombre = nombre
        this.usuario.correo = correo
        Swal.fire('Guardado', 'Cambios realizados con exito', 'success')
      }, (err) => {
        Swal.fire('!Ups', err.error.errors[0].msg, 'warning')
      }
    )
  }
  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid).then(
      img => {
        this.usuario.img = img
        Swal.fire('Guardado', 'Cambios realizados con exito', 'success')
      }
    ).catch(err => {
      console.log(err)
      Swal.fire('!Ups', 'Error al subir archivo', 'warning')
    })
  }

}
