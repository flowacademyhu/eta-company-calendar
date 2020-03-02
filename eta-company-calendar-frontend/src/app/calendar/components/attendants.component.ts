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
  @Input() public canModify: boolean;

  protected visible: boolean = true;
  protected selectable: boolean = true;
  protected removable: boolean = true;
  protected separatorKeysCodes: number[] = [ENTER, COMMA];
  protected fruitCtrl: FormControl = new FormControl();

  protected reqAttendantCtrl: FormControl = new FormControl();
  protected filteredUserTexts: Observable<string[]>;
  protected requiredAttendants: UserResponse[] = [];
  protected allUsers: UserResponse[];
  protected allUserTexts: string[];

  protected filteredFruits: Observable<string[]>;
  protected fruits: string[] = ['Lemon'];
  protected allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('reqAttendantInput') protected reqAttendantInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') protected matAutocomplete: MatAutocomplete;

  protected users: UserResponse[];

  constructor(private readonly api: ApiCommunicationService) { }

  public ngOnInit() {
    this.api.user()
      .getAllUsers()
      .subscribe((res) => {
        this.allUsers = res;
        this.allUserTexts = this.allUsers.map((user) => user.email);
        this.filteredUserTexts = this.reqAttendantCtrl.valueChanges.pipe(
          startWith(undefined),
          map((userText: string | null) => userText ? this._filterUser(userText) : this.allUserTexts.slice()));
      });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    console.log(event);

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  protected remove(fruit: string): void {
    console.log(fruit);
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  protected selected(event: MatAutocompleteSelectedEvent): void {
    const selected = event.option.viewValue;
    const user = this.allUsers.find((u) => u.email === selected);
    if (user) {
      this.requiredAttendants.push(user);
    }
    this.reqAttendantInput.nativeElement.value = '';
    this.reqAttendantCtrl.setValue(undefined);
  }

  private _filterUser(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allUserTexts.filter((userText) => userText.indexOf(filterValue) === 0);
  }
}
