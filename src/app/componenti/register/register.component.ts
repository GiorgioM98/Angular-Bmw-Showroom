import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm!: FormGroup

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      numeroTelefono: ['+39 ', [Validators.maxLength(14)]],
      nazione: [''],
    });
  }


  onNavigate() {
    this.router.navigate(['/login']);
  }


  onSubmit() {
    const nome = this.registerForm.value.nome;
    const cognome = this.registerForm.value.cognome;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const numeroTelefono = this.registerForm.value.numeroTelefono;
    const nazione = this.registerForm.value.nazione
    console.log(nome, cognome, email, password, numeroTelefono, nazione);
    this.authService.register(nome, cognome, email, password, numeroTelefono, nazione).subscribe((data: any) =>
      console.log(data))
    this.registerForm.reset();
  }

}
