import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserResponse } from '~/app/models/user-response.model';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';

@Injectable()
export class UserService {

  constructor(private readonly api: ApiCommunicationService) { }

  private _userSub: BehaviorSubject<UserResponse[]> = new BehaviorSubject<UserResponse[]>([]);

  public get userSub() {
    return this._userSub;
  }

  public getUser(id: number) {
    return this.api
    .user()
    .getUser(id);
  }

  public getAllUsers() {
     this.api.user()
    .getAllUsers()
    .subscribe((users: UserResponse[]) => {
      this._userSub.next(users);
    });
  }

  public deleteUser(id: number) {
    return this.api
    .user()
    .deleteUser(id);
  }

}