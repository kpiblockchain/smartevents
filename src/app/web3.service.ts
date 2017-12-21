import {Injectable} from '@angular/core';
import {W3} from 'soltsice';
import TxParams = W3.TC.TxParams;

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

  async getCurrentAccount(): Promise<string> {
    return (await this.accounts)[0];
  }

  async getDefaultTxParams(): Promise<TxParams> {
    const currentAccount = await this.getCurrentAccount();
    return W3.TC.txParamsDefaultSend(currentAccount);
  }
}
