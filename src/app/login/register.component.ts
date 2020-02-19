import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import swal from 'sweetalert';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';




declare function initPlugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.scss']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  
  constructor(public _usuarioService: UsuarioService,
              public router: Router) {}

  ngOnInit() {
    initPlugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
      rptPassword: new FormControl(null, Validators.required),

    }, {validators: this.sonIguales('password', 'rptPassword')});

    this.forma.setValue({
      nombre: 'Test',
      email: 'test@test.com',
      password: '1234',
      rptPassword: '1234'
    })
  }

  registrarUsuario() {
    console.log(this.forma.value);
    console.log(this.forma.valid);

    if(this.forma.invalid){
      return ;
    } 

    if (!this.forma.value.email) {
      swal({
        title: "Error",
        text: "Email must be complete!",
        icon: "warning"
      });
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );
    
    this._usuarioService.crearUsuario(usuario)
        .subscribe( resp => this.router.navigate(['/login']));
  }

  sonIguales(campo1: string, campo2: string){
    return(group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }
      return{
        sonIguales: true
      };
    };
  }

}
