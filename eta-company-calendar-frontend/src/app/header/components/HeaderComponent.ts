import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProfilViewDialog } from '../../shared/modals/profil-view-dialog.component';
import { ConfigurationService } from '../../shared/services/configuration.service';
@Component({
  selector: 'app-header',
  styles: [
    `mat-toolbar {
      position: fixed;
      z-index: 3; width: 100%;
      background-color: white;
      color: black;
      text-align: center;}`,
    `a {
      border: 2px solid;
      border-color: black !important;
      width: 160px;}`,
    `p {
      cursor: pointer;}`,
    `button {
      border: 2px solid;
      border-color: black !important;
      width: 120px;}`,
  ],
  template: `<mat-toolbar class="my-0 mat-elevation-z6">
    <a class="mr-3" mat-stroked-button (click) = "openProfilDialog()">{{'header.profile' | translate}}</a>
    <a class="mr-3" mat-stroked-button routerLink=".">{{'header.calendar' | translate}}</a>
    <a class="mr-3" mat-stroked-button routerLink=".">{{'header.meetings' | translate}}</a>
    <a class="mr-3" mat-stroked-button routerLink=".">{{'header.reminders' | translate}}</a>
    <!-- TODO: add admin role (*ngIf) to User Management button -->
    <a class="mr-5" mat-stroked-button routerLink=".">{{'header.userManagement' | translate}}</a>
    <p class="ml-auto" (click)="onLanguageChange()">{{'header.button' | translate}}</p>
    <button mat-stroked-button (click)="onLogout()" class="ml-3">{{'header.logout' | translate}}</button>
  </mat-toolbar>`
})
export class HeaderComponent {
  public language: string;
  constructor(private readonly router: Router,
              private readonly configService: ConfigurationService,
              private readonly translate: TranslateService, private dialog: MatDialog) { }
  public onLanguageChange() {
    this.translate.use(this.language === 'en' ? 'hu' : 'en');
    this.language = this.translate.currentLang;
  }
  public onLogout() {
    this.configService.clearToken();
    this.router.navigate(['login']);
  }
  public openProfilDialog() {
    this.dialog.open(ProfilViewDialog, { disableClose: true,
                                        panelClass: 'profil-view' });
  }
}
