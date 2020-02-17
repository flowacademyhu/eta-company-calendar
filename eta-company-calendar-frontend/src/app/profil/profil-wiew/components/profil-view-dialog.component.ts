import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '~/app/models/profile.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ProfilEditDialog } from '../../profil-edit/profil-edit-dialog.component';

@Component({
  selector: 'app-profil-view-dialog',
  styleUrls: ['profil-view-dialog.component.scss'],
  template: `
  <form (click) = "Close()">
    <h1>Profil adatok</h1>
    <mat-dialog-content>

          <mat-form-field>
            Név
          <div class="pc">
            {{lastName}} {{firstName}}
          </div>
        </mat-form-field>
        <mat-form-field>
          Beosztás
        <div class="pc">
          {{position}}
        </div>
        </mat-form-field>

          <mat-form-field>
              Részleg
            <div class="pc">
            {{department}}
            </div>
          </mat-form-field>
          <mat-form-field>
            Csoport
          <div class="pc">
            {{team}}
          </div>
</mat-form-field>

<mat-form-field>
            Vezető
          <div class="pc">
            {{leader}}
          </div>
        </mat-form-field>
        <mat-form-field>
          Születési idő
        <div class="pc">
          {{dateOfBirth }}
        </div>
        </mat-form-field>

          <mat-form-field>
              Munkaviszony kezdete
            <div class="pc">
            {{dateOfEntry}}
            </div>
          </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button class="mat-raised-button mat-primary" (click) = Modify()>Módosítás</button>
      </mat-dialog-actions>

</form>
  `})
export class ProfilViewDialog {

  constructor(private readonly api: ApiCommunicationService,
              public dialogRef: MatDialogRef<ProfilViewDialog>,
              private dialog: MatDialog) {
    this.profile$ = this.api.profile()
      .getProfile(this.userId);
  }
  public profile: Profile;
  public userId: number;
  public firstName: string = 'Lajos';
  public lastName: string = 'Kovács';
  public dateOfBirth: Date = new Date('1992-01-23');
  public dateOfEntry: Date = new Date('2010-01-23');
  public department: string = 'Pénzügy';
  public position: string = 'Csoportvezető';
  public team: string = 'Könyvelés';
  public leader: string = 'Szabó Ferenc';
  public profile$: Observable<Profile>;

  public Close(): void {
    this.dialogRef.close();
  }
  public Modify(): void {
    this.dialog.open(ProfilEditDialog);
  }

}
