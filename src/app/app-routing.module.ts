import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent }      from './events/events.component';
import { CreateEventComponent } from './create-event/create-event.component';


const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
//  { path: 'detail/:address', component: EventDetailComponent },
  { path: 'createEvent', component: CreateEventComponent },
  { path: 'events', component: EventsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
