import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  getPersone(url:string){
    return this.http.get(`${url}?auth=${this.authService.user?.token}`)
  }


  insertModello(url:string, body: {}){
    return this.http.post(url ,body)
  }


  getModello(url:string){
    return this.http.get(url)
  }

  deleteModello(url:string){
    return this.http.delete(url)
  }


  patchModello(url:string, body :{}){
    return this.http.patch(url, body)

  }

}
