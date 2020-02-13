import { Component } from '@angular/core';
import { SharedModule } from '~/app/shared/shared.module';

@Component({
  selector: 'app-newuser',
  template: `<button mat-raised-button (click)="openDialog()">New User<button>`,
})
export class NewuserComponent {

  constructor(public dialog: SharedModule) {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
