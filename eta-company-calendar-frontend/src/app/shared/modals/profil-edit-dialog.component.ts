import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Profile } from '~/app/models/profile.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Component({
  selector: 'app-profil-edit-dialog',
  styleUrls: ['profil-edit-dialog.component.scss'],
  template: `
  <h1 mat-dialog-title>Profil adatok</h1>
  <div mat-dialog-content>
    <mat-form-field>
      <mat-label>Név</mat-label>
      <input matInput [(ngModel)]="data.lastName">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">No Thanks</button>
    <button mat-button >Ok</button>
  </div>

  `

})

export class ProfilEditDialog implements OnInit {
  public  editProfileForm: FormGroup;

constructor(public dialogRef: MatDialogRef<ProfilEditDialog>,
            public readonly api: ApiCommunicationService,
            public dialog: MatDialog,
            @Inject(MAT_DIALOG_DATA) public data: Profile) {}

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
