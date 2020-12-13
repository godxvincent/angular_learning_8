import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
   }

   onSubmit( formulario: NgForm ): void {
      if ( formulario.invalid ) {
        return;
      }
      console.log('formulario enviado');
      console.log(this.usuario);
      console.log(formulario);
      this.authService.nuevoUsuario(this.usuario).subscribe( respuestaFireBase => {
        console.log(respuestaFireBase);
      }, (err) => {
        console.log(err.error.error.message);
      });
   }

}
