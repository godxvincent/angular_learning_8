import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private authService: AuthService) { }

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
    this.authService.login(this.usuario).subscribe( respuestaFireBase => {
      console.log(respuestaFireBase);
    }, (err) => {
      console.log(err.error.error.message);
    });
 }

}
