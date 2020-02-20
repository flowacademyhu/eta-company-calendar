import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { UserResponse } from '~/app/models/user-response.model';
import { UserService } from '../service/user-service';

@Component({
  selector: 'app-user-list',
  styles: ['table { width: 85%; }', 'th.mat-header-cell {text-align: center;}', 'td.mat-cell {text-align: center;}' ],
  template: `
  <div class="row justify-content-center mt-4">
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
          <button mat-icon-button>
          <mat-icon aria-label="User">
            perm_identity
          </mat-icon>
          </button>
           <button mat-icon-button>
          <mat-icon aria-label="Create">
            create
          </mat-icon>
          </button>
          <button mat-icon-button (click)="deleteUser(user.id)">
          <mat-icon aria-label="Delete Icon">
            delete
          </mat-icon>
           </button>
          </td>
        </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
</div>
  `,
})
export class UserListComponent implements OnInit {
  protected users$: Observable<UserResponse[]>;
  public displayedColumns: string[] = ['id', 'email', 'role', 'action'];

  constructor(private readonly userService: UserService,
              private readonly snackBar: MatSnackBar,
              private readonly translate: TranslateService, ) { }

  public ngOnInit() {
    this.userService.getAllUsers();
    this.users$ = this.userService
    .userSub;
  }

  public deleteUser(userId: number) {
    this.userService.deleteUser(userId)
            .subscribe(() => {this.openSnackBar(this.translate.instant('userlist.snack_delete'));
                              this.userService.getAllUsers(); },
            () => {this.openSnackBar(
              this.translate.instant('userlist.snack_delete_error'));
              });
  }

  public openSnackBar(message: string) {
    this.snackBar.open(`${message}`, undefined, {
    duration: 2000
    });
  }

}
