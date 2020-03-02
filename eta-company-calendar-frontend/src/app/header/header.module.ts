import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/header/components/header.component';
import { SharedModule } from '../shared/shared.module';

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
