import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { MeetingDetail } from '~/app/models/meeting-detail.model';
import { MeetingService } from '~/app/my-meetings/service/meeting.service';
import { MeetingDetailsModal } from '~/app/shared/modals/meeting-details.component.ts';
import { AuthService } from '~/app/shared/services/auth.service';

@Component({
  selector: 'app-my-meetings-description',
  styles: [
  'table { width: 85%; }',
  'th.mat-header-cell {text-align: center;}',
  'td.mat-cell {text-align: center;}',
],
  template: `
	<div class="row justify-content-center" mt-4>
  <table mat-table [dataSource]="meetings$ | async" class="mat-elevation-z8">

  <ng-container matColumnDef="date">
    <th mat-header-cell *matHeaderCellDef class="text-center">{{ 'meetinglist.date' | translate }}</th>
    <td mat-cell *matCellDef="let meeting">{{meeting.startingTime | date: 'yyyy-MM-dd'}}</td>
  </ng-container>

  <ng-container matColumnDef="startingTime">
    <th mat-header-cell *matHeaderCellDef class="text-center">{{ 'meetinglist.startingTime' | translate }}</th>
    <td mat-cell *matCellDef="let meeting">{{meeting.startingTime | date: 'HH:mm'}}</td>
  </ng-container>

  <ng-container matColumnDef="finishTime">
    <th mat-header-cell *matHeaderCellDef class="text-center">{{ 'meetinglist.finishTime' | translate }}</th>
    <td mat-cell *matCellDef="let meeting">{{meeting.finishTime | date: 'HH:mm'}}</td>
  </ng-container>

  <ng-container matColumnDef="title">
    <th mat-header-cell *matHeaderCellDef class="text-center">{{ 'meetinglist.title' | translate }}</th>
    <td mat-cell *matCellDef="let meeting">{{meeting.title}}</td>
  </ng-container>

  <ng-container matColumnDef="description">
    <th mat-header-cell *matHeaderCellDef class="text-center">{{ 'meetinglist.details' | translate }}</th>
    <td mat-cell *matCellDef="let meeting">

    <button mat-icon-button matTooltip="{{ 'meetinglist.details' | translate }}" (click)="openDialog(meeting)">
		  <mat-icon>
         library_books
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
export class MyMeetingsDescriptionComponent implements OnInit {

  protected meetings$: Observable<MeetingDetail[]>;
  public displayedColumns: string[] = ['date', 'startingTime', 'finishTime', 'title', 'description'];

  constructor(private readonly meetingService: MeetingService,
              private readonly auth: AuthService,
              private readonly dialog: MatDialog) {}

  public ngOnInit() {
    this.meetingService.getMeetingsByInvitation(this.auth.tokenDetails.getValue().id);
    this.meetings$ = this.meetingService.meetingSub;
  }

  public openDialog(meetingData: MeetingDetail): void {
    this.dialog.open(MeetingDetailsModal, {
      width: '400px',
      data: meetingData
    });
  }
}
