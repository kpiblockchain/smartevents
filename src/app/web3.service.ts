import {Injectable} from '@angular/core';
import {W3} from 'soltsice';

declare var web3: any;

@Injectable()
export class Web3Service extends W3 {
  constructor() {
    if (typeof web3 !== 'undefined') {
      super(web3.currentProvider);
    } else {
      super(new W3.providers.HttpProvider('http://localhost:8545'));
    }
  }
}
