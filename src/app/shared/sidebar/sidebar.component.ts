import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  //public imgUrl = '';
  public usuario: Usuario = new Usuario('', '', '', '', '',false)
  constructor(private usuarioService: UsuarioService, private router: Router) {
    //this.imgUrl = this.usuarioService.usuario.imagenUrl;
    this.usuario = usuarioService.usuario
  }

  ngOnInit(): void {
  }
  logout() {
    this.usuarioService.logout()
    this.router.navigateByUrl('/login')
  }
}
