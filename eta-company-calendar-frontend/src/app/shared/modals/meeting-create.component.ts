import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-meeting-create',
  templateUrl: 'meeting-create.component'
})

export class MeetingCreateComponent {

  constructor(public dialogRef: MatDialogRef<MeetingCreateComponent>) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
