import Client from './client';
declare const _default: {
    Client: typeof Client;
    plugins: {
        aragon: typeof import("./plugins/aragon").default;
        gnosis: typeof import("./plugins/gnosis").default;
        daoModule: typeof import("./plugins/daoModule").default;
        quorum: typeof import("./plugins/quorum").default;
    };
    strategies: {
        balancer: typeof import("./strategies/balancer").strategy;
        'erc20-received': typeof import("./strategies/erc20-received").strategy;
        'contract-call': typeof import("./strategies/contract-call").strategy;
        'eth-received': typeof import("./strategies/eth-received").strategy;
        'eth-philanthropy': typeof import("./strategies/eth-philanthropy").strategy;
        'ens-domains-owned': typeof import("./strategies/ens-domains-owned").strategy;
        'ens-reverse-record': typeof import("./strategies/ens-reverse-record").strategy;
        'erc20-balance-of': typeof import("./strategies/erc20-balance-of").strategy;
        'erc20-balance-of-fixed-total': typeof import("./strategies/erc20-balance-of-fixed-total").strategy;
        'erc20-balance-of-cv': typeof import("./strategies/erc20-balance-of-cv").strategy;
        'erc20-balance-of-coeff': typeof import("./strategies/erc20-balance-of-coeff").strategy;
        'erc20-with-balance': typeof import("./strategies/erc20-with-balance").strategy;
        'erc20-balance-of-delegation': typeof import("./strategies/erc20-balance-of-delegation").strategy;
        'balance-of-with-min': typeof import("./strategies/balance-of-with-min").strategy;
        'eth-balance': typeof import("./strategies/eth-balance").strategy;
        'eth-wallet-age': typeof import("./strategies/eth-wallet-age").strategy;
        'maker-ds-chief': typeof import("./strategies/maker-ds-chief").strategy;
        erc721: typeof import("./strategies/erc721").strategy;
        'erc721-enumerable': typeof import("./strategies/erc721-enumerable").strategy;
        'erc721-with-multiplier': typeof import("./strategies/erc721-with-multiplier").strategy;
        'erc1155-balance-of': typeof import("./strategies/erc1155-balance-of").strategy;
        'erc1155-balance-of-cv': typeof import("./strategies/erc1155-balance-of-cv").strategy;
        multichain: typeof import("./strategies/multichain").strategy;
        uni: typeof import("./strategies/uni").strategy;
        'frax-finance': typeof import("./strategies/frax-finance").strategy;
        'yearn-vault': typeof import("./strategies/yearn-vault").strategy;
        moloch: typeof import("./strategies/moloch").strategy;
        masterchef: typeof import("./strategies/masterchef").strategy;
        sushiswap: typeof import("./strategies/sushiswap").strategy;
        uniswap: typeof import("./strategies/uniswap").strategy;
        flashstake: typeof import("./strategies/flashstake").strategy;
        pancake: typeof import("./strategies/pancake").strategy;
        synthetix: typeof import("./strategies/synthetix").strategy;
        ctoken: typeof import("./strategies/ctoken").strategy;
        cream: typeof import("./strategies/cream").strategy;
        'staked-uniswap': typeof import("./strategies/staked-uniswap").strategy;
        esd: typeof import("./strategies/esd").strategy;
        'esd-delegation': typeof import("./strategies/esd-delegation").strategy;
        piedao: typeof import("./strategies/piedao").strategy;
        'xdai-easy-staking': typeof import("./strategies/xdai-easy-staking").strategy;
        'xdai-posdao-staking': typeof import("./strategies/xdai-posdao-staking").strategy;
        'xdai-stake-holders': typeof import("./strategies/xdai-stake-holders").strategy;
        'xdai-stake-delegation': typeof import("./strategies/xdai-stake-delegation").strategy;
        defidollar: typeof import("./strategies/defidollar").strategy;
        aavegotchi: typeof import("./strategies/aavegotchi").strategy;
        mithcash: typeof import("./strategies/mithcash").strategy;
        stablexswap: typeof import("./strategies/stablexswap").strategy;
        dittomoney: typeof import("./strategies/dittomoney").strategy;
        'staked-keep': typeof import("./strategies/staked-keep").strategy;
        'balancer-unipool': typeof import("./strategies/balancer-unipool").strategy;
        typhoon: typeof import("./strategies/typhoon").strategy;
        delegation: typeof import("./strategies/delegation").strategy;
        ticket: typeof import("./strategies/ticket").strategy;
        work: typeof import("./strategies/work").strategy;
        'ticket-validity': typeof import("./strategies/ticket-validity").strategy;
        opium: typeof import("./strategies/opium").strategy;
        'ocean-marketplace': typeof import("./strategies/ocean-marketplace").strategy;
        'the-graph-balance': typeof import("./strategies/the-graph-balance").strategy;
        'the-graph-delegation': typeof import("./strategies/the-graph-delegation").strategy;
        'the-graph-indexing': typeof import("./strategies/the-graph-indexing").strategy;
        whitelist: typeof import("./strategies/whitelist").strategy;
        tokenlon: typeof import("./strategies/tokenlon").strategy;
        rebased: typeof import("./strategies/rebased").strategy;
        'pob-hash': typeof import("./strategies/pob-hash").strategy;
        'total-axion-shares': typeof import("./strategies/total-axion-shares").strategy;
        'comp-like-votes': typeof import("./strategies/comp-like-votes").strategy;
        pagination: typeof import("./strategies/pagination").strategy;
        'ruler-staked-lp': typeof import("./strategies/ruler-staked-lp").strategy;
        xcover: typeof import("./strategies/xcover").strategy;
        'niu-staked': typeof import("./strategies/niu-staked").strategy;
        mushrooms: typeof import("./strategies/mushrooms").strategy;
        'curio-cards-erc20-weighted': typeof import("./strategies/curio-cards-erc20-weighted").strategy;
        'ren-nodes': typeof import("./strategies/ren-nodes").strategy;
        'multisig-owners': typeof import("./strategies/multisig-owners").strategy;
        'tranche-staking': typeof import("./strategies/tranche-staking").strategy;
        pepemon: typeof import("./strategies/pepemon").strategy;
        'erc1155-all-balances-of': typeof import("./strategies/erc1155-all-balances-of").strategy;
        'saffron-finance': typeof import("./strategies/saffron-finance").strategy;
        'tranche-staking-lp': typeof import("./strategies/tranche-staking-lp").strategy;
        'masterchef-pool-balance': typeof import("./strategies/masterchef-pool-balance").strategy;
        'avn-balance-of-staked': typeof import("./strategies/avn-balance-of-staked").strategy;
        api: typeof import("./strategies/api").strategy;
        xseen: typeof import("./strategies/xseen").strategy;
        'moloch-all': typeof import("./strategies/moloch-all").strategy;
        'moloch-loot': typeof import("./strategies/moloch-loot").strategy;
        'hopr-uni-lp-farm': typeof import("./strategies/hopr-uni-lp-farm").strategy;
        apescape: typeof import("./strategies/apescape").strategy;
        liftkitchen: typeof import("./strategies/liftkitchen").strategy;
        'decentraland-estate-size': typeof import("./strategies/decentraland-estate-size").strategy;
        brightid: typeof import("./strategies/brightid").strategy;
    };
    schemas: {
        space: {
            title: string;
            type: string;
            properties: {
                name: {
                    type: string;
                    title: string;
                    minLength: number;
                    maxLength: number;
                };
                private: {
                    type: string;
                };
                about: {
                    type: string;
                    title: string;
                    maxLength: number;
                };
                terms: {
                    type: string;
                    title: string;
                    format: string;
                    maxLength: number;
                };
                avatar: {
                    type: string;
                    title: string;
                    format: string;
                    maxLength: number;
                };
                location: {
                    type: string;
                    title: string;
                    maxLength: number;
                };
                website: {
                    type: string;
                    title: string;
                    format: string;
                    maxLength: number;
                };
                twitter: {
                    type: string;
                    title: string;
                    pattern: string;
                    maxLength: number;
                };
                github: {
                    type: string;
                    title: string;
                    pattern: string;
                    maxLength: number;
                };
                email: {
                    type: string;
                    title: string;
                    maxLength: number;
                };
                network: {
                    type: string;
                    title: string;
                    minLength: number;
                    maxLength: number;
                };
                symbol: {
                    type: string;
                    title: string;
                    minLength: number;
                    maxLength: number;
                };
                skin: {
                    type: string;
                    title: string;
                    maxLength: number;
                };
                domain: {
                    type: string;
                    title: string;
                    maxLength: number;
                };
                strategies: {
                    type: string;
                    minItems: number;
                    maxItems: number;
                    items: {
                        type: string;
                        properties: {
                            name: {
                                type: string;
                                maxLength: number;
                                title: string;
                            };
                            params: {
                                type: string;
                                title: string;
                            };
                        };
                        required: string[];
                        additionalProperties: boolean;
                    };
                    title: string;
                };
                members: {
                    type: string;
                    items: {
                        type: string;
                        pattern: string;
                        minLength: number;
                        maxLength: number;
                    };
                    title: string;
                };
                admins: {
                    type: string;
                    items: {
                        type: string;
                        pattern: string;
                        minLength: number;
                        maxLength: number;
                    };
                    title: string;
                };
                filters: {
                    type: string;
                    properties: {
                        defaultTab: {
                            type: string;
                        };
                        minScore: {
                            type: string;
                            minimum: number;
                        };
                        onlyMembers: {
                            type: string;
                        };
                        invalids: {
                            type: string;
                            items: {
                                type: string;
                                maxLength: number;
                            };
                            title: string;
                        };
                    };
                    additionalProperties: boolean;
                };
                plugins: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        proposal: {
            title: string;
            type: string;
            properties: {
                name: {
                    type: string;
                    title: string;
                    minLength: number;
                    maxLength: number;
                };
                body: {
                    type: string;
                    title: string;
                    minLength: number;
                    maxLength: number;
                };
                choices: {
                    type: string;
                    title: string;
                    minItems: number;
                    maxItems: number;
                };
                type: {
                    type: string;
                    enum: string[];
                };
                snapshot: {
                    type: string;
                    title: string;
                };
                start: {
                    type: string;
                    title: string;
                    minimum: number;
                    maximum: number;
                };
                end: {
                    type: string;
                    title: string;
                    minimum: number;
                    maximum: number;
                    exclusiveMinimum: {
                        $data: string;
                    };
                };
                metadata: {
                    type: string;
                    title: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        vote: {
            title: string;
            type: string;
            properties: {
                proposal: {
                    type: string;
                    title: string;
                };
                choice: {
                    type: string[];
                    title: string;
                };
                metadata: {
                    type: string;
                    title: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
    };
    utils: {
        call: typeof import("./utils").call;
        multicall: typeof import("./utils").multicall;
        subgraphRequest: typeof import("./utils").subgraphRequest;
        ipfsGet: typeof import("./utils").ipfsGet;
        sendTransaction: typeof import("./utils").sendTransaction;
        getScores: typeof import("./utils").getScores;
        validateSchema: typeof import("./utils").validateSchema;
        getProvider: typeof import("./utils/provider").default;
        decodeContenthash: typeof import("./utils/contentHash").decodeContenthash;
        validateContent: typeof import("./utils/contentHash").validateContent;
        isValidContenthash: typeof import("./utils/contentHash").isValidContenthash;
        encodeContenthash: typeof import("./utils/contentHash").encodeContenthash;
        resolveENSContentHash: typeof import("./utils/contentHash").resolveENSContentHash;
        resolveContent: typeof import("./utils/contentHash").resolveContent;
        signMessage: typeof import("./utils/web3").signMessage;
        getBlockNumber: typeof import("./utils/web3").getBlockNumber;
        Multicaller: typeof import("./utils/multicaller").default;
    };
};
export default _default;
