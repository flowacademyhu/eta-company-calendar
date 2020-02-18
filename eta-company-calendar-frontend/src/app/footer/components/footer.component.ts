import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  styles: [
    // tslint:disable-next-line: max-line-length
    `footer { width: 100%; background-color: white; color: black; text-align: center}`],
  template:
  `<footer class="mat-elevation-z6">
    <div class="footer-copyright text-center py-3">© 2020 Copyright: csihakft.hu</div>
  </footer>`
})

export class FooterComponent {
}
