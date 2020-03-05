import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OwlDateTimeIntl } from 'ng-pick-datetime';

@Injectable()
export class DatetimeButtonText extends OwlDateTimeIntl {
  public cancelBtnLabel: string = 'TEXT FOR CANCEL';
  public setBtnLabel: string = 'TEXT FOR SET';

  constructor(private readonly translate: TranslateService) {
    super();
    this.setLang();
    this.translate.onLangChange
    .subscribe((_) => this.setLang());
  }

  private setLang() {
    switch (this.translate.currentLang) {
      case 'en':
          this.cancelBtnLabel = 'Cancel';
          this.setBtnLabel = 'Set';
          break;
      case 'hu':
          this.cancelBtnLabel = 'mégse';
          this.setBtnLabel = 'ok';
          break;
    }
  }

}
