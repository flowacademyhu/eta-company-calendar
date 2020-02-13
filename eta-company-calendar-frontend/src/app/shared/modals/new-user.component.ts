import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'dialog-overview-example-dialog',
    template: `
    <h1 mat-dialog-title>Hi World</h1>`,
  })
  export class NewUserComponent {

    constructor(
      public dialogRef: MatDialogRef<NewUserComponent>) {}

    public onNoClick(): void {
      this.dialogRef.close();
    }

  }
