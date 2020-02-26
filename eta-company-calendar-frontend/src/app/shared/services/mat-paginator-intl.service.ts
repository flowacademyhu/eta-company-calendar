import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateParser, TranslateService } from '@ngx-translate/core';

@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  private rangeLabelIntl: string;
  public itemsPerPageLabel: string;
  public nextPageLabel: string;
  public previousPageLabel: string;
  public labelA: string;
  public labelB: string;

  constructor(private translateService: TranslateService, private translateParser: TranslateParser) {
    super();
  }

  public getTranslations() {
    this.translateService.get([
      'PAGINATOR.ITEMS_PER_PAGE',
      'PAGINATOR.NEXT_PAGE',
      'PAGINATOR.PREVIOUS_PAGE',
      'PAGINATOR.RANGE',
    ])
      .subscribe((translation) => {
        this.itemsPerPageLabel = translation['PAGINATOR.ITEMS_PER_PAGE'];
        this.nextPageLabel = translation['PAGINATOR.NEXT_PAGE'];
        this.previousPageLabel = translation['PAGINATOR.PREVIOUS_PAGE'];
        this.rangeLabelIntl = translation['PAGINATOR.RANGE'];
        this.changes.next();
      });
  }

  public getRangeLabel = (page: number, pageSize: number, length: number) => {
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return this.translateParser.interpolate(this.rangeLabelIntl, { startIndex, endIndex, length });
  }
}
