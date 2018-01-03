import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatToolbarModule, MatListModule, MatIconModule, MatCardModule,
  MatFormFieldModule, MatDatepickerModule, MatInputModule, MatDialogModule, MatTableDataSource, MatTableModule, MatCheckboxModule
} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
