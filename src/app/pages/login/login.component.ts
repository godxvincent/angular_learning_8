import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor() { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
  }

  login( formulario: NgForm ): void {
    if ( formulario.invalid ) {
      return;
    }
    console.log('formulario enviado');
    console.log(this.usuario);
    console.log(formulario);
 }

}
