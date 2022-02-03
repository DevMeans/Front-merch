import { environment } from "src/environments/environment"

const base_url = environment.base_url
export class Usuario {
    constructor(
        public uid: string,
        public correo: string,
        public nombre: string,
        public img: string,
        public rol: string,
        public estado:boolean


    ) { }

    get imagenUrl() {
        if (this.img) {
            return `${this.img}`
        } else {
            return 'https://i.pinimg.com/736x/aa/fe/29/aafe29d6ee2db8a362bb6c9fd6aa6d01.jpg'//falta hacer
        }
    }
}