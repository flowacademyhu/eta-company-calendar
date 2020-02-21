import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from '~/app/models/meeting.model';
import { MeetingService } from '~/app/my-meetings/service/meeting.service';

@Component({
  selector: 'app-my-meetings-description',
  styles: [
  'table { width: 70%; }',
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
    <th mat-header-cell *matHeaderCellDef class="text-center">{{ 'meetinglist.description' | translate }}</th>
    <td mat-cell *matCellDef="let meeting">

    <button mat-icon-button matTooltip="{{meeting.description}}">
		  <mat-icon>
         library_books
      </mat-icon>
    </button>
    </td>
  </ng-container>

  <ng-container matColumnDef="reqAttendants">
    <th mat-header-cell *matHeaderCellDef class="text-center">{{ 'meetinglist.reqAttendants' | translate }}</th>
    <td mat-cell *matCellDef="let meeting">

    <button mat-icon-button matTooltip="{{meeting.requiredAttendants}}">
		  <mat-icon>
         people
      </mat-icon>
    </button>
    </td>
  </ng-container>

  <ng-container matColumnDef="optAttendants">
    <th mat-header-cell *matHeaderCellDef class="text-center">{{ 'meetinglist.optAttendants' | translate }}</th>
    <td mat-cell *matCellDef="let meeting">

    <button mat-icon-button matTooltip="{{meeting.optionalAttendants}}">
		  <mat-icon>
         people_outline
      </mat-icon>
    </button>
    </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;" align="center" ></tr>
 </table>
 </div>
  `,
})
export class MyMeetingsDescriptionComponent implements OnInit {

  protected meetings$: Observable<Meeting[]>;
  public displayedColumns: string[] = ['date', 'startingTime', 'finishTime', 'title', 'description', 'reqAttendants', 'optAttendants'];

  constructor(private readonly meetingService: MeetingService) {}

  public ngOnInit() {
    this.meetingService.getAllMeetings();
    this.meetings$ = this.meetingService
    .meetingSub;
  }

}
