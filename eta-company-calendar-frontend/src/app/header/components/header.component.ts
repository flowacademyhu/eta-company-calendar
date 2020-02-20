import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfigurationService } from '../../shared/services/configuration.service';

@Component({
  selector: 'app-header',
  styles: [
    `.tool-container {
        position: fixed;
        z-index: 3;
        width: 100%;
        background-color: white;
        color: black;
        text-align: center;
      }`,
    `a {
        border: 2px solid;
        border-color: black !important;
        width: 160px;
        margin-right: 15px;
      }`,
    `.menu-button {
        margin-right: 24px;
        min-width: 0;
        padding: 0;
        line-height: normal;
      }`,
    `.header2 {
        margin-left: auto;}`,
    `.translate-button {
        cursor: pointer;
        margin-left: auto;
        margin-right: 10px;
        border: none;
        font-size: 16px;
        font-weight: bold;
        outline: none;
        background:none;
      }`,
    `.logout-button {
        border: 2px solid;
        border-color: black !important;
        width: 160px;}`,
  ],
  template:
  `<mat-toolbar class="tool-container mat-elevation-z6">
    <span class="header1">
      <button mat-icon-button [matMenuTriggerFor] = "menu" fxShow="true" fxHide.gt-sm>
        <mat-icon>menu</mat-icon>
      </button>
      <mat-menu #menu = "matMenu">
        <button mat-menu-item routerLink="profiles">{{'header.profile' | translate}}</button>
        <button mat-menu-item routerLink="">{{'header.calendar' | translate}}</button>
        <button mat-menu-item routerLink=".">{{'header.meetings' | translate}}</button>
        <button mat-menu-item routerLink=".">{{'header.reminders' | translate}}</button>
        <!-- TODO: add admin role (*ngIf) to User Management button -->
        <button mat-menu-item routerLink=".">{{'header.userManagement' | translate}}</button>
        <button mat-menu-item (click)="onLogout()">{{'header.logout' | translate}}</button>
      </mat-menu>
        <a mat-stroked-button routerLink="profiles" fxShow="true" fxHide.lt-md>{{'header.profile' | translate}}</a>
        <a mat-stroked-button routerLink="." fxShow="true" fxHide.lt-md>{{'header.calendar' | translate}}</a>
        <a mat-stroked-button routerLink="." fxShow="true" fxHide.lt-md>{{'header.meetings' | translate}}</a>
        <a mat-stroked-button routerLink="." fxShow="true" fxHide.lt-md>{{'header.reminders' | translate}}</a>
        <!-- TODO: add admin role (*ngIf) to User Management button -->
        <a mat-stroked-button routerLink="." fxShow="true" fxHide.lt-md>{{'header.userManagement' | translate}}</a>
    </span>
      <div class="header2">
        <button class="translate-button" (click)="onLanguageChange()">{{'header.button' | translate}}</button>
          <button class="logout-button" mat-stroked-button (click)="onLogout()" fxShow="true" fxHide.lt-md>
            {{'header.logout' | translate}}
          </button>
      </div>
  </mat-toolbar>`
})

export class HeaderComponent {

  public language: string;

  constructor(private readonly router: Router,
              private readonly configService: ConfigurationService,
              private readonly translate: TranslateService) { }

  public onLanguageChange() {
    this.translate.use(this.language === 'en' ? 'hu' : 'en');
    this.language = this.translate.currentLang;
  }

  public onLogout() {
    this.configService.clearToken();
    this.router.navigate(['login']);
  }

}
