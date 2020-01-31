import { Injectable, Inject } from '@angular/core';
import { DOCUMENT, HashLocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes(){
    localStorage.setItem('Ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes(){
    if(localStorage.getItem('Ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('Ajustes'));
      console.log('Cargando del localStorage');
      this.aplicarTema(this.ajustes.tema);
    } else {
      console.log('Usando valores por defecto');
    }
  }

  aplicarTema(tema: string){
    const URL = `assets/css/colors/${tema}.css`;
    this._document.getElementById('theme').setAttribute('href', URL);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = URL;
    this.guardarAjustes();
  }
}


interface Ajustes {
  temaUrl: string;
  tema: string;
}