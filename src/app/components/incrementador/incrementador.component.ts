import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  @Input('valor') progreso: any = 30;
  @Output() valorSalida: EventEmitter<number> = new EventEmitter()
  @Input() btnClass:any="btn btn-primary";
  constructor() { }
  /* getPorcentaje() {
     console.log(`${this.progreso}%`)
     return `${this.progreso}%`
   }*/
  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100)
       this.progreso = 100
    }

    if (this.progreso <= 0 && valor <= 0) {
      this.valorSalida.emit(0)
       this.progreso = 0
    }
    this.progreso = this.progreso + valor
    this.valorSalida.emit(this.progreso)
  }
  ngOnInit(): void {
  }

}
