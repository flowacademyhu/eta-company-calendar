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
<form [formGroup]="editForm" (ngSubmit)= "onSubmit()" >
  <h1 style="text-align:center;">{{'profile.view' | translate}}</h1>
    <mat-dialog-content class="dialogview mb-5">
      <div class="personal">
        <span *ngIf = "!mod">
          {{'profile.lastname' | translate }}
          <div class="pc">
             {{profileData.lastName}}
          </div>
        </span>
        <span *ngIf = "mod">
          <mat-form-field>
            <mat-label>{{'profile.lastname' | translate }}</mat-label>
              <div class="pc">
             <input matInput
                [(ngModel)] = "profileData.lastName"
                class="form-control"
                formControlName = "lastname">
              </div>
            </mat-form-field>
        </span>
        <br>
        <span *ngIf = "!mod">
          {{'profile.firstname' | translate }}
          <div class="pc">
             {{profileData.firstName}}
          </div>
        </span>
        <span *ngIf = "mod">
          <mat-form-field>
            <mat-label>{{'profile.firstname' | translate }}</mat-label>
              <div class="pc">
             <input matInput
                [(ngModel)] = "profileData.firstName"
                class="form-control"
                formControlName = "firstname">
              </div>
            </mat-form-field>
        </span>
        <br>
        <span *ngIf = "!mod">
          {{'profile.dateOfBirth' | translate }}
          <div class="pc">
             {{profileData.dateOfBirth | date: 'yyyy-MM-dd'}}
          </div>
        </span>
        <br>
        <span *ngIf = "mod">
          <mat-form-field>
            <mat-label>{{'profile.dateOfBirth' | translate }}</mat-label>
              <div class="pc">
             <input matInput
                [(ngModel)] = "profileData.dateOfBirth"
                class="form-control"
                formControlName = "dateOfBirth">
              </div>
            </mat-form-field>
        </span>
        <br>
        </div>
      <div class="divider"> </div>
    <div class="workdata">
      <span *ngIf = "!mod">
          {{'profile.department' | translate }}
          <div class="pc">
             {{profileData.department}}
          </div>
        </span>
        <span *ngIf = "mod">
          <mat-form-field>
            <mat-label>{{'profile.department' | translate }}</mat-label>
              <div class="pc">
             <input matInput
                [(ngModel)] = "profileData.department"
                class="form-control"
                formControlName = "department">
              </div>
            </mat-form-field>
        </span>
        <br>
        <span *ngIf = "!mod">
          {{'profile.team' | translate }}
          <div class="pc">
             {{profileData.team}}
          </div>
        </span>
        <span *ngIf = "mod">
          <mat-form-field>
            <mat-label>{{'profile.team' | translate }}</mat-label>
              <div class="pc">
             <input matInput
                [(ngModel)] = "profileData.team"
                class="form-control"
                formControlName = "team">
              </div>
            </mat-form-field>
        </span>
        <br>
        <span *ngIf = "!mod">
          {{'profile.leader' | translate }}
          <div class="pc">
             {{profileData.leader}}
          </div>
        </span>
        <span *ngIf = "mod">
          <mat-form-field>
            <mat-label>{{'profile.leader' | translate }}</mat-label>
              <div class="pc">
             <input matInput
                [(ngModel)] = "profileData.leader"
                class="form-control"
                formControlName = "leader">
              </div>
            </mat-form-field>
        </span>
        <span *ngIf = "!mod">
          {{'profile.position' | translate }}
          <div class="pc">
             {{profileData.position}}
          </div>
        </span>
        <span *ngIf = "mod">
          <mat-form-field>
            <mat-label>{{'profile.position' | translate }}</mat-label>
              <div class="pc">
             <input matInput
                [(ngModel)] = "profileData.position"
                class="form-control"
                formControlName = "position">
              </div>
            </mat-form-field>
        </span>
        <br>
        <span *ngIf = "!mod">
          {{'profile.dateOfEntry' | translate }}
          <div class="pc">
             {{profileData.dateOfEntry  | date: 'yyyy-MM-dd'}}
          </div>
        </span>
        <span *ngIf = "mod">
          <mat-form-field>
            <mat-label>{{'profile.dateOfEntry' | translate }}</mat-label>
              <div class="pc">
              <input matInput
              [(ngModel)] = "profileData.dateOfEntry"
                class="form-control"
                formControlName = "dateOfEntry"
                >
              </div>
            </mat-form-field>
        </span>
    </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button *ngIf = "!mod" mat-stroked-button (click) = Modify()
          align="center">{{'profile.modify' | translate}}</button>
      <button *ngIf = "!mod" mat-stroked-button (click) = Close()
          align="center">{{'profile.close' | translate}}</button>
    <button *ngIf = "mod" mat-stroked-button
          align="center" type="submit">{{'profile.save' | translate}}</button>
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
  // test data
  public profileData: Profile = {
    dateOfBirth: new Date('1992-03-13'),
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
  protected onSubmit() {
    // post
    console.log(this.profileData);
    this.Close();
  }
}
