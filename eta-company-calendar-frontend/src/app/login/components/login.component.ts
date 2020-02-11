import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '~/app/shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome-description',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });

    this.loginForm.setValue({
      'email': 'admin1@test.com',
      'password': 'admin123'
    });
  }

  onSubmit() {
    if (this.loginForm.invalid || this.loginForm == null) {
      console.log('form is invalid');
      return;
    }
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.auth.login(email, password).subscribe(
      _ => { console.log('successfully logged in'); this.router.navigate(['welcome'])},
      error => console.log(error)
    );
  }

  onLogout() {
    this.auth.logout();
  }

}