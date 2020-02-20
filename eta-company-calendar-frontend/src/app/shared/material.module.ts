import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
<<<<<<< HEAD
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
=======
import { MatSidenavModule } from '@angular/material/sidenav';
>>>>>>> a671b0476e5f4f213477c9a41e08545522175712
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
<<<<<<< HEAD
    MatTableModule,
    MatSnackBarModule,
=======
    MatListModule,
    MatSidenavModule,
>>>>>>> a671b0476e5f4f213477c9a41e08545522175712
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatSidenavModule,
  ],
})
export class MaterialModule { }
