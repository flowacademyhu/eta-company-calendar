import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { Profile } from '../../models/profile.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-description',

  templateUrl: 'profile-description.component.html'
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
