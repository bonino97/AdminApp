import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'Usuarios'): any {
    
    let url = environment.url + 'Img/';
    
    console.log(url);
    console.log(img);
    console.log(tipo);
    if (!img) {
      return url + `${tipo}/404`;
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch (tipo) {
      
      case 'Usuarios' :
        url += 'Usuarios/' + img;
        break;
      case 'Medicos' :
        url += 'Medicos/' + img;
        break;
      case 'Hospitales' :
        url += 'Hospitales/' + img;
        break;
      default:
        console.log('Usuario, medicos u hospitales inexistente');
        url += 'Usuarios/404';
        break;
    }

    return url;
  }
}
