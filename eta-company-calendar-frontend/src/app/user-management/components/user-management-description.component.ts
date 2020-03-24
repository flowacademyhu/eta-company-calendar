import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UserResponse } from '~/app/models/user-response.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { AuthService } from '~/app/shared/services/auth.service';
import { DeleteUserComponent } from '../modals/delete-user.component';
import { EditUserComponent } from '../modals/edit-user.component';
import { NewUserComponent } from '../modals/new-user.component';
import { UserService } from '../service/user-service';

@Component({
  selector: 'app-user-management-description',
  styles: [
    'mat-card { width: 85%; background-color: rgb(230, 230, 240); }',
    'table { width: 85%; }',
    'mat-paginator { width: 85%; background-color: rgb(230, 230, 240); }',
    'th.mat-header-cell:first-child, mat-cell:first-child {width:25%;}',
    'th.mat-header-cell:nth-child(2), mat-cell:nth-child(2) {width:25%;}',
    'th.mat-header-cell:nth-child(3), mat-cell:nth-child(3) {width:25%;}',
    'th.mat-header-cell:last-child, mat-cell:last-child {width:10%;}',
  ],
  template: `
  <div class="row justify-content-center mt-2">
    <mat-card style="width:85%">
      <div class="pl-2 d-flex justify-content-between">
        <h3>{{'userlist.title' | translate | uppercase }}</h3>
        <div>
        <button matTooltip="{{ 'newuserform.new_user' | translate }}" mat-icon-button (click)="openDialog()">
          <mat-icon color="primary">
            person_add
          </mat-icon>
          </button>
          <mat-form-field>
            <input matInput type="text" (keyup)="doFilter($event.target.value)"
              placeholder="{{ 'meetinglist.filter' | translate}}">
          </mat-form-field>
        </div>
        </div>
    </mat-card>
  </div>

  <div class="pt-1 row justify-content-center">
  <table mat-table [dataSource]="dataSource" matSort matSortActive="name"
    matSortDirection="desc" class="mat-elevation-z8">

  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef  class="column" mat-sort-header> {{'userlist.name' | translate}} </th>
    <td mat-cell *matCellDef="let user"> {{user.name}} </td>
  </ng-container>

  <ng-container matColumnDef="email">
    <th mat-header-cell *matHeaderCellDef  class="column" mat-sort-header> {{'userlist.email' | translate}} </th>
    <td mat-cell *matCellDef="let user"> {{user.email}} </td>
  </ng-container>

  <ng-container matColumnDef="role">
    <th mat-header-cell *matHeaderCellDef  class="column" mat-sort-header> {{'userlist.role' | translate}} </th>
    <td mat-cell *matCellDef="let user"> {{user.role}} </td>
  </ng-container>

  <ng-container matColumnDef="leader">
    <th mat-header-cell *matHeaderCellDef  class="column" mat-sort-header> {{'userlist.leader' | translate}} </th>
    <td mat-cell *matCellDef="let user"> {{user.leaderName}} </td>
  </ng-container>

  <ng-container matColumnDef="action" >
    <th mat-header-cell *matHeaderCellDef class="text-center">{{'userlist.action' | translate}}</th>
    <td mat-cell *matCellDef="let user">

     <button mat-icon-button matTooltip="{{ 'userlist.edit' | translate }}"
      (click)="openDialogUpdate(user)">
    <mat-icon color="primary">
      create
    </mat-icon>
    </button>

    <button mat-icon-button [disabled]="loggedInUser.id === user.id"
      matTooltip="{{ 'userlist.delete' | translate }}" color="warn" (click)="openDialogDelete(user.id)">
    <mat-icon aria-label="Delete Icon">
      delete
    </mat-icon>
     </button>
    </td>

  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
<mat-paginator class="mat-elevation-z8"
  [pageSize]="10"
  [pageSizeOptions]="[5, 10, 20, 50]"
  showFirstLastButtons
  >
</mat-paginator>
</div>
  `,
})
export class UserManagementDescriptionComponent {
  protected loggedInUser: UserResponse;
  protected users$: Observable<UserResponse[]>;
  public displayedColumns: string[] = ['name', 'email', 'role', 'leader', 'action' ];
  public dataSource: MatTableDataSource<UserResponse> = new MatTableDataSource<UserResponse>();

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;

  constructor(private readonly auth: AuthService,
              private readonly api: ApiCommunicationService,
              private readonly userService: UserService,
              private readonly snackBar: MatSnackBar,
              private readonly dialog: MatDialog) {
                this.users$ = this.api.user()
                .getAllUsers();
              }

  public ngOnInit() {
    this.setLoggedInUser();
    this.userService.getAllUsers();
    this.dataSource.paginator = this.paginator;
    this.userService.userSub
    .subscribe((users) => this.dataSource.data = users);
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim()
     .toLocaleLowerCase();
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

  public openDialogDelete(id: number): void {
    this.dialog.open(DeleteUserComponent, {
      data: id,
      width: '400px',
    });
  }

  public openDialog(): void {
    this.dialog.open(NewUserComponent, {
      width: '400px',
    });
  }

  private setLoggedInUser() {
    const tokenDetails = this.auth.tokenDetails.getValue();
    this.loggedInUser = {
      email: tokenDetails.user_name,
      id: tokenDetails.id,
      role: tokenDetails.authorities[0]
    };
  }

}
