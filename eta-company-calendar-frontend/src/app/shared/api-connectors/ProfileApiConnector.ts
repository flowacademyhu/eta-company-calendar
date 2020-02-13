import { Observable } from 'rxjs';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';
import { Profile } from '../../models/profile.model';

export class ProfileApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}`;

  public getProfile(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiRoute}/profiles/${id}`);
  }
  public test() {
    // tslint:disable-next-line:no-console
    console.log('mukodik a profile api');
  }
}
