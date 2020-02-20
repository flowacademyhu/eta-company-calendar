import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewUserComponent } from '~/app/user-management/modals/new-user.component';

@Component({
  selector: 'app-user-management-description',
  template: `
  <button mat-raised-button (click)="openDialog()">{{'newuserform.button' | translate }}</button>
  <br>
  <button mat-raised-button (click)="listusers()">{{'userlist.button' | translate }}</button>
  <div *ngIf="showlist"><app-user-list></app-user-list></div>
  `,
})
export class UserManagementDescriptionComponent {

  constructor(private readonly dialog: MatDialog) { }
  private showlist: boolean = false;

  public openDialog(): void {
    this.dialog.open(NewUserComponent, {
      width: '400px',
    });
  }

  public listusers() {
    if (this.showlist === false) {
      this.showlist = true;
    } else { this.showlist = false; }
  }

}
