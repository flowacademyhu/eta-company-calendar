import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
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
  templateUrl: 'attendants.component.html'
})

export class AttendantsComponent implements OnInit {
  @Input() public requiredAttendantIds: number[];
  @Input() public optionalAttendantIds: number[];
  @Input() public currentUserId: number;
  @Input() public canModify: boolean;

  protected visible: boolean = true;
  protected selectable: boolean = true;
  protected removable: boolean = true;
  protected separatorKeysCodes: number[] = [ENTER, COMMA];
  protected fruitCtrl: FormControl = new FormControl();

  protected allUsers: UserResponse[];
  protected filteredUserTexts: Observable<string[]>;
  protected reqAttendantCtrl: FormControl = new FormControl();
  protected requiredAttendants: string[] = [];
  protected selectableUserTexts: string[];

  @ViewChild('reqAttendantInput') protected reqAttendantInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') protected matAutocomplete: MatAutocomplete;

  protected users: UserResponse[];

  constructor(private readonly api: ApiCommunicationService) { }

  public ngOnInit() {
    console.log(this.currentUserId);
    this.api.user()
      .getAllUsers()
      .subscribe((res) => {
        this.allUsers = res;
        this.selectableUserTexts = this.allUsers
          .filter((user) => user.id !== this.currentUserId)
          .map((user) => user.email);
        this.filteredUserTexts = this.reqAttendantCtrl.valueChanges.pipe(
          startWith(undefined),
          map((userText: string | null) => userText ? this._filterUser(userText) : this.selectableUserTexts.slice()));
      });
  }

  protected removeFromRequired(attendant: string): void {
    this.removeFromArr(attendant, this.requiredAttendants);
    this.selectableUserTexts.push(attendant);
  }

  protected selected(event: MatAutocompleteSelectedEvent): void {
    const selected = event.option.viewValue;
    this.requiredAttendants.push(selected);
    this.removeFromArr(selected, this.selectableUserTexts);
    this.reqAttendantInput.nativeElement.value = '';
    this.reqAttendantCtrl.setValue(undefined);
  }

  private _filterUser(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.selectableUserTexts.filter((userText) => userText.indexOf(filterValue) === 0);
  }

  private removeFromArr(text: string, arr: string[]): void {
    const index = arr.indexOf(text);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }

}
