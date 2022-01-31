import { environment } from "src/environments/environment"

const base_url = environment.base_url
export class Usuario{
    constructor(
        public uid:string,
        public correo:string,
        public nombre:string,
        public img:string,
        public rol:string,
        

    ){}
    get imagenUrl(){
        if(this.img){
            return `${this.img}`
        }else{
            return ''//falta hacer
        }
    }
}