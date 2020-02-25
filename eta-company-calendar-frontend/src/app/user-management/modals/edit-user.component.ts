import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { UserResponse } from '~/app/models/user-response.model';
import { UserService } from '../service/user-service';
import { PasswordNotMatchingValidator } from './password-validator';

@Component({
    selector: 'edit-user-dialog',
    styles: ['mat-form-field {width: 100%;}' ],
    template: `
    <div>
    <h1 align="center" mat-dialog-title>{{'edituserform.edit_user' | translate}}</h1>
    <form [formGroup]="editUserForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill">
          <mat-label>{{'edituserform.email' | translate}}</mat-label>
          <input matInput formControlName="email" type="email">
          <mat-error> {{'edituserform.email_error' | translate}} </mat-error>
        </mat-form-field>
        <br>
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
        <input matInput formControlName="confirm_password" type="password">
        <mat-error> {{'edituserform.password_error' | translate}} </mat-error>
      </mat-form-field>
      <br>
      <div class="d-flex justify-content-center">
      <button mat-raised-button type="submit" name="submit"
      [disabled]="editUserForm.invalid">{{'edituserform.edit_user' | translate}}</button>
      <button mat-raised-button type="button" name="cancel" (click)="onNoClick()"
      class="ml-3">{{'edituserform.cancel' | translate}}</button>
      </div>
    </form>
    </div>`,
  })

  export class EditUserComponent implements OnInit {
    private editUserForm: FormGroup;
    private user: User = {} as User;
    private userValues: UserResponse = this.userdata;

    public ngOnInit() {
      this.editUserForm = new FormGroup({
        confirm_password: new FormControl(),
        email: new FormControl(undefined, [Validators.email]),
        password: new FormControl(),
        role: new FormControl(),
      }, {validators: PasswordNotMatchingValidator });

      this.editUserForm.setValue({
        email: this.userValues.email,
        role: this.userValues.role,
        password: '',
        confirm_password: '',
      });
    }

    constructor(@Inject(MAT_DIALOG_DATA)
                private readonly userdata: UserResponse,
                private readonly snackBar: MatSnackBar,
                private readonly translate: TranslateService,
                public readonly dialogRef: MatDialogRef<EditUserComponent>,
                public readonly userService: UserService) {}

    public onNoClick(): void {
      this.dialogRef.close();
    }

    public openSnackBar(message: string) {
      this.snackBar.open(`${message}`, undefined, {
      duration: 2000
      });
    }

    protected onSubmit() {
      this.user = this.editUserForm.getRawValue();
      this.userService.updateUser(this.userdata.id, this.user)
              .subscribe(() => {this.openSnackBar(this.translate.instant('edituserform.success'));
                                this.dialogRef.close();
                                this.userService.getAllUsers(); },
               () => this.openSnackBar('edituserform.fail')); }
  }
