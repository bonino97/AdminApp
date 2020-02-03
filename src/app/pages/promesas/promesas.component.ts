import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.intervaloSegundos()
          .then(() => console.log('Termino!'))
          .catch( error => console.error('Error en la promesa', error));
  }

  ngOnInit() {
  }

  intervaloSegundos(): Promise <boolean>{
    return new Promise((resolve, reject) => {
      
      let contador = 0;

      let intervalo = setInterval( () => {
        contador += 1;

        console.log(contador);

        if(contador === 3){
          resolve();
          clearInterval(intervalo);
        }

      }, 1000); //1000 = 1 segundo.
    });
  }

}
