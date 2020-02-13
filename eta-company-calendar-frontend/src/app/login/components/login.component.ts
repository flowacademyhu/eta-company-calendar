import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { ConfigurationService } from '~/app/shared/services/configuration.service';

@Component({
  selector: 'app-welcome-description',
  styleUrls: ['./login.component.scss'],
  template: `
  <div class="login-wrapper">
    <mat-card class="box">
      <mat-card-header>
        <mat-card-title class="title">Log in</mat-card-title>
      </mat-card-header>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <mat-card-content>
          <mat-form-field class="login-full-width">
            <mat-label>{{ 'login.email' | translate }}</mat-label>
            <input matInput formControlName="email" type="text">
            <mat-error> {{'login.email_error' | translate}} </mat-error>
          </mat-form-field>
          <mat-form-field class="login-full-width">
            <mat-label>{{ 'login.password' | translate }}</mat-label>
            <input matInput formControlName="password" type="password">
            <mat-error> {{'login.password_error' | translate}} </mat-error>
          </mat-form-field>
          <button mat-stroked-button color="primary" class="btn-block" type="submit"
          >{{ 'login.login' | translate }}</button>
          <div class="button-separator"></div>
          <button mat-stroked-button color="primary" class="btn-block" (click)="onLogout()"
          >{{ 'login.logout' | translate }}</button>
          <p class="error-message" *ngIf="errorMessage">{{ errorMessage }}</p>
        </mat-card-content>
      </form>
    </mat-card>
  </div>
  `
})

export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  protected errorMessage: string;

  constructor(private readonly router: Router,
              private readonly translate: TranslateService,
              private readonly config: ConfigurationService,
              private readonly api: ApiCommunicationService) { }

  public ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(undefined, [Validators.email, Validators.required]),
      password: new FormControl(undefined, [Validators.required])
    });
  }

  protected onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.api.auth()
    .requestToken(email, password)
    .subscribe(
      (token) => {
        this.router.navigate(['']);
        this.config.setToken(token);
      },
      (error) => this.handleError(error)
    );
  }

  protected onLogout() {
    this.config.clearToken();
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage;
    if (!errorRes.error || ! errorRes.error.error) {
      errorMessage = 'no_response';
    } else if (errorRes.error.error === 'invalid_grant') {
      errorMessage = 'invalid_grant';
    } else {
      errorMessage = 'no_response';
    }
    this.setErrorMessage(`login.${errorMessage}`);
  }

  private setErrorMessage(messagePath: string) {
    this.errorMessage = this.translate.instant(messagePath);
  }

}
