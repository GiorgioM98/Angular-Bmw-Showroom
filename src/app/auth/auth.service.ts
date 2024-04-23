import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../modelli/user.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  parteLogin = "signInWithPassword?key="
  parteRegister = "signUp?key="
  API_KEY = environment.firebaseAPI_Key
  loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:${this.parteLogin}${this.API_KEY}`
  registerUrl = `https://identitytoolkit.googleapis.com/v1/accounts:${this.parteRegister}${this.API_KEY}`;
  isLoggedIn = true
  user: User | undefined


  constructor(private http: HttpClient, private router: Router) { }

  isAuthenticated() {
    return this.isLoggedIn
  }


  createUser(email: string, id: string, token: string, expirationDate: Date) {
    this.user = new User(email, id, token, expirationDate)
    this.isLoggedIn = true
  }


  register(nome: string, cognome: string, email: string, password: string, numeroTelefono: string, nazione: string) {
    return this.http.post(this.registerUrl, { nome: nome, cognome: cognome, email: email, password: password, numeroTelefono: numeroTelefono, nazione: nazione, returnSecureToken: true }).pipe(
      tap(() => {
        this.router.navigate(["/login"])
      })
    )
  }


  login(email: string, password: string) {
    return this.http.post(this.loginUrl, { email: email, password: password, returnSecureToken: true }).pipe(
      tap(() => {
        this.router.navigate([""])
      })
    )
  }


  logout() {
    this.isLoggedIn = false
    this.user = undefined
    localStorage.removeItem('user')
    this.router.navigate(["/login"])
  }



}
