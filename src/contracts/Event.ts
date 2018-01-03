
import { BigNumber } from 'bignumber.js';
import { W3, SoltsiceContract } from 'soltsice';

/**
 * Event API
 */
export class Event extends SoltsiceContract {
    static get Artifacts() { return require('../../build/contracts/Event.json'); }

    static get BytecodeHash() {
        // we need this before ctor, but artifacts are static and we cannot pass it to the base class, so need to generate
        let artifacts = Event.Artifacts;
        if (!artifacts || !artifacts.bytecode) {
            return undefined;
        }
        let hash = W3.sha3(JSON.stringify(artifacts.bytecode));
        return hash;
    }

    // tslint:disable-next-line:max-line-length
    static async New(deploymentParams: W3.TC.TxParams, ctorParams?: {_name: string, _registrationOpenFrom: BigNumber | number, _registrationOpenTo: BigNumber | number, _maxAttendants: BigNumber | number, _amount: BigNumber | number}, w3?: W3, link?: SoltsiceContract[]): Promise<Event> {
        let contract = new Event(deploymentParams, ctorParams, w3, link);
        await contract._instancePromise;
        return contract;
    }

    static async At(address: string | object, w3?: W3): Promise<Event> {
        let contract = new Event(address, undefined, w3, undefined);
        await contract._instancePromise;
        return contract;
    }

    protected constructor(
        deploymentParams: string | W3.TC.TxParams | object,
        ctorParams?: {_name: string, _registrationOpenFrom: BigNumber | number, _registrationOpenTo: BigNumber | number, _maxAttendants: BigNumber | number, _amount: BigNumber | number},
        w3?: W3,
        link?: SoltsiceContract[]
    ) {
        // tslint:disable-next-line:max-line-length
        super(
            w3,
            Event.Artifacts,
            ctorParams ? [ctorParams!._name, ctorParams!._registrationOpenFrom, ctorParams!._registrationOpenTo, ctorParams!._maxAttendants, ctorParams!._amount] : [],
            deploymentParams,
            link
        );
    }
    /*
        Contract methods
    */
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public name( txParams?: W3.TC.TxParams): Promise<string> {
        return new Promise((resolve, reject) => {
            this._instance.name
                .call( txParams || this._sendParams)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public isSignedUp(attendant: string, txParams?: W3.TC.TxParams): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._instance.isSignedUp
                .call(attendant, txParams || this._sendParams)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public organization( txParams?: W3.TC.TxParams): Promise<string> {
        return new Promise((resolve, reject) => {
            this._instance.organization
                .call( txParams || this._sendParams)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public tokensForPresence( txParams?: W3.TC.TxParams): Promise<BigNumber> {
        return new Promise((resolve, reject) => {
            this._instance.tokensForPresence
                .call( txParams || this._sendParams)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public attendantsAddresses(_0: BigNumber | number, txParams?: W3.TC.TxParams): Promise<string> {
        return new Promise((resolve, reject) => {
            this._instance.attendantsAddresses
                .call(_0, txParams || this._sendParams)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
    
    // tslint:disable-next-line:member-ordering
    public confirmPresence = Object.assign(
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:variable-name
        (attendantsToConfirm: string[], txParams?: W3.TC.TxParams): Promise<W3.TC.TransactionResult> => {
            return new Promise((resolve, reject) => {
                this._instance.confirmPresence(attendantsToConfirm, txParams || this._sendParams)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
            });
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            sendTransaction: (attendantsToConfirm: string[], txParams?: W3.TC.TxParams): Promise<string> => {
                return new Promise((resolve, reject) => {
                    this._instance.confirmPresence.sendTransaction(attendantsToConfirm, txParams || this._sendParams)
                        .then((res) => resolve(res))
                        .catch((err) => reject(err));
                });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            data: (attendantsToConfirm: string[]): Promise<string> => {
                return new Promise((resolve, reject) => {
                    resolve(this._instance.confirmPresence.request(attendantsToConfirm).params[0].data);
                });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            estimateGas: (attendantsToConfirm: string[]): Promise<number> => {
                return new Promise((resolve, reject) => {
                    this._instance.confirmPresence.estimateGas(attendantsToConfirm).then((g) => resolve(g));
                });
            }
        });
    
    // tslint:disable-next-line:member-ordering
    public signUpByOwner = Object.assign(
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:variable-name
        (nick: string, attendant: string, txParams?: W3.TC.TxParams): Promise<W3.TC.TransactionResult> => {
            return new Promise((resolve, reject) => {
                this._instance.signUpByOwner(nick, attendant, txParams || this._sendParams)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
            });
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            sendTransaction: (nick: string, attendant: string, txParams?: W3.TC.TxParams): Promise<string> => {
                return new Promise((resolve, reject) => {
                    this._instance.signUpByOwner.sendTransaction(nick, attendant, txParams || this._sendParams)
                        .then((res) => resolve(res))
                        .catch((err) => reject(err));
                });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            data: (nick: string, attendant: string): Promise<string> => {
                return new Promise((resolve, reject) => {
                    resolve(this._instance.signUpByOwner.request(nick, attendant).params[0].data);
                });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            estimateGas: (nick: string, attendant: string): Promise<number> => {
                return new Promise((resolve, reject) => {
                    this._instance.signUpByOwner.estimateGas(nick, attendant).then((g) => resolve(g));
                });
            }
        });
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public registrationOpenFrom( txParams?: W3.TC.TxParams): Promise<BigNumber> {
        return new Promise((resolve, reject) => {
            this._instance.registrationOpenFrom
                .call( txParams || this._sendParams)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public maxAttendants( txParams?: W3.TC.TxParams): Promise<BigNumber> {
        return new Promise((resolve, reject) => {
            this._instance.maxAttendants
                .call( txParams || this._sendParams)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public attendantsCount( txParams?: W3.TC.TxParams): Promise<BigNumber> {
        return new Promise((resolve, reject) => {
            this._instance.attendantsCount
                .call( txParams || this._sendParams)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
    
    // tslint:disable-next-line:member-ordering
    public signUpByAttendant = Object.assign(
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:variable-name
        (nick: string, txParams?: W3.TC.TxParams): Promise<W3.TC.TransactionResult> => {
            return new Promise((resolve, reject) => {
                this._instance.signUpByAttendant(nick, txParams || this._sendParams)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
            });
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            sendTransaction: (nick: string, txParams?: W3.TC.TxParams): Promise<string> => {
                return new Promise((resolve, reject) => {
                    this._instance.signUpByAttendant.sendTransaction(nick, txParams || this._sendParams)
                        .then((res) => resolve(res))
                        .catch((err) => reject(err));
                });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            data: (nick: string): Promise<string> => {
                return new Promise((resolve, reject) => {
                    resolve(this._instance.signUpByAttendant.request(nick).params[0].data);
                });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            estimateGas: (nick: string): Promise<number> => {
                return new Promise((resolve, reject) => {
                    this._instance.signUpByAttendant.estimateGas(nick).then((g) => resolve(g));
                });
            }
        });
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public attendants(_0: string, txParams?: W3.TC.TxParams): Promise<any> {
        return new Promise((resolve, reject) => {
            this._instance.attendants
                .call(_0, txParams || this._sendParams)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public gotToken(attendant: string, txParams?: W3.TC.TxParams): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._instance.gotToken
                .call(attendant, txParams || this._sendParams)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public registrationOpenTo( txParams?: W3.TC.TxParams): Promise<BigNumber> {
        return new Promise((resolve, reject) => {
            this._instance.registrationOpenTo
                .call( txParams || this._sendParams)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
    
}
