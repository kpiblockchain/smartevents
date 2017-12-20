import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatToolbarModule, MatListModule, MatIcon, MatIconModule, MatCardModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatListModule, MatIconModule, MatCardModule],
  exports: [MatButtonModule, MatToolbarModule, MatListModule, MatIconModule, MatCardModule],
})
export class MaterialModule { }
