import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Profile } from '~/app/models/profile.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Component({
  selector: 'app-profile-edit-dialog',
  styleUrls: ['profil-view-dialog.component.scss'],
  template: `
<form [formGroup]="editForm" (ngSubmit)= "onSubmit()" >
  <h1 style="text-align:center;">{{'profile.view' | translate | uppercase}}</h1>
<mat-dialog-content class="dialogview mb-5">
  <div class="personal">
    <mat-form-field>
    <mat-label>{{'profile.lastName' | translate }}</mat-label>
      <div class="pc">
     <input matInput
        class="form-control" type="text"
        formControlName="lastName">
      </div>
    </mat-form-field>
    <br>
    <mat-form-field>
      <mat-label>{{'profile.firstName' | translate }}</mat-label>
        <div class="pc">
       <input matInput
        class="form-control" type="text"
        formControlName="firstName">
        </div>
    </mat-form-field>
    <br>
    <mat-form-field>
    <mat-label>{{'profile.position' | translate }}</mat-label>
      <div class="pc">
      <input matInput
        class="form-control"
        formControlName="position">
      </div>
    </mat-form-field>
    <br>
    </div>
  <div class="divider"> </div>
<div class="workdata">
    <mat-form-field>
      <mat-label>{{'profile.department' | translate }}</mat-label>
        <div class="pc">
        <input matInput type="text"
          class="form-control"
          formControlName="department">
        </div>
      </mat-form-field>
    <br>
    <mat-form-field>
      <mat-label>{{'profile.team' | translate }}</mat-label>
        <div class="pc">
       <input matInput
          class="form-control"
          formControlName="team">
        </div>
    </mat-form-field>
    <br>
    <mat-form-field>
      <mat-label>{{'profile.leader' | translate }}</mat-label>
        <div class="pc">
       <input matInput
          class="form-control"
          formControlName="leader">
        </div>
      </mat-form-field>
</div>
</mat-dialog-content>
<div class="d-flex justify-content-between">
<button mat-stroked-button
      align="center" type="submit">{{'profile.save' | translate}}</button>
<button mat-stroked-button (click) = Close() type="button"
      align="center">{{'profile.cancel' | translate}}</button>
</div>
</form>
    `
})

export class ProfilEditDialog implements OnInit {
  public editForm: FormGroup;
  public mod: boolean = false;
  public profile: Profile = {} as Profile;

  constructor(@Inject(MAT_DIALOG_DATA)
              private readonly id: number,
              private readonly snackBar: MatSnackBar,
              private readonly translate: TranslateService,
              private readonly api: ApiCommunicationService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<ProfilEditDialog>) {
  }

  public ngOnInit() {
    this.api.profile()
      .getProfile(this.id)
      .subscribe(
        (data: Profile) => {this.profile = data;
                            this.editForm.patchValue({
          department: this.profile.department,
          firstName: this.profile.firstName,
          lastName: this.profile.lastName,
          leader: this.profile.leader,
          position: this.profile.position,
          team: this.profile.team,
            });
          }
        );

    this.editForm = new FormGroup({
      department: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      leader: new FormControl(),
      position: new FormControl(),
      team: new FormControl()
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public Close(): void {
    this.dialogRef.close();
  }

  public openSnackBar(message: string) {
    this.snackBar.open(`${message}`, undefined, {
    duration: 2000
    });
  }

  protected onSubmit() {
    this.profile = this.editForm.getRawValue();
    this.api.profile()
    .updateProfile(this.id, this.profile)
    .subscribe(() => this.openSnackBar(this.translate.instant('profile.success')),
    () => this.openSnackBar(this.translate.instant('profile.fail')));
    this.Close();
  }
}
