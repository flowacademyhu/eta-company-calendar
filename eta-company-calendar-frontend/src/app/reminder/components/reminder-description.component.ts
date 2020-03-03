import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReminderDetail } from '~/app/models/reminder-detail.model';
import { ReminderService } from '~/app/reminder/service/reminder.service';
import { AuthService } from '~/app/shared/services/auth.service';

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
            <input matInput type="text"
              placeholder="{{ 'meetinglist.filter' | translate}}">
          </mat-form-field>
      </div>
    </mat-card>
  </div>

  <div class="pt-1 row justify-content-center">
  <table mat-table [dataSource]="reminders$ | async" class="mat-elevation-z8">
    <ng-container matColumnDef="id">
      <th mat-header-cell *matHeaderCellDef> {{'reminderlist.id' | translate}} </th>
      <td mat-cell *matCellDef="let reminder"> {{reminder.id}} </td>
    </ng-container>
    <ng-container matColumnDef="title">
      <th mat-header-cell *matHeaderCellDef> {{'reminderlist.title' | translate}} </th>
      <td mat-cell *matCellDef="let reminder"> {{reminder.title}} </td>
    </ng-container>
    <ng-container matColumnDef="description">
      <th mat-header-cell *matHeaderCellDef> {{'reminderlist.description' | translate}} </th>
      <td mat-cell *matCellDef="let reminder"> {{reminder.description}} </td>
    </ng-container>
    <ng-container matColumnDef="date">
      <th mat-header-cell *matHeaderCellDef> {{'reminderlist.date' | translate}} </th>
      <td mat-cell *matCellDef="let reminder"> {{reminder.startingTime | date: ' yyyy-MM-dd' }} </td>
    </ng-container>
    <ng-container matColumnDef="startingTime">
      <th mat-header-cell *matHeaderCellDef> {{'reminderlist.startingTime' | translate}} </th>
      <td mat-cell *matCellDef="let reminder"> {{reminder.startingTime | date: ' HH:mm' }} </td>
    </ng-container>
    <ng-container matColumnDef="recurring">
      <th mat-header-cell *matHeaderCellDef> {{'reminderlist.recurring' | translate}} </th>
      <td mat-cell *matCellDef="let reminder"> {{reminder.recurring}} </td>
      </ng-container>
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
</div>
  `,
})

export class ReminderDescriptionComponent implements OnInit {

  protected reminders$: Observable<ReminderDetail[]>;
  public displayedColumns: string[] = ['id', 'title', 'description', 'date', 'startingTime', 'recurring'];

  constructor(private readonly reminderService: ReminderService,
              private auth: AuthService) {}

  public ngOnInit() {
    this.reminderService.getRemindersByUserId(this.auth.tokenDetails.getValue().id);
    this.reminders$ = this.reminderService
    .reminderSub;
  }
}
