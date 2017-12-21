import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event4ListVM } from '../event4list-vm';
import {OrganizationService} from '../organization.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event4ListVM[];
  currentAccountIsOrganizationOwner: boolean;

  constructor(private eventService: EventService, private organizationService: OrganizationService) { }

  getEvents(): void {
    this.eventService.getEvents().then(events => this.events = events);
    this.organizationService.currentAccountIsOrganizationOwner().then(x => this.currentAccountIsOrganizationOwner = x);
  }

  ngOnInit() {
    this.getEvents();
  }

  signUp(event: Event4ListVM) {
    event.signUp();
  }
}
