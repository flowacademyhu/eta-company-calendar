import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-profile-description',

  template: `
  <div class="container">
  <div class="row">
  <mat-card class="example-card">
      <mat-card-header>
      <div mat-card-avatar class="example-header-image"></div>
        <mat-card-title>Profil megtekintése</mat-card-title>
<mat-card-subtitle>{{ profile.firstName }}</mat-card-subtitle>
      </mat-card-header>
        <mat-card-content>
        <p>
          Munkakör:
        </p>
        <p>
          Beosztás:
        </p>
        <p>
          Részleg:
        </p>
        <p>
          Vezető:
        </p>
      </mat-card-content>
    <mat-card-actions>
      <button mat-button>Bezár</button>
      <button mat-button>Módosít</button>
    </mat-card-actions>
  </mat-card>
  </div>
  <div>

   `
})

export class ProfileDescriptionComponent implements OnInit {

  public ngOnInit(): void {
    // tslint:disable-next-line:no-console
    console.log('ok');
    this.api.profile()
      .test();
  }

  public language: string;
  public profile: Profile;
  public profile$: Observable<Profile>;
  // tslint:disable-next-line: typedef
  public id = 2;

  constructor(private readonly api: ApiCommunicationService) {
    // tslint:disable-next-line:newline-per-chained-call
    this.profile$ = this.api.profile().getProfile(this.id);
  }
}
