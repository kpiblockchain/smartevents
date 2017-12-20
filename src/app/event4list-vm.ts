import { Event } from '../contracts';
import {W3} from 'soltsice';

export class Event4ListVM {
  address: string;
  name: string;
  numOfAttendants: number;
  registrationOpenFrom: Date;
  registrationOpenTo: Date;
  alreadySignedUp: boolean;

  constructor(private event: Event, private me: string) {
    this.address = event.address;
    event.name().then(n => this.name = n);
    event.currentSignedUpAttendants().then(x => this.numOfAttendants = x.toNumber());
    event.registrationOpenFrom().then(x => this.registrationOpenFrom = new Date(x.toNumber()));
    event.registrationOpenTo().then(x => this.registrationOpenTo = new Date(x.toNumber()));
    event.isSignedUp(this.me).then(x => this.alreadySignedUp = x);
  }

  async signUp(): Promise<void> {
    await this.event.signUpByAttendant(W3.TC.txParamsDefaultSend(this.me));
  }
}
