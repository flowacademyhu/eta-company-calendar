import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { UserResponse } from '~/app/models/user-response.model';
import { ProfilViewDialog } from '~/app/shared/modals/profil-view-dialog.component';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { DeleteUserComponent } from '../modals/delete-user.component';
import { EditUserComponent } from '../modals/edit-user.component';
import { UserService } from '../service/user-service';

@Component({
  selector: 'app-user-list',
  styles: ['table { width: 85%; }', 'th.mat-header-cell {text-align: center;}', 'td.mat-cell {text-align: center;}' ],
  template: `
  <div class="row justify-content-center">
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

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
<mat-paginator
  [pageSize]="5"
  [pageSizeOptions]="[5, 10, 20]"
  showFirstLastButton>
</mat-paginator>
</div>
  `,
})
export class UserListComponent implements OnInit {
  protected users$: Observable<UserResponse[]>;
  public displayedColumns: string[] = ['id', 'email', 'role', 'action' ];
  public dataSource: MatTableDataSource<UserResponse> = new MatTableDataSource<UserResponse>();
  public dataSub: Subscription;

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;

  constructor(private readonly api: ApiCommunicationService,
              private readonly userService: UserService,
              private readonly snackBar: MatSnackBar,
              private readonly dialog: MatDialog) {
                this.users$ = this.api.user()
                .getAllUsers();
              }

  public ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSub = this.userService.getAllUsersForPagination()
      .subscribe((res) => {
        this.dataSource.data = (res as unknown as UserResponse[]);
      });
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public ngOnDestroy(): void {
    this.dataSub.unsubscribe();
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
