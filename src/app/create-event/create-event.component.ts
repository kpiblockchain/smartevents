import { Component, OnInit } from '@angular/core';
import {OrganizationService} from '../organization.service';
import {Moment} from 'moment';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  name: string;
  registrationOpenTo: Moment;
  maxAttendants: number;
  tokensForPresence: number;

  constructor(private organizationService: OrganizationService) { }

  ngOnInit() {
  }

  async onSave(): Promise<void> {
    await this.organizationService.createEvent(this.name, this.registrationOpenTo, this.maxAttendants, this.tokensForPresence);
  }
}
