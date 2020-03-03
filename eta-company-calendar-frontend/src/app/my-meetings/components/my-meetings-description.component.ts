import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { MeetingDetail } from '~/app/models/meeting-detail.model';
import { MeetingService } from '~/app/my-meetings/service/meeting.service';
import { DeleteMeetingComponent } from '~/app/shared/modals/delete-meeting.component';
import { MeetingDetailsModal } from '~/app/shared/modals/meeting-details.component.ts';
import { AuthService } from '~/app/shared/services/auth.service';
import { ApiCommunicationService } from './../../shared/services/api-communication.service';

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
        <h3 class="ml-5" >{{'meetinglist.myMeetings' | translate | uppercase }}</h3>
          <mat-form-field>
            <input matInput type="text" (keyup)="doFilter($event.target.value)"
              placeholder="{{ 'meetinglist.filter' | translate}}">
          </mat-form-field>
      </div>
    </mat-card>
  </div>

<div class="pt-1 row justify-content-center">

  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

  <ng-container matColumnDef="date">
    <th mat-header-cell *matHeaderCellDef class="text-center" mat-sort-header>{{ 'meetinglist.date' | translate }}</th>
    <td mat-cell *matCellDef="let meeting">{{meeting.startingTime | date: 'yyyy-MM-dd'}}</td>
  </ng-container>

  <ng-container matColumnDef="startingTime">
    <th mat-header-cell *matHeaderCellDef class="text-center" mat-sort-header>
      {{ 'meetinglist.startingTime' | translate }}</th>
    <td mat-cell *matCellDef="let meeting">{{meeting.startingTime | date: 'HH:mm'}}</td>
  </ng-container>

  <ng-container matColumnDef="finishTime">
    <th mat-header-cell *matHeaderCellDef class="text-center" mat-sort-header>
      {{ 'meetinglist.finishTime' | translate }}</th>
    <td mat-cell *matCellDef="let meeting">{{meeting.finishTime | date: 'HH:mm'}}</td>
  </ng-container>

  <ng-container matColumnDef="title">
    <th mat-header-cell *matHeaderCellDef class="text-center" mat-sort-header>
      {{ 'meetinglist.title' | translate }}</th>
    <td mat-cell *matCellDef="let meeting">{{meeting.title}}</td>
  </ng-container>

  <ng-container matColumnDef="action">
    <th mat-header-cell *matHeaderCellDef class="text-center" mat-sort-header>
      {{ 'userlist.action' | translate }}</th>
    <td mat-cell *matCellDef="let meeting">

    <button mat-icon-button matTooltip="{{ 'meetinglist.details' | translate }}"
      (click)="openDialog(meeting)">
		  <mat-icon>
         library_books
      </mat-icon>
    </button>
    <button mat-icon-button matTooltip="{{ 'meetinglist.delete' | translate }}"
      color="warn" (click)="openDialogDelete(meeting.id)">
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
export class MyMeetingsDescriptionComponent implements OnInit, AfterViewInit  {

  protected meetings$: Observable<MeetingDetail[]>;
  public displayedColumns: string[] = ['date', 'startingTime', 'finishTime', 'title', 'action'];
  public dataSource: MatTableDataSource<MeetingDetail> = new MatTableDataSource<MeetingDetail>();

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;

  constructor(private readonly api: ApiCommunicationService,
              private readonly meetingService: MeetingService,
              private readonly auth: AuthService,
              private readonly dialog: MatDialog) {
                this.meetings$ = this.api.meeting()
                .getMeetingsByInvitation(this.auth.tokenDetails.getValue().id);
              }

  public ngOnInit() {
    this.meetingService.getMeetingsByInvitation(this.auth.tokenDetails.getValue().id);
    this.dataSource.paginator = this.paginator;
    this.meetingService.meetingSub
    .subscribe((meetings) => this.dataSource.data = meetings);
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
  this.dataSource.filter = value.trim()
   .toLocaleLowerCase();
  }

  public openDialog(meeting: MeetingDetail): void {
    this.dialog.open(MeetingDetailsModal, {
      width: '400px',
      data: { meetingData: meeting, meetingId: meeting.id }
    });
  }

  public openDialogDelete(id: number): void {
    this.dialog.open(DeleteMeetingComponent, {
      data: id,
      width: '400px',
    });
  }
}
