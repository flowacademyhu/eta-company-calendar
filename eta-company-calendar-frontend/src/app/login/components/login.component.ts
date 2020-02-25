import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '~/app/shared/services/auth.service';

@Component({
  selector: 'app-welcome-description',
  styleUrls: ['./login.component.scss'],
  template: `
  <div class="login-wrapper">
    <mat-card class="box">
      <mat-card-header>
        <mat-card-title class="title">{{ 'login.login' | translate }}</mat-card-title>
      </mat-card-header>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <mat-card-content>
          <mat-form-field class="login-full-width mb-2">
            <mat-label>{{ 'login.email' | translate }}</mat-label>
            <input matInput formControlName="email" type="text">
            <mat-error> {{'login.email_error' | translate}} </mat-error>
          </mat-form-field>
          <mat-form-field class="login-full-width mb-3">
            <mat-label>{{ 'login.password' | translate }}</mat-label>
            <input matInput formControlName="password" type="password">
            <mat-error> {{'login.password_error' | translate}} </mat-error>
          </mat-form-field>
          <button mat-stroked-button color="primary" class="btn-block" type="submit" [disabled]="loginForm.invalid"
          >{{ 'login.login' | translate }}</button>
          <div class="button-separator"></div>
          <p class="error-message" *ngIf="errorMessage">{{ errorMessage | translate }}</p>
        </mat-card-content>
      </form>
    </mat-card>
  </div>
  <img src="/assets/images/csihalogopng.png">
  `
})

export class LoginComponent implements OnInit {
  protected loginForm: FormGroup;
  protected errorMessage: string;

  constructor(private readonly auth: AuthService) { }

  public ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(undefined, [Validators.email, Validators.required]),
      password: new FormControl(undefined, [Validators.required])
    });
  }

  protected onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.auth.login(email, password)
    .subscribe(undefined, (err) => this.errorMessage = err);
  }

}
