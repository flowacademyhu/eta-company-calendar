import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewUserComponent } from '~/app/user-management/modals/new-user.component';

@Component({
  selector: 'app-user-management-description',
  template: `
  <div class="row justify-content-center mt-2">
  <mat-card style="width:85%">
    <div class="d-flex justify-content-between">
    <div class="pl-4"><button mat-icon-button (click)="openDialog()">
      <mat-icon aria-label="Person Add">
      person_add
      </mat-icon></button></div>
    <div class="row justify-content-center">
      <h3>{{'userlist.title' | translate}}</h3>
    </div>
      <div class="pr-4"></div>
    </div>
    </mat-card>
  </div>
  <div><app-user-list></app-user-list></div>
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
