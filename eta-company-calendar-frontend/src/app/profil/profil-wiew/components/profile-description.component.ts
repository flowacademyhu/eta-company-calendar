import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
        {{ "profile.name" | translate }}:
        <hr>
        <div class="pc">Kovács Lajos</div>
      </mat-form-field>
      <br />
      <mat-form-field class="profile-full-width">
        {{ "profile.department" | translate }}:
        <hr>
        <div class="pc">Pénzügy</div>
      </mat-form-field>
      <mat-form-field class="profile-full-width">
        {{ "profile.team" | translate }}:
        <hr>
        <div class="pc">Könyvelés</div>
      </mat-form-field>
      <br />
      <mat-form-field class="profile-full-width">
        {{ "profile.position" | translate }}:
        <hr>
        <div class="pc">Csoportvezető</div>
      </mat-form-field>
    </mat-card-content>
    <mat-card-actions>
      <a routerLink = ''>
      <button mat-button color="primary">
        {{ "profile.close" | translate }}
      </button>
    </a>
      <button mat-button color="warn">
        {{ "profile.modify" | translate }}
      </button>
      <button mat-button color="primary" (click)="onLanguageChange()">
        {{ "welcome.button" | translate }}
      </button>
    </mat-card-actions>
  </mat-card>
</div>
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

  constructor(private readonly api: ApiCommunicationService,
              private readonly translate: TranslateService) {
    // tslint:disable-next-line:newline-per-chained-call
    this.profile$ = this.api.profile().getProfile(this.id);
  }
  public onLanguageChange() {
    this.translate.use(this.language === 'en' ? 'hu' : 'en');
    this.language = this.translate.currentLang;
  }
}
