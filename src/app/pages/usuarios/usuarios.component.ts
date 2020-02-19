import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  usuario: Usuario;

  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;



  constructor(public _usuarioService: UsuarioService) {  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
    .subscribe((resp : any) => {
      console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }


  cambiarDesde(valor: number) {
    
    console.log(this.desde);
    
    if (this.desde >= this.totalRegistros) {
      return ;
    }

    if (this.desde < 0) {
      return ;
    }

    if ( this.desde >= 0 || this.desde <= this.totalRegistros) {
      this.desde += valor;
      this.cargarUsuarios();
    }
  }

  buscarUsuarios(termino: string){
    console.log(termino);
    this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: any) => {

        console.log(usuarios);

      });
  }


  borrarUsuario( usuario: Usuario ){
    if(usuario._id === this._usuarioService.usuario._id){
      swal('No se puede borrar usuario.', 'No se puede eliminar a usted mismo', 'error' );
      return;
    }
    
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a '+ usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then( borrar => {
        console.log(borrar);

        if(borrar) {
          this._usuarioService.borrarUsuario( usuario._id ).subscribe(borrado => {
            console.log(borrado);
            this.cargarUsuarios();
          })
        }

      })
  }

  guardarUsuario(usuario: Usuario){
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

}
