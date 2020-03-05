import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { ReminderDetail } from '~/app/models/reminder-detail-model';
import { ReminderService } from '~/app/reminder/service/reminder.service';
import { DeleteReminderComponent } from '~/app/shared/modals/delete-reminder.component';
import { ReminderDetailsModal } from '~/app/shared/modals/reminder-details.component';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { AuthService } from '~/app/shared/services/auth.service';

@Component({
  selector: 'app-my-reminders-description',
  styles: [
    'mat-card { width: 85%; background-color: rgb(230, 230, 240); }',
    'table { width: 85%; }',
    'mat-paginator { width: 85%; background-color: rgb(230, 230, 240); }',
  ],
  template: `
  <div class="row justify-content-center mt-2">
    <mat-card style="width:85%">
      <div class="pl-2 d-flex justify-content-between">
        <h3>{{'reminderlist.myReminders' | translate | uppercase}}</h3>
          <mat-form-field>
            <input matInput type="text" (keyup)="doFilter($event.target.value)"
              placeholder="{{ 'meetinglist.filter' | translate}}">
          </mat-form-field>
      </div>
    </mat-card>
  </div>

  <div class="pt-1 row justify-content-center">

  <table mat-table [dataSource]="dataSource" matSort matSortActive="date"
  matSortDirection="asc"
   class="mat-elevation-z8">

    <ng-container matColumnDef="date">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> {{'reminderlist.date' | translate}} </th>
      <td mat-cell *matCellDef="let reminder"> {{reminder.startingTime | date: ' yyyy-MM-dd' }} </td>
    </ng-container>

    <ng-container matColumnDef="startingTime">
      <th mat-header-cell *matHeaderCellDef> {{'reminderlist.startingTime' | translate}} </th>
      <td mat-cell *matCellDef="let reminder"> {{reminder.startingTime | date: ' HH:mm' }} </td>
    </ng-container>

    <ng-container matColumnDef="title">
      <th mat-header-cell *matHeaderCellDef> {{'reminderlist.title' | translate}} </th>
      <td mat-cell *matCellDef="let reminder"> {{reminder.title}} </td>
    </ng-container>

    <ng-container matColumnDef="action">
    <th mat-header-cell *matHeaderCellDef class="text-center">
      {{ 'userlist.action' | translate }}</th>
    <td mat-cell *matCellDef="let reminder">

    <button mat-icon-button matTooltip="{{ 'meetinglist.details' | translate }}"
      (click)="openDialog(reminder)">
		  <mat-icon color="primary">
         library_books
      </mat-icon>
    </button>
    <button mat-icon-button matTooltip="{{ 'meetinglist.delete' | translate }}"
      (click)="openDialogDelete(reminder.id)">
		  <mat-icon>
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
        showFirstLastButtons>
  </mat-paginator>
</div>
  `,
})

export class ReminderDescriptionComponent implements OnInit, AfterViewInit {

  protected reminders$: Observable<ReminderDetail[]>;
  public displayedColumns: string[] = ['date', 'startingTime', 'title', 'action'];
  public dataSource: MatTableDataSource<ReminderDetail> = new MatTableDataSource<ReminderDetail>();

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;

  constructor(private readonly api: ApiCommunicationService,
              private readonly reminderService: ReminderService,
              private readonly auth: AuthService,
              private readonly dialog: MatDialog) {
                this.reminders$ = this.api.reminder()
                .getRemindersByUserId(this.auth.tokenDetails.getValue().id);
              }

  public ngOnInit() {
    this.reminderService.getRemindersByUserId(this.auth.tokenDetails.getValue().id);
    this.dataSource.paginator = this.paginator;
    this.reminderService.reminderSub
    .subscribe((reminders) => this.dataSource.data = reminders);
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'date': return new Date(item.startingTime);
        default: return item[property];
      }
    };
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim()
     .toLocaleLowerCase();
    }

  public openDialog(reminder: ReminderDetail): void {
    this.dialog.open(ReminderDetailsModal, {
      width: '400px',
      data: reminder
    });
  }

  public openDialogDelete(id: number): void {
    this.dialog.open(DeleteReminderComponent, {
      data: id,
      width: '400px',
    });
  }

}
