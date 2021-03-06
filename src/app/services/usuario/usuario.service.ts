import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  usuario: Usuario;
  token: string = localStorage.getItem('token');

  readonly URL = environment.url;
  
  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }
  

  
  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = ' ';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario 
    
    ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    
    this.router.navigate(['/login']);
  }


  login(usuario: Usuario, remember: boolean = false){

    if ( remember) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let loginUrl = this.URL + 'Login';
    return this.http.post(loginUrl, usuario)
                    .pipe(map((resp:any) => {
                      console.log(resp);
                      this.guardarStorage(resp.id, resp.token, resp.usuario);
                      return true;
    }));
  }

  crearUsuario(usuario:Usuario){
    let userUrl = this.URL + 'Usuario';
    return this.http.post(userUrl, usuario )
                    .pipe(map((resp:any) => {
                      swal('Usuario creado', usuario.email, 'success');
                      return resp.usuario;

    }));
  }

  actualizarUsuario(usuario: Usuario){
    let url = this.URL + 'Usuario/' + this.usuario._id + '?token=' + this.token;
    console.log(url);

    return this.http.put(url, usuario)
                    .pipe(map((resp:any) =>{
                      
                      if(usuario._id === this.usuario._id){
                        var usuarioDB: Usuario = resp.usuario;
                        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
                      }

                      swal('User Updated', usuarioDB.nombre, 'success');

                      return true;
                    }));
  }

  cambiarImagen(archivo: File, id: string){
    this._subirArchivoService.subirArchivo(archivo, 'Usuarios', id )
      .then(resp => {
        console.log(resp);
      })
      .catch( resp => {
        console.log(resp);
      });
  }

  cargarUsuarios(pag: number = 0){
    let url = environment.url + 'Usuario?pag=' + pag;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string){
    let url = environment.url + 'Busqueda/Coleccion/Usuarios/'+termino;
    console.log(url);
    return this.http.get(url).pipe(map((resp: any) => resp.usuarios )) ;
  }


  borrarUsuario(id: string){
    let url = environment.url + 'Usuario/' + id + '?token=' + this.token;

    return this.http.delete(url).pipe(map(resp => {
      swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
    }));
  } 
}
