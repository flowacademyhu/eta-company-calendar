import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewUserComponent } from '~/app/user-management/modals/new-user.component';

@Component({
  selector: 'app-user-management-description',
  template: `
  <h1>user management works</h1>
  <button mat-raised-button (click)="openDialog()">{{'newuserform.button' | translate }}</button>
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
