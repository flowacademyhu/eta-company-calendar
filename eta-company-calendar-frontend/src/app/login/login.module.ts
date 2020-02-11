import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login.component';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module copy';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    SharedModule,
    LoginRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class LoginModule { }