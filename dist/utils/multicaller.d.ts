import { JsonRpcProvider } from '@ethersproject/providers';
export default class Multicaller {
    network: string;
    provider: JsonRpcProvider;
    abi: any[];
    options: any;
    calls: any[];
    paths: any[];
    constructor(network: string, provider: JsonRpcProvider, abi: any[], options?: any);
    call(path: any, address: any, fn: any, params?: any): Multicaller;
    execute(from?: any): Promise<any>;
}
