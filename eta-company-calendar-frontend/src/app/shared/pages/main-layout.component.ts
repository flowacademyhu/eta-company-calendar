import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MeetingCreateComponent } from '../modals/meeting-create.component';
import { ConfigurationService } from './../services/configuration.service';

@Component({
  selector: 'app-welcome-layout',
  template: `
    <div class="container">
      <app-header *ngIf="checkToken()"></app-header>
      <button (click)="testMeetingCreate()"> test meeting create</button>
      <router-outlet></router-outlet>
      <app-footer *ngIf="checkToken()"></app-footer>
    </div>
  `
})

export class MainLayoutComponent {

  constructor(private readonly config: ConfigurationService, private readonly dialog: MatDialog) { }

  protected checkToken() {
    return !!this.config.fetchToken('access_token');
  }

  protected testMeetingCreate() {
    this.dialog.open(MeetingCreateComponent, {
      width: '250px',
    });
  }

}
