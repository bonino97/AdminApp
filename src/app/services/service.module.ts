import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedService, SidebarService, SettingsService, UsuarioService, LoginGuard } from './service.index';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SharedService,
    SidebarService,
    SettingsService,
    UsuarioService,
    SubirArchivoService,
    LoginGuard
  ]
})
export class ServiceModule { }
