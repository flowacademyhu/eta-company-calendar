import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { ApiCommunicationService } from 'src/app/shared/services/api-communication.service';

@Component({
    selector: 'edit-user-dialog',
    styles: ['mat-form-field {width: 100%;}' ],
    template: `
    <div>
    <h1 align="center" mat-dialog-title>{{'edituserform.edit_user' | translate}}</h1>
    <form [formGroup]="editUserForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill">
          <mat-label>{{'edituserform.role' | translate}}</mat-label>
        <mat-select formControlName="role">
          <mat-option value="USER">{{'edituserform.user' | translate}}</mat-option>
          <mat-option value="ADMIN">{{'edituserform.admin' | translate}}</mat-option>
        </mat-select>
        <mat-error> {{'edituserform.role_error' | translate}} </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill">
        <mat-label>{{'edituserform.password' | translate}}</mat-label>
        <input matInput formControlName="password" type="password">
        <mat-error> {{'edituserform.password_error' | translate}} </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill">
        <mat-label>{{'edituserform.confirm_password' | translate}}</mat-label>
        <input matInput formControlName="password" type="password">
        <mat-error> {{'edituserform.password_error' | translate}} </mat-error>
      </mat-form-field>
      <br>
      <button mat-raised-button type="submit" name="submit"
      [disabled]="editUserForm.invalid">{{'edituserform.edit_user' | translate}}</button>
      <button mat-raised-button type="button" name="cancel" (click)="onNoClick()"
      class="ml-3">{{'edituserform.cancel' | translate}}</button>
    </form>
    </div>`,
  })

  export class EditUserComponent implements OnInit {
    private editUserForm: FormGroup;
    private user: User = {} as User;

    public ngOnInit() {
      this.editUserForm = new FormGroup({
        password: new FormControl(undefined, [Validators.required]),
        role: new FormControl(undefined, [Validators.required])
      });
    }

    constructor(
      public dialogRef: MatDialogRef<EditUserComponent>,
      public readonly api: ApiCommunicationService) {}

    public onNoClick(): void {
      this.dialogRef.close();
    }

    protected onSubmit() {
      this.user = this.editUserForm.getRawValue();
      this.api.user()
              .postUser(this.user)
              .subscribe(() => {alert('User has been edited');
                                this.dialogRef.close(); },
               (error) => alert('Error occured: ' + error.status));
    }
  }
