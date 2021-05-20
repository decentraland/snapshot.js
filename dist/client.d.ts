import { Web3Provider } from '@ethersproject/providers';
export default class Client {
    readonly address: string;
    constructor(address?: string);
    request(command: string, body?: any): Promise<unknown>;
    send(msg: any): Promise<unknown>;
    getSpaces(): Promise<unknown>;
    getProposals(space: string): Promise<unknown>;
    getVotes(space: string, proposalId: string): Promise<unknown>;
    broadcast(web3: Web3Provider, account: string, space: string, type: string, payload: any): Promise<unknown>;
}
