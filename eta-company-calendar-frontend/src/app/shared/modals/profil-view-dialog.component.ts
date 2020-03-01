import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Profile } from '~/app/models/profile.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { ProfilEditDialog } from './profile-edit-dialog.component';

@Component({
  selector: 'app-profil-view-dialog',
  styleUrls: ['profil-view-dialog.component.scss'],
  template: `
  <h1 style="text-align:center;">{{'profile.view' | translate | uppercase}}</h1>
    <mat-dialog-content class="dialogview mb-5">
      <div class="personal">
          {{'profile.lastName' | translate }}
          <div class="pc">
             {{profile.lastName}}
          </div>
        <br>
          {{'profile.firstName' | translate }}
          <div class="pc">
             {{profile.firstName}}
          </div>
        <br>
        {{'profile.position' | translate }}
        <div class="pc">
           {{profile.position}}
        </div>
        <br>
        </div>
      <div class="divider"> </div>
    <div class="workdata">
          {{'profile.department' | translate }}
          <div class="pc">
             {{profile.department}}
          </div>
        <br>
          {{'profile.team' | translate }}
          <div class="pc">
             {{profile.team}}
          </div>
        <br>
          {{'profile.leader' | translate }}
          <div class="pc">
             {{profile.leader}}
          </div>
    </div>
    </mat-dialog-content>

    <div div class="d-flex justify-content-between">
      <button mat-stroked-button (click) = openEditDialog()
          align="center">{{'profile.modify' | translate}}</button>
      <button mat-stroked-button (click) = Close() type="button"
          align="center">{{'profile.close' | translate}}</button>
    </div>

    `
})

export class ProfilViewDialog implements OnInit {
  public editForm: FormGroup;
  public mod: boolean = false;
  public profile: Profile = {} as Profile;

  constructor(@Inject(MAT_DIALOG_DATA)
              private readonly id: number,
              private readonly api: ApiCommunicationService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<ProfilViewDialog>) {
  }

  public ngOnInit() {
    this.api.profile()
      .getProfile(this.id)
      .subscribe(
        (data: Profile) => {this.profile = data; });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public Close(): void {
    this.dialogRef.close();
  }

  public openEditDialog(): void {
    this.dialog.open(ProfilEditDialog, {
      data: this.id,
    });
    this.dialogRef.close();
  }

}
