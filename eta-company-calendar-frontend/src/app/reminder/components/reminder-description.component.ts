import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { Reminder } from '~/app/models/reminder.model';
import { ReminderService } from '~/app/reminder/service/reminder.service';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { AuthService } from '~/app/shared/services/auth.service';
import { MeetingDetailsModal } from '~/app/shared/modals/meeting-details.component';

@Component({
  selector: 'app-my-meetings-description',
  styles: [
    'table { width: 85%; }',
    'mat-paginator { width: 85%; }',
    'th.mat-header-cell {text-align: center;}',
    'td.mat-cell {text-align: center;}',
  ],
  template: `
  <div class="row justify-content-center mt-2">
    <mat-card style="width:85%">
      <div class="pl-4 d-flex justify-content-between">
        <h3 class="ml-5" >{{'reminderlist.myReminders' | translate | uppercase}}</h3>
          <mat-form-field>
            <input matInput type="text"  (keyup)="doFilter($event.target.value)"
              placeholder="{{ 'meetinglist.filter' | translate}}">
          </mat-form-field>
      </div>
    </mat-card>
  </div>

  <div class="pt-1 row justify-content-center">

  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

  <ng-container matColumnDef="date">
    <th mat-header-cell *matHeaderCellDef> {{'reminderlist.date' | translate}} </th>
    <td mat-cell *matCellDef="let reminder"> {{reminder.startingTime | date: ' yyyy-MM-dd' }} </td>
  </ng-container>

  <ng-container matColumnDef="startingTime">
    <th mat-header-cell *matHeaderCellDef> {{'reminderlist.startingTime' | translate}} </th>
    <td mat-cell *matCellDef="let reminder"> {{reminder.startingTime | date: ' HH:mm' }} </td>
  </ng-container>

  <ng-container matColumnDef="endingTime">
    <th mat-header-cell *matHeaderCellDef> {{'reminderlist.endingTime' | translate}} </th>
    <td mat-cell *matCellDef="let reminder"> {{reminder.endingTime | date: ' HH:mm'}} </td>
  </ng-container>

  <ng-container matColumnDef="title">
    <th mat-header-cell *matHeaderCellDef> {{'reminderlist.title' | translate}} </th>
    <td mat-cell *matCellDef="let reminder"> {{reminder.title}} </td>
  </ng-container>

  <ng-container matColumnDef="action">
    <th mat-header-cell *matHeaderCellDef class="text-center" mat-sort-header>
      {{ 'userlist.action' | translate }}</th>
    <td mat-cell *matCellDef="let reminder">

    <button mat-icon-button (click)="openDialog(reminder)">
		  <mat-icon>
         library_books
      </mat-icon>
    </button>
    <button mat-icon-button color="warn" (click)="openDialog(reminder)">
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
        [pageSize]="5"
        [pageSizeOptions]="[5, 10, 20, 50]"
        showFirstLastButtons>
  </mat-paginator>
</div>
  `,
})

export class ReminderDescriptionComponent implements OnInit, OnDestroy, AfterViewInit {

  protected reminders$: Observable<Reminder[]>;
  public displayedColumns: string[] = ['date', 'startingTime', 'endingTime', 'title', 'action'];
  public dataSource: MatTableDataSource<Reminder> = new MatTableDataSource<Reminder>();
  public dataSub: Subscription;

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
    this.dataSource.paginator = this.paginator;
    this.dataSub = this.reminderService.getRemindersByUserId(this.auth.tokenDetails.getValue().id)
      .subscribe((res) => {
        this.dataSource.data = (res as unknown as Reminder[]);
      });
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim()
     .toLocaleLowerCase();
  }

  public ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }

  public openDialog(reminderData: Reminder): void {
    this.dialog.open(MeetingDetailsModal, {
      width: '400px',
      data: reminderData
    });
  }
}
