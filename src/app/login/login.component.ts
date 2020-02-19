import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function initPlugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  remember: boolean = false;
  email: string;

  constructor(public router: Router,
              public _usuarioService: UsuarioService) { }

  ngOnInit() {
    initPlugins();

    this.email = localStorage.getItem('email') || '' ;
    if(this.email.length > 1) {
      this.remember = true;
    }
  }

  login(forma: NgForm) {
    if (forma.invalid) {
      return ;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    console.log(usuario);
    this._usuarioService.login(usuario, forma.value.remember)
                        .subscribe(resp => {
                          this.router.navigate(['/dashboard']);
                        });
  }
}
