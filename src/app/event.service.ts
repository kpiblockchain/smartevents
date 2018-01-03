import { Injectable } from '@angular/core';

import { Web3Service } from './web3.service';
import { OrganizationService } from './organization.service';

import { BigNumber } from 'bignumber.js';
import { Event } from '../contracts';
import { Event4ListVM } from './event4list-vm';
import { AttendantVm } from './attendant-vm';

@Injectable()
export class EventService {

  constructor(private organizationService: OrganizationService, private web3: Web3Service) { }

  async getEvent(address: BigNumber | string): Promise<Event> {
    return await Event.At(address, this.web3);
  }

  async *getEvents(): AsyncIterable<Event4ListVM> {
    const organization = await this.organizationService.getOrganization();
    const eventsCount = await organization.getEventsCount();
    const defaultAddress = await this.web3.getCurrentAccount();

    for (let i = new BigNumber(0); i.lt(eventsCount); i = i.add(1)) {
      const eventAddress = await organization.events(i);
      const event = await Event.At(eventAddress, this.web3);
      yield new Event4ListVM(event, defaultAddress);
    }
  }
}
