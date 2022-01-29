import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmited = false

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  public loginForm = this.fb.group({
    correo: [localStorage.getItem('correo') || '', [Validators.required]],
    password: ['', Validators.required],
    remember: [false, Validators.required]
  })
  ngOnInit(): void {
  }
  login() {
    this.authService.loginService(this.loginForm.value).subscribe((resp) => {
      console.log(resp)
      if (this.loginForm.get('remember')?.value) {
        localStorage.setItem('correo', this.loginForm.get('correo')?.value)
      } else {
        localStorage.removeItem('correo')
      }
      this.router.navigateByUrl('/')
    }, (err) => {
      console.log(err)
      Swal.fire({
        title: 'Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok!'
      })
    }

    )

  }

}
