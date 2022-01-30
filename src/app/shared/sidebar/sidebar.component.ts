import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor( private usuarioService:UsuarioService,private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.usuarioService.logout()
    this.router.navigateByUrl('/login')
  }
}
