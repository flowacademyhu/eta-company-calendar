import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'dialog-overview-example-dialog',
    template: `
    <div class="example-container width:600px ">
    <h1 mat-dialog-title>Create new user</h1>
    <mat-form-field appearance="fill">
    <mat-label>Role</mat-label>
    <mat-select>
      <mat-option value="option">User</mat-option>
      <mat-option value="option">Admin</mat-option>
    </mat-select>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill">
    <mat-label>E-mail</mat-label>
    <input matInput>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill">
    <mat-label>Password</mat-label>
    <input matInput>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill">
    <mat-label>Confirm Password</mat-label>
    <input matInput>
    </mat-form-field>
    <button mat-button>Create</button>
    <button mat-button (click)="onNoClick()">Cancel</button>
    </div>`,
  })
  export class NewUserComponent {

    constructor(
      public dialogRef: MatDialogRef<NewUserComponent>) {}

    public onNoClick(): void {
      this.dialogRef.close();
    }

  }
