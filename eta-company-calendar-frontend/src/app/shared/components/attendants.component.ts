import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { merge, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserResponse } from '~/app/models/user-response.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Component({
  selector: 'app-attendants',
  styles: [`
    .example-chip-list {
      width: 100%;
    }
  `],
  template: `
  <div>
    <div class="d-flex justify-content-center mb-1">
      <h4 class="row-alignment">{{ 'meeting.attendantsTitle' | translate | uppercase }}</h4>
    </div>

    <mat-label>{{ 'meeting.requiredAttendants' | translate }}</mat-label>
    <mat-form-field class="example-chip-list">
      <mat-chip-list #reqAttendantsChipList>
        <mat-chip
          *ngFor="let attendant of requiredAttendants"
          [selectable]="canModify"
          [removable]="canModify"
          (removed)="removeFromRequired(attendant)">
          {{ attendant }}
          <mat-icon matChipRemove *ngIf="canModify">cancel</mat-icon>
        </mat-chip>
        <input
          *ngIf="canModify"
          #reqAttendantInput
          [formControl]="reqAttendantCtrl"
          [matAutocomplete]="autoForReq"
          [matChipInputFor]="reqAttendantsChipList"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes">
      </mat-chip-list>
      <mat-autocomplete #autoForReq="matAutocomplete" (optionSelected)="selectedForRequired($event)">
        <mat-option *ngFor="let user of filteredUserTexts | async" [value]="user">
          {{user}}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>

    <br>

    <mat-label>{{ 'meeting.optionalAttendants' | translate }}</mat-label>
    <mat-form-field class="example-chip-list">
      <mat-chip-list #optAttendantsChipList>
        <mat-chip
          *ngFor="let attendant of optionalAttendants"
          [selectable]="canModify"
          [removable]="canModify"
          (removed)="removeFromOptional(attendant)">
          {{ attendant }}
          <mat-icon matChipRemove *ngIf="canModify">cancel</mat-icon>
        </mat-chip>
        <input
          *ngIf="canModify"
          #optAttendantInput
          [formControl]="optAttendantCtrl"
          [matAutocomplete]="autoForOpt"
          [matChipInputFor]="optAttendantsChipList"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes">
      </mat-chip-list>
      <mat-autocomplete #autoForOpt="matAutocomplete" (optionSelected)="selectedForOptional($event)">
        <mat-option *ngFor="let user of filteredUserTexts | async" [value]="user">
          {{user}}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  </div>
  `
})

export class AttendantsComponent implements OnInit {
  @Input() public inputRequiredAttendantIds: number[] = [];
  @Input() public inputOptionalAttendantIds: number[] = [];
  @Input() public currentUserId: number;
  @Input() public canModify: boolean;

  @Output() public outputRequiredAttendantIds: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() public outputOptionalAttendantIds: EventEmitter<number[]> = new EventEmitter<number[]>();

  protected separatorKeysCodes: number[] = [ENTER, COMMA];

  protected reqAttendantCtrl: FormControl = new FormControl();
  protected requiredAttendants: string[] = [];
  protected optAttendantCtrl: FormControl = new FormControl();
  protected optionalAttendants: string[] = [];

  protected allUsers: UserResponse[];
  protected filteredUserTexts: Observable<string[]>;
  protected selectableUserTexts: string[];

  @ViewChild('reqAttendantInput') protected reqAttendantInput: ElementRef<HTMLInputElement>;
  @ViewChild('optAttendantInput') protected optAttendantInput: ElementRef<HTMLInputElement>;

  protected users: UserResponse[];

  constructor(private readonly api: ApiCommunicationService) { }

  public ngOnInit() {
    this.api.user()
      .getAllUsers()
      .subscribe((res) => {

        this.allUsers = res;

        this.fillMatChipFromInputIds(res);

        this.selectableUserTexts = this.allUsers
          .filter((user) => user.id !== this.currentUserId)
          .filter(this.filterOutInputtedUsers.bind(this))
          .map(this.createUserTextFromUser);

        this.filteredUserTexts = merge(this.reqAttendantCtrl.valueChanges,
                                       this.optAttendantCtrl.valueChanges)
          .pipe(
            startWith(undefined),
            map((userText: string | null) => userText ? this._filterUser(userText) : this.selectableUserTexts.slice())
          );

      });
  }

  protected selectedForRequired(event: MatAutocompleteSelectedEvent): void {
    const selected = event.option.viewValue;
    this.requiredAttendants.push(selected);
    this.removeFromArr(selected, this.selectableUserTexts);
    this.reqAttendantInput.nativeElement.value = '';
    this.reqAttendantCtrl.setValue(undefined);
    this.emitAttendantIds(this.requiredAttendants, this.outputRequiredAttendantIds);
  }

  protected removeFromRequired(attendant: string): void {
    this.removeFromArr(attendant, this.requiredAttendants);
    this.selectableUserTexts.push(attendant);
    this.emitAttendantIds(this.requiredAttendants, this.outputRequiredAttendantIds);
  }

  protected selectedForOptional(event: MatAutocompleteSelectedEvent): void {
    const selected = event.option.viewValue;
    this.optionalAttendants.push(selected);
    this.removeFromArr(selected, this.selectableUserTexts);
    this.optAttendantInput.nativeElement.value = '';
    this.optAttendantCtrl.setValue(undefined);
    this.emitAttendantIds(this.optionalAttendants, this.outputOptionalAttendantIds);
  }

  protected removeFromOptional(attendant: string): void {
    this.removeFromArr(attendant, this.optionalAttendants);
    this.selectableUserTexts.push(attendant);
    this.emitAttendantIds(this.optionalAttendants, this.outputOptionalAttendantIds);
  }

  private createUserTextFromUser(user: UserResponse) {
    const username = user.name ? user.name : '';
    const email = user.email;
    return `${username} (${email})`;
  }

  private _filterUser(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.selectableUserTexts.filter((userText) => {
      return userText.toLowerCase()
             .indexOf(filterValue) >= 0;
    });
  }

  private removeFromArr(text: string, arr: string[]): void {
    const index = arr.indexOf(text);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }

  private emitAttendantIds(attendantNames: string[], emitter: EventEmitter<number[]>) {
    emitter.emit(
      this.allUsers.filter((user) => attendantNames.indexOf(this.createUserTextFromUser(user)) >= 0)
        .map((user) => user.id)
    );
  }

  private fillMatChipFromInputIds(users: UserResponse[]) {
    this.requiredAttendants = users
      .filter((user) => this.inputRequiredAttendantIds.indexOf(user.id) >= 0)
      .map(this.createUserTextFromUser);
    this.optionalAttendants = users
      .filter((user) => this.inputOptionalAttendantIds.indexOf(user.id) >= 0)
      .map(this.createUserTextFromUser);
  }

  private filterOutInputtedUsers(user: UserResponse) {
    return this.inputOptionalAttendantIds.indexOf(user.id) < 0 && this.inputRequiredAttendantIds.indexOf(user.id) < 0;
  }

}
