import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event4ListVM } from '../event4list-vm';
import {OrganizationService} from '../organization.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import {ConfirmAttendantPresenceComponent} from '../confirm-attendant-presence/confirm-attendant-presence.component';
import {toArray} from '../../utils';
import {AttendantVm} from '../attendant-vm';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event4ListVM[];
  currentAccountIsOrganizationOwner: boolean;

  constructor(private eventService: EventService, private organizationService: OrganizationService, public dialog: MatDialog) { }

  async getEvents(): Promise<void> {
    this.events = await toArray(this.eventService.getEvents());
    this.currentAccountIsOrganizationOwner = await this.organizationService.currentAccountIsOrganizationOwner();
  }

  async ngOnInit() {
    await this.getEvents();
  }

  async showConfirmDialog(event: Event4ListVM): Promise<void> {
    const attendants = await toArray(event.getAttendants());
    const dialogRef = this.dialog.open(ConfirmAttendantPresenceComponent, {
      width: '750px',
      data: {
        eventName: event.name,
        attendants: attendants
      }
    });

    dialogRef.afterClosed().subscribe(async x => await this.confirmAttendants(event, x));
  }

  private async confirmAttendants(event: Event4ListVM, attendants: SelectionModel<AttendantVm>) {
    if (attendants.selected)
      await event.confirm(attendants.selected.map(x => x.address));
  }

  async signUp(event: Event4ListVM): Promise<void> {
    return await event.signUp();
  }

  async closeEvent(event: Event4ListVM): Promise<void> {
    return await event.closeEvent();
  }
}
