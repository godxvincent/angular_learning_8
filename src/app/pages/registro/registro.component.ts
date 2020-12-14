import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarUsuario = false;

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
   }

   onSubmit( formulario: NgForm ): void {
      if ( formulario.invalid ) {
        return;
      }
      Swal.fire({
        // title: 'Error!',
        allowOutsideClick: false,
        text: 'Espere por favor....',
        icon: 'info'
        // type: 'info'
        // icon: 'error',
        // confirmButtonText: 'Cool',
      });
      Swal.showLoading();

      if ( this.recordarUsuario ) {
        localStorage.setItem('email', this.usuario.email );
      }

      this.authService.nuevoUsuario(this.usuario).subscribe( respuestaFireBase => {
        console.log(respuestaFireBase);
        Swal.close();
        this.router.navigateByUrl('/home');
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          // title: 'Error!',
          allowOutsideClick: false,
          text: err.error.error.message,
          title: 'Error de registro',
          icon: 'error'
          // type: 'info'
          // icon: 'error',
          // confirmButtonText: 'Cool',
        });
      });
   }

}
