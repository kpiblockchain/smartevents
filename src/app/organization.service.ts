import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import { Organization } from '../contracts';


@Injectable()
export class OrganizationService {

  constructor(private web3: Web3Service) { }

  async getOrganization(): Promise<Organization> {
    const netId = await this.web3.networkId;
    const deployedAddress = Organization.Artifacts.networks[netId].address;
    return await Organization.At(deployedAddress, this.web3);
  }

}
