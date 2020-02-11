import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';


@Component({
  selector: 'app-welcome-description',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(private readonly api: ApiCommunicationService) { }

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
    console.log(email, password)
    this.api.auth().requestToken(email, password).subscribe( token => {
      console.log(token.access_token);
    })

  }

}