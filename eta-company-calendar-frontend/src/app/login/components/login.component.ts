import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '~/app/shared/services/auth.service';

@Component({
  selector: 'app-welcome-description',
  template: `
  <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
    <mat-form-field>
      <mat-label>{{ 'login.email' | translate }}</mat-label>
      <input matInput formControlName="email" type="text">
      <mat-error> {{'login.email_error' | translate}} </mat-error>
    </mat-form-field>
    <br>
    <mat-form-field>
      <mat-label>{{ 'login.password' | translate }}</mat-label>
      <input matInput formControlName="password" type="password">
      <mat-error> {{'login.password_error' | translate}} </mat-error>
    </mat-form-field>
    <br>
    <p *ngIf="errorMessage">{{ errorMessage }}</p>
    <button mat-raised-button type="submit">{{ 'login.login' | translate }}</button>
    <button mat-raised-button (click)="onLogout()">{{ 'login.logout' | translate }}</button>
  </form>
  `
})

export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  protected errorMessage: string;

  constructor(private readonly auth: AuthService,
              private readonly router: Router,
              private readonly translate: TranslateService) { }

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
    this.auth.login(email, password)
    .subscribe(
      (_) => { this.router.navigate(['']); },
      (error) => this.handleError(error)
    );
  }

  protected onLogout() {
    this.auth.logout();
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
