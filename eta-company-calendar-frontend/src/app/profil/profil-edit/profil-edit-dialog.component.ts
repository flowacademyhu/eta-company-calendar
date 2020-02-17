import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, RequiredValidator, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Component({
  selector: 'app-profil-edit-dialog',
  styleUrls: ['profil-edit-dialog.component.scss'],
  template: `
<div class="login-wrapper">
    <mat-card class="box">
      <mat-card-header>
        <mat-card-title class="title">Profil adatok módosítása</mat-card-title>
      </mat-card-header>
      <form [formGroup]="editProfileForm" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill" [style.width.%]=100>
          <mat-label>Vezetékvév</mat-label>
          <input matInput formControlName="lastname" type="text">
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" [style.width.%]=100>
        <mat-label>Keresztnév</mat-label>
        <input matInput formControlName="firstname" type="text">
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" [style.width.%]=100>
        <mat-label>Születési év</mat-label>
        <input matInput formControlName="dateOfBirth" type="date">
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" [style.width.%]=100>
        <mat-label>Beosztás</mat-label>
        <input matInput formControlName="position" type="text">
      </mat-form-field>
      <br>
      <button mat-raised-button type="submit">Mentés</button>
      <button mat-raised-button (click)="onNoClick()" class="ml-3">Mégsem</button>
      </form>
    </mat-card>
  </div>
  `

})

export class ProfilEditDialog implements OnInit {
  private editProfileForm: FormGroup;

constructor(public dialogRef: MatDialogRef<ProfilEditDialog>,
            public readonly api: ApiCommunicationService) {}

public ngOnInit() {
  this.editProfileForm = new FormGroup(
    {
      dateOfBirth: new FormControl(undefined, [Validators.required]),
      firstname: new FormControl(undefined, [Validators.required]),
      lastname: new FormControl(undefined, [Validators.required]),
      position: new FormControl(undefined, [Validators.required]),
    }
  );
}

public onNoClick(): void {
  this.dialogRef.close();
}

protected onSubmit() {
  // post
}
}
