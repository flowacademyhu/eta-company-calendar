import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  public ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(undefined, [Validators.email, Validators.required]),
      password: new FormControl(undefined, [Validators.required])
    });

    // this.loginForm.setValue({
    //   'email': 'admin1@test.com',
    //   'password': 'admin123'
    // });
  }

  protected onSubmit() {
    if (this.loginForm.invalid || this.loginForm === undefined) {
      this.errorMessage = 'form invalid';
      return;
    }
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.auth.login(email, password)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (_) => { this.router.navigate(['']); },
      (error) => this.errorMessage = error
    );
  }

  protected onLogout() {
    this.auth.logout();
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
  }

}
