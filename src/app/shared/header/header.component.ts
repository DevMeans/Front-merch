import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private usaurioService:UsuarioService,private router:Router) { }

  ngOnInit(): void {
    
  }
  logout(){
    
    this.usaurioService.logout()
    this.router.navigateByUrl('/login')
  }

}
