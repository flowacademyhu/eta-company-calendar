import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'new-user-dialog',
    template: `
    <div class="example-container width:600px ">
    <h1 mat-dialog-title>{{'newuserform.create_new_user' | translate}}</h1>
    <mat-form-field appearance="fill">
    <mat-label>{{'newuserform.role' | translate}}</mat-label>
    <mat-select>
      <mat-option value="option">{{'newuserform.user' | translate}}</mat-option>
      <mat-option value="option">{{'newuserform.admin' | translate}}</mat-option>
    </mat-select>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill">
    <mat-label>{{'newuserform.email' | translate}}</mat-label>
    <input matInput>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill">
    <mat-label>{{'newuserform.password' | translate}}</mat-label>
    <input matInput>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill">
    <mat-label>{{'newuserform.confirm_password' | translate}}</mat-label>
    <input matInput>
    </mat-form-field>
    <button mat-button>{{'newuserform.create' | translate}}</button>
    <button mat-button (click)="onNoClick()">{{'newuserform.cancel' | translate}}</button>
    </div>`,
  })
  export class NewUserComponent {

    constructor(
      public dialogRef: MatDialogRef<NewUserComponent>) {}

    public onNoClick(): void {
      this.dialogRef.close();
    }

  }
