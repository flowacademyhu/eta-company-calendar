import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '~/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-welcome-description',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  loginForm: FormGroup;
  
  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });

    // this.loginForm.setValue({
    //   'email': 'admin1@test.com',
    //   'password': 'admin123'
    // });
  }

  onSubmit() {
    if (this.loginForm.invalid || this.loginForm == null) {
      console.log('form is invalid');
      return;
    }
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.auth.login(email, password)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      _ => { console.log('successfully logged in'); this.router.navigate([''])},
      error => console.log(error)
    )
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

}