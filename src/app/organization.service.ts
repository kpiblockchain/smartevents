import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import { Organization } from '../contracts';
import { BigNumber } from 'bignumber.js';


@Injectable()
export class OrganizationService {

  constructor(private web3: Web3Service) { }

  async getOrganization(): Promise<Organization> {
    const netId = await this.web3.networkId;
    const deployedAddress = Organization.Artifacts.networks[netId].address;
    return await Organization.At(deployedAddress, this.web3);
  }

  async currentAccountIsOrganizationOwner(): Promise<boolean> {
    const organization = await this.getOrganization();
    const owner = await organization.owner();
    const currentAccount = await this.web3.getCurrentAccount();

    return currentAccount === owner;
  }

  async createEvent(name: string, from: Date, to: Date, maxAttendants: number, tokensForPresence: BigNumber | number) {
    const organization = await this.getOrganization();
    const defaultTxParams = await this.web3.getDefaultTxParams();
    await organization.createEvent(name, from.getTime(), to.getTime(), maxAttendants, tokensForPresence, defaultTxParams);
  }
}
