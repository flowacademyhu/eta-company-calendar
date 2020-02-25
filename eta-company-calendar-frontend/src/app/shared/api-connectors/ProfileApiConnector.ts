import { Observable } from 'rxjs';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';
import { Profile } from '../../models/profile.model';

export class ProfileApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}`;

  public getProfile(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiRoute}/api/profiles/${id}`);
  }

  public updateProfile(id: number, profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiRoute}/api/profiles/${id}`, profile);
  }
}
