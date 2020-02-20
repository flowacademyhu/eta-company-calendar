import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewUserComponent } from '~/app/user-management/modals/new-user.component';

@Component({
  selector: 'app-user-management-description',
  styles: [`.sidenav-container {
    height: 500px;
  }
    mat-sidenav {
      width: 220px
    }
  `,
  ],
  template: `
  <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened>
        <mat-nav-list>
          <a mat-list-item (click)="openDialog()">{{'usermanagement.new_user' | translate}} </a>
          <a mat-list-item>{{'usermanagement.list_users' | translate}}</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content >
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class UserManagementDescriptionComponent {

  constructor(private readonly dialog: MatDialog) { }

  public openDialog(): void {
    this.dialog.open(NewUserComponent, {
      width: '400px',
    });
  }
}
