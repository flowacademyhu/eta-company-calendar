import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reminder } from '~/app/models/reminder.model';
import { ReminderService } from '~/app/reminder/service/reminder.service';

@Component({
  selector: 'app-my-meetings-description',
  styles: ['table { width: 85%; }', 'th.mat-header-cell {text-align: center;}', 'td.mat-cell {text-align: center;}' ],
  template:   `
  <div class="row justify-content-center mt-4">
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
    <ng-container matColumnDef="endingTime">
      <th mat-header-cell *matHeaderCellDef> {{'reminderlist.endingTime' | translate}} </th>
      <td mat-cell *matCellDef="let reminder"> {{reminder.endingTime | date: ' HH:mm'}} </td>
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

  protected reminders$: Observable<Reminder[]>;
  public displayedColumns: string[] = ['id', 'title', 'description', 'date', 'startingTime', 'endingTime', 'recurring'];

  constructor(private readonly reminderService: ReminderService) {}

  public ngOnInit() {
    this.reminderService.getRemindersByUserId(2);
    this.reminders$ = this.reminderService
    .reminderSub;
  }
}
