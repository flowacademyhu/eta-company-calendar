import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-meeting-create',
  templateUrl: 'meeting-create.component'
})

export class MeetingCreateComponent {

  constructor(public dialogRef: MatDialogRef<MeetingCreateComponent>) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

}

/*
#3 #25
A #25 -ben létrehozott felugró ablakban, amennyiben az értekezlet típus van kiválasztva, az alábbi beviteli mezőket kell megjelenítenünk:

-Tárgy (szöveges)
-Hely (select, 4 lehetőség közül választhat: Tárgyaló, Márk iroda, Áron iroda, egyéb: amit szöveges mezőbe lehessen bevinni)
-tól - ig dátum választó (ide be kell töltenünk azt a dátumot vagy időntot, amire kattintott a user. dátumot változtatni egy date picker segítségével tudjunk, időpontot pedig egy listából 0-23ig, ill. mellette egy 5 percesével felosztott perclistából lehessen kiválasztani)
-Meghívottak (ahova szövegesen lehessen beírni az e-mail címeket, amiket megjegyez, és legközelebb felajánl lehetőségként, ha a mezőbe kattintok)
-Ismétlődjön-e az esemény
-Értesítést kapnak (hasonló működés a mint a meghívottaknál. az itt kiválasztott személyek csak értesítést kapnak, amiben jelölni kell, hogy nem kell / muszáj ott lenniük.

Mentés és mégse gomb. A gomb megnyomása után zárjuk be a felugró ablakot.
*/
