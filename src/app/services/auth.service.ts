import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  // Loguear usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private urlBackend = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private ApiKey = '';
  private token: string;

  constructor( private httpClient: HttpClient) { }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
  }

  login(usuario: UsuarioModel): Observable<any> {
    const authUser = {
      ...usuario,
      returnSecureToken: true
    };

    return this.httpClient.post(`${ this.urlBackend}signInWithPassword?key=${ this.ApiKey }`, authUser ).pipe( map(
      resp => {
        // tslint:disable-next-line: no-string-literal
        const seconds = resp['expiresIn'];
        this.calcularVigenciaSesion(seconds);
        // tslint:disable-next-line: no-string-literal
        this.guardarToken( resp['idToken'] );
        return resp;
      }
    ));
  }

  logout(): void {

  }

  nuevoUsuario(usuario: UsuarioModel): Observable<any> {
    // Se crea el body de la petición http
    // const authUser = {
    //   email: usuario.email,
    //   password: usuario.password,
    //   returnSecureToken: true
    // };
    // Esta representación utiliza el operador spread para indicar que el objeto se compone de los campos del otro objeto.
    const authUser = {
      ...usuario,
      returnSecureToken: true
    };
    return this.httpClient.post(`${ this.urlBackend}signUp?key=${ this.ApiKey }`, authUser ).pipe( map(
      resp => {
        console.log(resp);
        // tslint:disable-next-line: no-string-literal
        const seconds = resp['expiresIn'];
        this.calcularVigenciaSesion(seconds);
        // tslint:disable-next-line: no-string-literal
        this.guardarToken( resp['idToken'] );
        return resp;
      }
    ));
  }

  guardarToken( idToken: string ): void {
    this.token = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken( ): string {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
    return this.token;
  }

  private calcularVigenciaSesion( segundos: string): void {
      const seconds = Number( segundos );
      const dateCur = new Date();
      dateCur.setSeconds(dateCur.getSeconds() + seconds);
      const expireTime = dateCur.getTime();
      console.log(expireTime);
      localStorage.setItem('expira', expireTime.toString());
  }

  estaAutenticado(): boolean {
    if ( this.token && this.token.length > 2 ) {
      const fecha = new Date();
      const expireTime = parseInt( localStorage.getItem('expira'), 10 );
      console.log(fecha.getTime());
      console.log(expireTime);
      if ( fecha.getTime() < expireTime ) {
        console.log('vigente');
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}
