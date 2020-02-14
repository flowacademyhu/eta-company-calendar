import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { Profile } from '../../../models/profile.model';

@Component({
  selector: 'app-profile-description',
  styleUrls: ['profile-description.component.scss'],
  template: `
      <div class="profile-wrapper">
  <mat-card class="box" color = "primary">
    <mat-card-header>
      <mat-card-title class="title">Profil</mat-card-title>
    </mat-card-header>

    <mat-card-content>
      <mat-form-field class="profile-full-width">
        {{ "profile.name" | translate }}
        <div class="pc">{{lastName}} {{firstName}}</div>
      </mat-form-field>
      <br />
      <mat-form-field class="profile-full-width">
        {{ "profile.department" | translate }}
        <div class="pc">{{department}}</div>
      </mat-form-field>
      <mat-form-field class="profile-full-width">
        {{ "profile.team" | translate }}
        <div class="pc">{{team}}</div>
      </mat-form-field>
      <br />
      <mat-form-field class="profile-full-width">
        {{ "profile.position" | translate }}

        <div class="pc">{{position}}</div>
      </mat-form-field>
      <br />
      <mat-form-field class="profile-full-width">
        {{ "profile.leader" | translate }}
        <div class="pc">{{leader}}</div>
      </mat-form-field>
      <br />
      <mat-form-field class="profile-full-width">
        {{ "profile.dateOfBirth" | translate }}
        <div class="pc">{{dateOfBirth | date: 'yyyy-MM-dd'}}</div>
      </mat-form-field>
      <br />
      <mat-form-field class="profile-full-width">
        {{ "profile.dateOfEntry" | translate }}
        <div class="pc">{{dateOfEntry | date: 'yyyy-MM-dd'}}</div>
      </mat-form-field>

    </mat-card-content>
    <mat-card-actions>
      <a routerLink = ''>
      <button mat-stroked-button>
        {{ "profile.close" | translate }}
      </button>
    </a>
    </mat-card-actions>
  </mat-card>
</div>
  `
})

export class ProfileDescriptionComponent implements OnInit {

  constructor(private readonly api: ApiCommunicationService) {
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

  public ngOnInit(): void {
  }
  public profile$: Observable<Profile>;

}
