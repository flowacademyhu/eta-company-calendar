import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UserResponse } from '~/app/models/user-response.model';
import { ProfilViewDialog } from '~/app/shared/modals/profil-view-dialog.component';
import { DeleteUserComponent } from '../modals/delete-user.component';
import { EditUserComponent } from '../modals/edit-user.component';
import { UserService } from '../service/user-service';

@Component({
  selector: 'app-user-list',
  styles: ['table { width: 85%; }', 'th.mat-header-cell {text-align: center;}', 'td.mat-cell {text-align: center;}' ],
  template: `
  <div class="row justify-content-center">
  <table mat-table [dataSource]="users$ | async" class="mat-elevation-z8">

  <ng-container matColumnDef="id">
    <th mat-header-cell *matHeaderCellDef> {{'userlist.id' | translate}} </th>
    <td mat-cell *matCellDef="let user"> {{user.id}} </td>
  </ng-container>

  <ng-container matColumnDef="email">
    <th mat-header-cell *matHeaderCellDef> {{'userlist.email' | translate}} </th>
    <td mat-cell *matCellDef="let user"> {{user.email}} </td>
  </ng-container>

  <ng-container matColumnDef="role">
    <th mat-header-cell *matHeaderCellDef> {{'userlist.role' | translate}} </th>
    <td mat-cell *matCellDef="let user"> {{user.role}} </td>
  </ng-container>

  <ng-container matColumnDef="action" >
    <th mat-header-cell *matHeaderCellDef class="text-center">{{'userlist.action' | translate}}</th>
    <td mat-cell *matCellDef="let user">
    <button mat-icon-button (click)="openDialogProfile(user.id)">
    <mat-icon aria-label="User">
      perm_identity
    </mat-icon>

    </button>
     <button mat-icon-button (click)="openDialogUpdate(user)">
    <mat-icon aria-label="Update">
      create
    </mat-icon>
    </button>

    <button mat-icon-button color="warn" (click)="openDialogDelete(user.id)">
    <mat-icon aria-label="Delete Icon">
      delete
    </mat-icon>
     </button>
    </td>

  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
<mat-paginator [length]="100"
[pageSize]="10"
[pageSizeOptions]="[5, 10, 25, 100]">
</mat-paginator>
</div>
  `,
})
export class UserListComponent implements OnInit {
  protected users$: Observable<UserResponse[]>;
  public displayedColumns: string[] = ['id', 'email', 'role', 'action' ];

  constructor(private readonly userService: UserService,
              private readonly snackBar: MatSnackBar,
              private readonly dialog: MatDialog,
              ) { }

  public ngOnInit() {
    this.userService.getAllUsers();
    this.users$ = this.userService
    .userSub;
  }

  public openSnackBar(message: string) {
    this.snackBar.open(`${message}`, undefined, {
    duration: 2000
    });
  }

  public openDialogUpdate(user: UserResponse ): void {
    this.dialog.open(EditUserComponent, {
      data: user,
      width: '400px',
    });
  }

  public openDialogProfile(id: number) {
    this.dialog.open(ProfilViewDialog, {
      data: id, });
    }

  public openDialogDelete(id: number): void {
    this.dialog.open(DeleteUserComponent, {
      data: id,
      width: '400px',
    });
  }

}
