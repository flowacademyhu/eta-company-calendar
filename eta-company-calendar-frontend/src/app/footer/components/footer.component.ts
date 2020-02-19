import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  styles: [
    // tslint:disable-next-line: max-line-length
    'footer { position: fixed; left: 0; bottom: 0; width: 100%; background-color: white; color: black; text-align: center}'],
  template:
  `<footer>
    <div class="footer-copyright text-center py-3">© 2020 Copyright: csihakft.hu</div>
  </footer>`
})

export class FooterComponent {
}
