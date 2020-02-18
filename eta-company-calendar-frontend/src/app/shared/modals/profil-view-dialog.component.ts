import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Profile } from '~/app/models/profile.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Component({
  selector: 'app-profil-view-dialog',
  styleUrls: ['profil-view-dialog.component.scss'],
  template: `
<form [formGroup]="editForm">
  <h1 style="text-align:center;">{{'profile.view' | translate}}</h1>
    <mat-dialog-content class="dialogview mb-5">
      <div class="personal">
      <mat-form-field>
          {{'profile.lastname' | translate }}
        <div class="pc">
          <span *ngIf = "!mod"> {{profileData.lastName}} </span>
          <span *ngIf = "mod">
             <input matInput
                    class="input"
                    formControlName = "lastname"
                    [(ngModel)] = "profileData.lastName">
          </span>
        </div>
      </mat-form-field>
      <br>
      <mat-form-field>
          {{'profile.firstname' | translate }}
        <div class="pc">
          <span *ngIf = "!mod"> {{profileData.firstName}} </span>
          <span *ngIf = "mod">
             <input matInput
                    class="input"
                    formControlName = "firstname"
                    [(ngModel)] = "profileData.firstName">

          </span>
        </div>
      </mat-form-field>
      <br>
      <mat-form-field>
      {{'profile.dateOfBirth' | translate }}
        <div class="pc">
        <span *ngIf = "!mod"> {{profileData.dateOfBirth | date: "yyyy-MM-dd" }}</span>
        <span *ngIf = "mod">
             <input matInput
                    class="input"
                    type=date
                    formControlName = "dateOfBirth"
                    [(ngModel)] = "profileData.dateOfBirth">
        </span>
        </div>
      </mat-form-field>
      </div>
      <div class="divider"> </div>
      <div class="workdata">
      <mat-form-field>
            {{'profile.department' | translate }}
          <div class="pc">
          <span *ngIf = "!mod"> {{profileData.department}}</span>
          <span *ngIf = "mod">
             <input matInput
                    class="input"
                    type=text
                    formControlName = "department"
                    [(ngModel)] = "profileData.department">
          </span>
          </div>
      </mat-form-field>
      <br>
      <mat-form-field>
          {{'profile.team' | translate }}
          <div class="pc">
          <span *ngIf = "!mod"> {{profileData.team}}</span>
          <span *ngIf = "mod">
             <input matInput
                    class="input"
                    type=text
                    formControlName = "team"
                    [(ngModel)] = "profileData.team">
          </span>
          </div>
          </mat-form-field>
          <br>
      <mat-form-field>
            {{'profile.leader' | translate }}
          <div class="pc">
          <span *ngIf = "!mod"> {{profileData.leader}}</span>
          <span *ngIf = "mod">
             <input matInput
                    class="input"
                    type=text
                    formControlName = "leader"
                    [(ngModel)] = "profileData.leader">
          </span>
          </div>
      </mat-form-field>
      <br>
      <mat-form-field>
      {{'profile.position' | translate }}
          <div class="pc">
          <span *ngIf = "!mod"> {{profileData.position}}</span>
          <span *ngIf = "mod">
             <input matInput
                    class="input"
                    type=text
                    formControlName = "position"
                    [(ngModel)] = "profileData.position">
          </span>
          </div>
      </mat-form-field>
      <br>
       <mat-form-field>
            {{'profile.dateOfEntry' | translate }}
              <div class="pc">
              <span *ngIf = "!mod"> {{profileData.dateOfEntry | date: "yyyy-MM-dd" }}</span>
          <span *ngIf = "mod">
             <input matInput
                    class="input"
                    type = "date"
                    formControlName = "dateOfEntry"
                    [(ngModel)] = "profileData.dateOfEntry">
          </span>
        </div>
        </mat-form-field>
        </div>
        </mat-dialog-content>
        <mat-dialog-actions>
          <button *ngIf = "!mod" mat-stroked-button (click) = Modify()
            align="center">{{'profile.modify' | translate}}</button>
          <button *ngIf = "!mod" mat-stroked-button (click) = Close()
            align="center">{{'profile.close' | translate}}</button>
          <button *ngIf = "mod" mat-stroked-button (click) = Save()
            align="center">{{'profile.save' | translate}}</button>
          <button *ngIf = "mod" mat-stroked-button (click) = Close()
            align="center">{{'profile.cancel' | translate}}</button>

        </mat-dialog-actions>
</form>
    `
})

export class ProfilViewDialog {
  public editForm: FormGroup;
  public mod: boolean = false;

  constructor(private readonly api: ApiCommunicationService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<ProfilViewDialog>) {
    this.profile$ = this.api.profile()
      .getProfile(this.profileData.userId);
  }

  public ngOnInit() {
    this.editForm = new FormGroup({
      dateOfBirth: new FormControl(),
      dateOfEntry: new FormControl(),
      department: new FormControl(),
      firstname: new FormControl(),
      lastname: new FormControl(),
      leader: new FormControl(),
      position: new FormControl(),
      team: new FormControl()
    });
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
    this.mod = true;
  }
  protected Save() {
    // post
    console.log(this.profileData);
  }
}
