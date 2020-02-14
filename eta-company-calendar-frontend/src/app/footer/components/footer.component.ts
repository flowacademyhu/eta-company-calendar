import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  styles: [
    // tslint:disable-next-line: max-line-length
    'footer { position: static; left: 0; bottom: 0; width: 100%; background-color: black; color: white; text-align: center}'],
  template:
  `<footer>
    <div class="footer-copyright text-center py-3">© 2020 Copyright: csihakft.hu</div>
  </footer>`
})

export class FooterComponent {
}
