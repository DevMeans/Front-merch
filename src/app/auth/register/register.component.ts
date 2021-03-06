import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder,private usuarioServices:UsuarioService) { }
  public formSubmited = false
  public registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required]
  },{
    Validators:this.passwordNoSonInguales('password','password2')
  })
  ngOnInit(): void {
  }
  crearUsuario() {
    this.formSubmited = true
    console.log(this.registerForm.value)
    if(this.registerForm.invalid){
      return;
    }
    this.usuarioServices.crearUsuario(this.registerForm.value).subscribe(resp=>{
      console.log('UsuarioCreado')
      console.log(resp)
    },(err)=>{
      Swal.fire({
        title: 'Error!',
        text:  err.error.errors[0].msg,
        icon: 'error',
        confirmButtonText: 'Ok!'
      })
     
    } )
  }
  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmited) {
      return true
    } else { return false }
  }
  aceptarTerminos(){
   return !this.registerForm.get('terminos')?.value && this.formSubmited
  }
  pwdNoValidas(){
    const pass1 =this.registerForm.get('password')?.value
    const pass2=this.registerForm.get('password2')?.value
    if(pass1!==pass2 && this.formSubmited){
      return true
    }else{
      return false
    }
  }
  passwordNoSonInguales(pass1:string,pass2:string){
    return (FormGroup:FormGroup)=>{
      const pass1Control=FormGroup.get(pass1)
      const pass2Control=FormGroup.get(pass2)
      if(pass1Control?.value==pass2Control){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({noEsIgual:true})
      }
    }
  }
 
}
