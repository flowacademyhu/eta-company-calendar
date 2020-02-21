import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from '~/app/models/meeting.model';
import { MeetingService } from '~/app/my-meetings/service/meeting.service';

@Component({
  selector: 'app-my-meetings-description',
  template: `
	<div class="row justify-content-center">
      <table mat-table [dataSource]="meetings$ | async" class="mat-elevation-z8">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef class="center">id</th>
          <td mat-cell  *matCellDef="let meeting"> {{meeting.id}} </td>
        </ng-container>

				<ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef class="center">title</th>
          <td mat-cell *matCellDef="let meeting">{{meeting.title}}</td>
        </ng-container>

				<ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef class="center">Desc</th>
          <td mat-cell *matCellDef="let meeting">{{meeting.description}}</td>
        </ng-container>

				<ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let meeting">
					<button mat-icon-button>
					<mat-icon aria-label="User">
            edit
          </mat-icon>
					</button>
					<button mat-icon-button>
          <mat-icon aria-label="Delete Icon">
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
  public displayedColumns: string[] = ['id', 'title', 'description', 'action'];

  constructor(private readonly meetingService: MeetingService) {}

  public ngOnInit() {
    this.meetingService.getAllMeetings();
    this.meetings$ = this.meetingService
    .meetingSub;
  }

}
