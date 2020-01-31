import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document,
              public _ajustes: SettingsService ) {}

  ngOnInit() {
    this.colocarCheck();
  }


  cambiarColor(tema: string, link: any) {

    this.aplicarCheck(link);
    this._ajustes.aplicarTema(tema);
  }

  aplicarCheck(link:any){
    let selectores: any = document.getElementsByClassName('selector');
    for(let ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }


  colocarCheck() {
    let tema = this._ajustes.ajustes.tema;
    let selectores: any = document.getElementsByClassName('selector');
    for(let ref of selectores){
      if(tema === ref.getAttribute('data-theme')){
        ref.classList.add('working');
        break;
      }
    }
  }

}
