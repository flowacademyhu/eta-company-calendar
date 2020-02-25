import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';
import { WelcomeApiConnector } from '~/app/shared/api-connectors/WelcomeApiConnector';
import { ConfigurationService } from '~/app/shared/services/configuration.service';
import { AuthApiConnector } from '../api-connectors/AuthApiConnector';
import { MeetingApiConnector } from '../api-connectors/MeetingApiConnector';
import { ProfileApiConnector } from '../api-connectors/ProfileApiConnector';
import { ReminderApiConnector } from '../api-connectors/ReminderApiConnector';
import { UserApiConnector } from '../api-connectors/UserApiConnector';

export enum Connector {
  WELCOME = '[Welcome]',
  PROFILE = '[Profile]',
  AUTH = '[Auth]',
  USER = '[User]',
  MEETING = '[Meeting]',
  REMINDER = '[Reminder]',
}
@Injectable()
export class ApiCommunicationService {

  private readonly apiBaseUrl: string;
  private connectors: Map<Connector, AbstractApiConnector>;

  constructor(private readonly http: HttpClient,
              private readonly configurationService: ConfigurationService) {
    // set base url
    this.apiBaseUrl = this.configurationService.fetchConfig('baseUrl');

    // map of connectors
    this.connectors = new Map<Connector, AbstractApiConnector>();

    // register connectors
    this.registerConnector(
      { id: Connector.WELCOME, connector: new WelcomeApiConnector(this.http, this.apiBaseUrl) });

    this.registerConnector(
      { id: Connector.PROFILE, connector: new ProfileApiConnector(this.http, this.apiBaseUrl) });

    this.registerConnector(
      { id: Connector.AUTH, connector: new AuthApiConnector(this.http, this.apiBaseUrl) });

    this.registerConnector(
      {id: Connector.USER, connector: new UserApiConnector(this.http, this.apiBaseUrl)});

    this.registerConnector(
      {id: Connector.MEETING, connector: new MeetingApiConnector(this.http, this.apiBaseUrl)});

    this.registerConnector(
      {id: Connector.REMINDER, connector: new ReminderApiConnector(this.http, this.apiBaseUrl)});
}
  /**
   * Registers a connector to the connector pool.
   * @param id: Connector - The unique identifier for a connector.
   * @param connector:AbstractApiConnector} - The connector to register.
   */

  private registerConnector({ id, connector }: { id: Connector; connector: AbstractApiConnector; }) {
    if (this.connectors.has(id)) {
      throw new Error('A connector with ID \'' + id + '\' has already been registered.');
    }
    try {
      this.connectors.set(id, connector);
    } catch (e) {
      throw new Error('Could not register connector: ' + e);
    }
  }

  /**
   * Gets a connector from the connector pool.
   * @param connector: Connector - The unique identifier for a connector.
   * @returns AbstractApiConnector | undefined - The connector itself
   */
  private getConnector(connector: Connector): AbstractApiConnector | undefined {
    if (!this.connectors.has(connector)) {
      throw new Error('No connector is registered for: ' + connector);
    }

    return this.connectors.get(connector);
  }

  // API connector getters
  public welcome(): WelcomeApiConnector {
    return this.getConnector(Connector.WELCOME) as WelcomeApiConnector;
  }
  public profile(): ProfileApiConnector {
    return this.getConnector(Connector.PROFILE) as ProfileApiConnector;
  }

  public auth(): AuthApiConnector {
    return this.getConnector(Connector.AUTH) as AuthApiConnector;
  }

  public user(): UserApiConnector {
    return this.getConnector(Connector.USER) as UserApiConnector;
  }
  public reminder(): ReminderApiConnector {
    return this.getConnector(Connector.REMINDER) as ReminderApiConnector;
  }

  public meeting(): MeetingApiConnector {
    return this.getConnector(Connector.MEETING) as MeetingApiConnector;
  }

}
