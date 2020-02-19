import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor( ) { }

  subirArchivo(archivo: File, tipo: string, id: string){


    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen Subida!');
            resolve( xhr.response );
          } else {
            console.log('Sale por el Else de Subir-Archivo.Service.ts');
            console.log(xhr.response)
            reject(xhr.response) ;
          }
        }
      };

      let url = environment.url + 'Upload/' + tipo + '/' + id;
      
      xhr.open('PUT', url, true);

      xhr.send(formData);

    });
  }
}
