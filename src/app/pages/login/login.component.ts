import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarUsuario = false;

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();

    if ( localStorage.getItem('email' ) ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarUsuario = true;
    }
  }

  login( formulario: NgForm ): void {
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

    this.authService.login(this.usuario).subscribe( respuestaFireBase => {
      console.log(respuestaFireBase);
      Swal.close();
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        // title: 'Error!',
        allowOutsideClick: false,
        text: err.error.error.message,
        title: 'Error al autenticar',
        icon: 'error'
        // type: 'info'
        // icon: 'error',
        // confirmButtonText: 'Cool',
      });
    });
 }

}
