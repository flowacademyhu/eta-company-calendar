import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/HeaderComponent';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    TranslateModule.forChild(),
  ]
})
export class HeaderModule { }
