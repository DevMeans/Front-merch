import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 // public imgUrl = '';
  public usuario: Usuario = new Usuario('', '', '', '', '',false)
  constructor(private usuarioService: UsuarioService, private router: Router) {
    //this.imgUrl=this.usuarioService.usuario.imagenUrl;
    this.usuario = usuarioService.usuario
  }

  ngOnInit(): void {

  }
  logout() {

    this.usuarioService.logout()
    this.router.navigateByUrl('/login')

  }

}
