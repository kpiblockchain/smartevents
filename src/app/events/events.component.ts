import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event4ListVM } from '../event4list-vm';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event4ListVM[];

  constructor(private eventService: EventService) { }

  getEvents(): void {
    this.eventService.getEvents().then(events => this.events = events);
  }

  ngOnInit() {
    this.getEvents();
  }

  signUp(event: Event4ListVM) {
    event.signUp();
  }
}
