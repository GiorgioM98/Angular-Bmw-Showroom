import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bmw Showroom';


  constructor(private authService: AuthService) { }




  ngOnInit(): void {
    const userItem = localStorage.getItem('user');
    if (userItem) {
      const user = JSON.parse(userItem);
      this.authService.createUser(user.email, user.id, user._token, user._expirationDate);
    }
  }

}
