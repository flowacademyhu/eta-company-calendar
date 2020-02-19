import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MeetingCreateComponent } from '../modals/meeting-create.component';
import { ConfigurationService } from './../services/configuration.service';

@Component({
  selector: 'app-welcome-layout',
  styles: [ `
  .content {
    min-height: calc(100vh - 64px - 56px);
    margin-top: 84px;
    margin-bottom: 20px;
    }`],
  template: `
    <div class="d-flex flex-column">
      <app-header *ngIf="checkToken()"></app-header>
      <div class="content">
        <button (click)="testMeetingCreate()"> test meeting create</button>
        <router-outlet></router-outlet>
      </div>
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
