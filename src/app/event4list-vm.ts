import { Event } from '../contracts';
import { W3 } from 'soltsice';
import { Moment } from 'moment';
import * as moment from 'moment';
import {AttendantVm} from './attendant-vm';
import {BigNumber} from 'bignumber.js';

export class Event4ListVM {
  address: string;
  name: string;
  numOfAttendants: number;
  registrationOpenTo: Moment;
  alreadySignedUp: boolean;
  gotToken: boolean;
  tokensForPresence: number;
  get registrationIsOpen(): boolean {
    return moment().isSameOrBefore(this.registrationOpenTo);
  }

  constructor(private event: Event, private me: string) {
    this.address = event.address;
    // event.name().then(n => this.name = n); // TODO z bazy
    event.attendantsCount().then(x => this.numOfAttendants = x.toNumber());
    event.registrationOpenTo().then(x => this.registrationOpenTo = moment.unix(x.toNumber()));
    event.tokensForPresence().then(x => this.tokensForPresence = x.toNumber());
    event.isSignedUp(this.me).then(x => this.alreadySignedUp = x);
    event.gotToken(this.me).then(x => this.gotToken = x);
  }

  async signUp(): Promise<void> {
    await this.event.signUpByAttendant(W3.TC.txParamsDefaultSend(this.me));
  }

  async *getAttendants(): AsyncIterable<AttendantVm> {
    const attendantsCount = await this.event.attendantsCount();

    for (let i = new BigNumber(0); i.lt(attendantsCount); i = i.add(1)) {
      const attendantAddress = await this.event.attendantsAddresses(i);
      const attendant = await this.event.attendants(attendantAddress);
      yield new AttendantVm(attendant[0], attendantAddress, attendant[2]);
    }
  }

  async confirm(addresses: string[]) {
    if (addresses.length)
      await this.event.confirmPresence(addresses, W3.TC.txParamsDefaultSend(this.me));
  }

  async closeEvent(): Promise<void> {
    await this.event.closeEvent(W3.TC.txParamsDefaultSend(this.me));
  }
}
