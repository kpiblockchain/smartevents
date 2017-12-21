import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { EventService } from './event.service';
import { AppRoutingModule } from './/app-routing.module';
import { OrganizationService } from './organization.service';
import { Web3Service } from './web3.service';
import { CreateEventComponent } from './create-event/create-event.component';
import { ConfirmAttendantPresenceComponent } from './confirm-attendant-presence/confirm-attendant-presence.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    CreateEventComponent,
    ConfirmAttendantPresenceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    Web3Service,
    EventService,
    OrganizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
