import { Component, Input, OnInit } from '@angular/core';
import { UserResponse } from '~/app/models/user-response.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Component({
  selector: 'app-attendants',
  templateUrl: 'attendants.component.html'
})

export class AttendantsComponent implements OnInit {
  @Input() public requiredAttendants: number[];
  @Input() public optionalAttendants: number[];
  @Input() public canModify: boolean;

  protected users: UserResponse[];

  constructor(private readonly api: ApiCommunicationService) { }

  public ngOnInit() {
    this.api.user()
      .getAllUsers()
      .subscribe((res) => {
        console.log(res);
      });
  }
}
