import { Component } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Profile } from '~/app/models/profile.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { ProfilEditDialog } from './profil-edit-dialog.component';

@Component({
  selector: 'app-profil-view-dialog',
  styleUrls: ['profil-view-dialog.component.scss'],
  template: `
    <h1>Profil adatok</h1>
    <mat-dialog-content>

          <mat-form-field>
            {{'profile.name' | translate }}
          <div class="pc">
            {{profileData.lastName}} {{profileData.firstName}}
          </div>
        </mat-form-field>
        <mat-form-field>
          Beosztás
        <div class="pc">
          {{profileData.position}}
        </div>
        </mat-form-field>

          <mat-form-field>
              Részleg
            <div class="pc">
            {{profileData.department}}
            </div>
          </mat-form-field>
          <mat-form-field>
            Csoport
          <div class="pc">
            {{profileData.team}}

          </div>
</mat-form-field>

<mat-form-field>
            Vezető
          <div class="pc">
            {{profileData.leader}}
          </div>
        </mat-form-field>
        <mat-form-field>
          Születési idő
        <div class="pc">
          {{profileData.dateOfBirth | date }}
        </div>
        </mat-form-field>

          <mat-form-field>
              Munkaviszony kezdete
            <div class="pc">
            {{profileData.dateOfEntry}}
            </div>
          </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button class="mat-raised-button mat-primary" (click) = Modify()>Módosítás</button>
      </mat-dialog-actions>
  `})

export class ProfilViewDialog {
  public profilData: Profile;

  constructor(private readonly api: ApiCommunicationService,
              // private readonly translate: TranslateService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<ProfilViewDialog>) {
    this.profile$ = this.api.profile()
      .getProfile(this.profileData.userId);
  }

  public profileData: Profile = {
    dateOfBirth: new Date('1992-01-23'),
    dateOfEntry: new Date('2010-01-23'),
    department: 'Pénzügy',
    firstName: 'Lajos',
    lastName: 'Kovács',
    leader: 'Szabó Ferenc',
    position: 'Csoportvezető',
    team: 'Könyvelés',
    userId: 1
  };
  public profile$: Observable<Profile>;

  public Close(): void {
    this.dialogRef.close();
  }
   public Modify(): void {
     this.dialog.open(ProfilEditDialog,
       {
         data: {
           dateOfBirth: this.profileData.dateOfBirth,
           dateOfEntry: this.profileData.dateOfEntry,
           department: this.profileData.department,
           firstname: this.profileData.firstName,
           lastname: this.profileData.lastName,
           leader: this.profileData.leader,
           position: this.profileData.position,
           team: this.profileData.team
         }
       });
   }

}
