import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from '~/app/models/meeting.model';
import { MeetingService } from '~/app/my-meetings/service/meeting.service';

@Component({
  selector: 'app-my-meetings-description',
  styles: ['table { width: 85%; }', 'th.mat-header-cell {text-align: center;}', 'td.mat-cell {text-align: center;}' ],
  template: `
	<div class="row justify-content-center" mt-4>
  <table mat-table [dataSource]="meetings$ | async" class="mat-elevation-z8">

  <ng-container matColumnDef="id">
    <th mat-header-cell *matHeaderCellDef class="text-center">{{ 'meetinglist.id' | translate }}</th>
    <td mat-cell  *matCellDef="let meeting">{{meeting.id}}</td>
  </ng-container>

  <ng-container matColumnDef="title">
    <th mat-header-cell *matHeaderCellDef class="text-center">{{ 'meetinglist.title' | translate }}</th>
    <td mat-cell *matCellDef="let meeting">{{meeting.title}}</td>
  </ng-container>

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

  <ng-container matColumnDef="action">
    <th mat-header-cell *matHeaderCellDef class="text-center"></th>
    <td mat-cell *matCellDef="let meeting">

    <button mat-icon-button>
		<mat-icon aria-label="Edit meeting">
         edit
       </mat-icon>
		</button>

    <button mat-icon-button>
       <mat-icon aria-label="Delete meeting">
         delete
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
  public displayedColumns: string[] = ['id', 'title', 'date', 'startingTime', 'finishTime',  'action'];

  constructor(private readonly meetingService: MeetingService) {}

  public ngOnInit() {
    this.meetingService.getAllMeetings();
    this.meetings$ = this.meetingService
    .meetingSub;
  }

}
