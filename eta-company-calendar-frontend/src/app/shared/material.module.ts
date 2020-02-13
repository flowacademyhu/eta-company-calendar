import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
  ],
})
export class MaterialModule { }
