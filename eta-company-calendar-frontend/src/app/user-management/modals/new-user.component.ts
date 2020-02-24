import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../service/user-service';

@Component({
    selector: 'new-user-dialog',
    styles: ['mat-form-field {width: 100%;}' ],
    template: `
    <div>
    <h1 align="center" mat-dialog-title>{{'newuserform.create_new_user' | translate}}</h1>
    <form [formGroup]="newUserForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill">
          <mat-label>{{'newuserform.role' | translate}}</mat-label>
        <mat-select formControlName="role">
          <mat-option value="USER">{{'newuserform.user' | translate}}</mat-option>
          <mat-option value="ADMIN">{{'newuserform.admin' | translate}}</mat-option>
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
        <input matInput formControlName="confirm_password" type="password">
        <mat-error> {{'newuserform.password_error' | translate}} </mat-error>
      </mat-form-field>
      <br>
      <div class="d-flex justify-content-center">
      <button mat-raised-button type="submit" name="submit"
      [disabled]="newUserForm.invalid">{{'newuserform.create' | translate}}</button>
      <button mat-raised-button type="button" name="cancel" (click)="onNoClick()"
      class="ml-3">{{'newuserform.cancel' | translate}}</button>
      </div>
    </form>
    </div>`,
  })

  export class NewUserComponent implements OnInit {
    private newUserForm: FormGroup;
    private user: User = {} as User;

    public ngOnInit() {
      this.newUserForm = new FormGroup({
        confirm_password: new FormControl(undefined, [Validators.required]),
        email: new FormControl(undefined, [Validators.email, Validators.required]),
        password: new FormControl(undefined, [Validators.required]),
        role: new FormControl(undefined, [Validators.required])
      });
    }

    constructor(
      public dialogRef: MatDialogRef<NewUserComponent>,
      private readonly snackBar: MatSnackBar,
      private readonly translate: TranslateService,
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
      if (this.newUserForm.get('password')?.value !==
      this.newUserForm.get('confirm_password')?.value) {
        this.openSnackBar(this.translate.instant('newuserform.match_failed'));
      } else {
      this.user = this.newUserForm.getRawValue();
      this.userService.postUser(this.user)
              .subscribe(() => {this.openSnackBar(this.translate.instant('newuserform.success'));
                                this.userService.getAllUsers();
                                this.dialogRef.close(); },
               () => this.openSnackBar(this.translate.instant('newuserform.fail'))); }
    }
  }
