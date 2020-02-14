import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'new-user-dialog',
    template: `
    <div class="example-container width:600px ">
    <h1 mat-dialog-title>{{'newuserform.create_new_user' | translate}}</h1>
    <form [formGroup]="newUserForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill">
          <mat-label>{{'newuserform.role' | translate}}</mat-label>
        <mat-select formControlName="role">
          <mat-option value="option">{{'newuserform.user' | translate}}</mat-option>
          <mat-option value="option">{{'newuserform.admin' | translate}}</mat-option>
        </mat-select>
        <mat-error> {{'newuserform.role_error' | translate}} </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill">
        <mat-label>{{'newuserform.email' | translate}}</mat-label>
        <input matInput formControlName="email" type="text">
        <mat-error> {{'newuserform.email_error' | translate}} </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill">
        <mat-label>{{'newuserform.password' | translate}}</mat-label>
        <input matInput formControlName="password" type="password">
        <mat-error> {{'newuserform.password_error' | translate}} </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill">
        <mat-label>{{'newuserform.confirm_password' | translate}}</mat-label>
        <input matInput formControlName="password" type="password">
        <mat-error> {{'newuserform.password_error' | translate}} </mat-error>
      </mat-form-field>
      <button mat-raised-button type="submit"
      [disabled]="newUserForm.invalid">{{'newuserform.create' | translate}}</button>
    </form>
    <button mat-raised-button (click)="onNoClick()">{{'newuserform.cancel' | translate}}</button>
    </div>`,
  })
  export class NewUserComponent implements OnInit {
    private newUserForm: FormGroup;

    public ngOnInit() {
      this.newUserForm = new FormGroup({
        email: new FormControl(undefined, [Validators.email, Validators.required]),
        password: new FormControl(undefined, [Validators.required]),
        role: new FormControl(undefined, [Validators.required])
      });
    }

    constructor(
      public dialogRef: MatDialogRef<NewUserComponent>) {}

    public onNoClick(): void {
      this.dialogRef.close();
    }

    protected onSubmit() {
      if (this.newUserForm.valid) {
      alert('Form works!'); }
    }
  }
