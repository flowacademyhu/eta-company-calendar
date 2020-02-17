import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { ApiCommunicationService } from '../services/api-communication.service';

@Component({
    selector: 'new-user-dialog',
    template: `
    <div>
    <h1 align="center" mat-dialog-title>{{'newuserform.create_new_user' | translate}}</h1>
    <form [formGroup]="newUserForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill" [style.width.%]=100>
          <mat-label>{{'newuserform.role' | translate}}</mat-label>
        <mat-select formControlName="role">
          <mat-option value="USER">{{'newuserform.user' | translate}}</mat-option>
          <mat-option value="ADMIN">{{'newuserform.admin' | translate}}</mat-option>
        </mat-select>
        <mat-error> {{'newuserform.role_error' | translate}} </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" [style.width.%]=100>
        <mat-label>{{'newuserform.email' | translate}}</mat-label>
        <input matInput formControlName="email" type="text">
        <mat-error> {{'newuserform.email_error' | translate}} </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" [style.width.%]=100>
        <mat-label>{{'newuserform.password' | translate}}</mat-label>
        <input matInput formControlName="password" type="password">
        <mat-error> {{'newuserform.password_error' | translate}} </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" [style.width.%]=100>
        <mat-label>{{'newuserform.confirm_password' | translate}}</mat-label>
        <input matInput formControlName="confirmpassword" type="password">
        <mat-error> {{'newuserform.password_error' | translate}} </mat-error>
      </mat-form-field>
      <br>
      <button mat-raised-button type="submit"
      [disabled]="newUserForm.invalid">{{'newuserform.create' | translate}}</button>
      <button mat-raised-button (click)="onNoClick()" class="ml-3">{{'newuserform.cancel' | translate}}</button>
    </form>
    </div>`,
  })

  export class NewUserComponent implements OnInit {
    private newUserForm: FormGroup;
    private user: User = {role: '', email: '', password: ''};

    public ngOnInit() {
      this.newUserForm = new FormGroup({
        confirmpassword: new FormControl(undefined, [Validators.required]),
        email: new FormControl(undefined, [Validators.email, Validators.required]),
        password: new FormControl(undefined, [Validators.required]),
        role: new FormControl(undefined, [Validators.required])
      });
    }

    constructor(
      public dialogRef: MatDialogRef<NewUserComponent>,
      public readonly api: ApiCommunicationService) {}

    public onNoClick(): void {
      this.dialogRef.close();
    }

    public handleError(error: HttpErrorResponse) {
      if (error.status === 400) { alert('Email address already exists'); }
    }

    protected onSubmit() {
      if (this.newUserForm.get('password')?.value === this.newUserForm.get('confirmpassword')?.value ) {
      this.user.role = this.newUserForm.get('role')?.value;
      this.user.email = this.newUserForm.get('email')?.value;
      this.user.password = this.newUserForm.get('password')?.value;
      this.api.user()
              .postUser(this.user)
              .subscribe((data) => alert(data), (error) => this.handleError(error));
    } else { alert('Password mismatch'); }
  }

}
