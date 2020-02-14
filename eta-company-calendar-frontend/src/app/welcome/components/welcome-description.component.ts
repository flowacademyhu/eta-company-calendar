import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { User } from '~/app/models/placeholder-user.model';
import { NewUserComponent } from '~/app/shared/modals/new-user.component';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Component({
  selector: 'app-welcome-description',
  template: ``
})

export class WelcomeDescriptionComponent {
  public language: string;

  public users$: Observable<User[]>;

  constructor(private readonly translate: TranslateService,
              private readonly api: ApiCommunicationService,
              private readonly dialog: MatDialog) {
    this.language = this.translate.currentLang;
    this.users$ = this.api.welcome()
                          .testGet();
  }

  public onLanguageChange() {
    this.translate.use(this.language === 'en' ? 'hu' : 'en');
    this.language = this.translate.currentLang;
  }

  public openDialog(): void {
    this.dialog.open(NewUserComponent, {
      width: '300px',
    });

  }
}
