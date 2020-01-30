import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  
  @ViewChild('inputPorcentaje', {static:true}) inputPorcentaje: ElementRef;
  
  @Input() leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;

  @Output() modificaValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log('Leyenda', this.leyenda);
    console.log('Porcentaje', this.porcentaje);
  }

  ngOnInit() {
    console.log('Leyenda', this.leyenda);
  }

  onChanges(newValue: number){
    //let elemHTML: any = document.getElementsByName('porcentaje')[0];

    if (newValue >= 100) {
      this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }

    //elemHTML.value = Number(this.porcentaje);

    this.inputPorcentaje.nativeElement.value = this.porcentaje;
    
    this.modificaValor.emit(this.porcentaje);
  }

  modificarValor(param: number) {

    if (this.porcentaje >= 100 && param > 0) {
      this.porcentaje = 100;
      return;
    }

    if (this.porcentaje <= 0 && param < 0) {
      this.porcentaje = 0;
      return;
    }

    this.porcentaje = this.porcentaje + param;

    this.modificaValor.emit( this.porcentaje );
  }

}
