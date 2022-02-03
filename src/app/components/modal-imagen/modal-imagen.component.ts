import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {
  public usuario: any;
  public imagenSubir: any;
  public imgTemp: any = null;
  constructor(public modalImagenService: ModalImagenService, private fileUploadService: FileUploadService) {
    console.log(this.modalImagenService._ocultarModal
    )
  }

  ngOnInit(): void {


  }

  cerrarModal() {
    this.imgTemp = null
    this.modalImagenService.ocutalModal
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
  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, this.modalImagenService.coleccion, this.modalImagenService.usuario.uid).then(
      img => {
        this.usuario.img = img
        Swal.fire('Guardado', 'Cambios realizados con exito', 'success')
        //  this.modalImagenService.nuevaImagen.emit(img)
        this.modalImagenService.ocutalModal
      }
    ).catch(err => {
      //al parece que no detecta a tiempo el error 
      console.log(err)
      this.modalImagenService.ocutalModal
    })
  }


}
