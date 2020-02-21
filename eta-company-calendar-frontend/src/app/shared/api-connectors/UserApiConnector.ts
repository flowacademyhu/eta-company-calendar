import { Observable } from 'rxjs';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';
import { User } from '../../models/user.model';

export class UserApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}/api`;

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiRoute}/users/${id}`);
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiRoute}/users/`);
  }

  public postUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiRoute}/users/`, user);
  }

  public putUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiRoute}/users/${id}`, user);
  }

}
