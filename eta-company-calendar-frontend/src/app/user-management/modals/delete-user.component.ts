import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../service/user-service';

@Component({
    selector: 'delete-user-dialog',
    styles: [`
    button {
      border: 2px solid;
      border-color: black !important;
    }
    .cancel-button {
      margin-left: 53%;
    }
  `],
    template: `
    <div>
    <h1 align="center" mat-dialog-title>{{'deleteuser.title' | translate | uppercase}}</h1>
    <mat-dialog-content align="center">{{'deleteuser.question' | translate}}</mat-dialog-content>
    <br>
      <button mat-raised-button type="button" (click)="onSubmit()">
      {{'deleteuser.confirm' | translate}}</button>
      <button mat-raised-button type="button" name="cancel" (click)="onNoClick()"
        class="cancel-button">{{'deleteuser.cancel' | translate}}</button>
    </div>`,
  })

  export class DeleteUserComponent {

    constructor(@Inject(MAT_DIALOG_DATA)
                private readonly id: number,
                public readonly dialogRef: MatDialogRef<DeleteUserComponent>,
                public readonly userService: UserService,
                private readonly snackBar: MatSnackBar,
                private readonly translate: TranslateService,
                ) {}

    public onNoClick(): void {
      this.dialogRef.close();
    }

    public openSnackBar(message: string) {
      this.snackBar.open(`${message}`, undefined, {
      duration: 2000
      });
    }

    protected onSubmit() {
      this.userService.deleteUser(this.id)
            .subscribe(() => {this.openSnackBar(this.translate.instant('deleteuser.snack_delete'));
                              this.userService.getAllUsers();
                              this.dialogRef.close(); },
            () => {this.openSnackBar(
              this.translate.instant('deleteuser.snack_delete_error'));
              });
    }

  }
