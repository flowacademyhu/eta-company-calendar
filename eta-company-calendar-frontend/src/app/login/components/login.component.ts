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
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
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
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.auth.login(email, password)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (_) => { this.router.navigate(['']); },
      (error) => this.handleError(error)
    );
  }

  protected onLogout() {
    this.auth.logout();
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage;
    if (!errorRes.error || ! errorRes.error.error) {
      errorMessage = 'no_response';
    } else {
      switch (errorRes.error.error) {
        case 'invalid_grant':
          errorMessage = 'invalid_grant';
          break;
        default:
          errorMessage = 'no_response';
      }
      this.setErrorMessage(`login.${errorMessage}`);
    }
  }

  private setErrorMessage(messagePath: string) {
    this.translate.get(messagePath)
    .pipe(takeUntil(this.destroy$))
    .subscribe((text) => this.errorMessage = text);
  }

}
