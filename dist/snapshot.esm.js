import { bufferToHex } from 'ethereumjs-util';
import { BigNumber } from '@ethersproject/bignumber';
import { toUtf8Bytes } from '@ethersproject/strings';
import { Interface } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';
import { EnumType, jsonToGraphQLQuery } from 'json-to-graphql-query';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { getAddress, isAddress } from '@ethersproject/address';
import { formatUnits, parseUnits } from '@ethersproject/units';
import namehash from 'eth-ens-namehash';
import fetch$1 from 'cross-fetch';
import { JsonRpcProvider } from '@ethersproject/providers';
import set from 'lodash.set';
import contentHash from '@ensdomains/content-hash';
import { namehash as namehash$1, _TypedDataEncoder } from '@ethersproject/hash';
import { isHexString } from '@ethersproject/bytes';
import bs58 from 'bs58';
import { isBigNumberish, BigNumber as BigNumber$1 } from '@ethersproject/bignumber/lib/bignumber';
import { HashZero } from '@ethersproject/constants';
import { keccak256 } from '@ethersproject/solidity';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function signMessage(web3, msg, address) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    msg = bufferToHex(new Buffer(msg, 'utf8'));
                    return [4 /*yield*/, web3.send('personal_sign', [msg, address])];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getBlockNumber(provider) {
    return __awaiter(this, void 0, void 0, function () {
        var blockNumber, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, provider.getBlockNumber()];
                case 1:
                    blockNumber = _a.sent();
                    return [2 /*return*/, parseInt(blockNumber)];
                case 2:
                    e_1 = _a.sent();
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}

var hubs = [
	"https://hub.snapshot.org",
	"https://testnet.snapshot.org"
];

var version = "0.1.3";

var Client = /** @class */ (function () {
    function Client(address) {
        if (address === void 0) { address = hubs[0]; }
        this.address = address;
    }
    Client.prototype.request = function (command, body) {
        var url = this.address + "/api/" + command;
        var init;
        if (body) {
            init = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };
        }
        return new Promise(function (resolve, reject) {
            fetch(url, init)
                .then(function (res) {
                if (res.ok)
                    return resolve(res.json());
                throw res;
            })
                .catch(function (e) { return e.json().then(function (json) { return reject(json); }); });
        });
    };
    Client.prototype.send = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('message', msg)];
            });
        });
    };
    Client.prototype.getSpaces = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('spaces')];
            });
        });
    };
    Client.prototype.getProposals = function (space) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request(space + "/proposals")];
            });
        });
    };
    Client.prototype.getVotes = function (space, proposalId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request(space + "/proposal/" + proposalId)];
            });
        });
    };
    Client.prototype.broadcast = function (web3, account, space, type, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        msg = {
                            address: account,
                            msg: JSON.stringify({
                                version: version,
                                timestamp: (Date.now() / 1e3).toFixed(),
                                space: space,
                                type: type,
                                payload: payload
                            })
                        };
                        _a = msg;
                        return [4 /*yield*/, signMessage(web3, msg.msg, account)];
                    case 1:
                        _a.sig = _b.sent();
                        return [4 /*yield*/, this.send(msg)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return Client;
}());

var abi = [
	{
		constant: true,
		inputs: [
			{
				components: [
					{
						name: "target",
						type: "address"
					},
					{
						name: "callData",
						type: "bytes"
					}
				],
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "aggregate",
		outputs: [
			{
				name: "blockNumber",
				type: "uint256"
			},
			{
				name: "returnData",
				type: "bytes[]"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "addr",
				type: "address"
			}
		],
		name: "getEthBalance",
		outputs: [
			{
				name: "balance",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var BALANCER_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer',
    '42': 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-kovan'
};
function strategy(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var params, score, version_1, versionString, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        poolShares: {
                            __args: {
                                where: {
                                    userAddress_in: addresses.map(function (address) { return address.toLowerCase(); }),
                                    balance_gt: 0
                                },
                                first: 1000,
                                orderBy: 'balance',
                                orderDirection: 'desc'
                            },
                            userAddress: {
                                id: true
                            },
                            balance: true,
                            poolId: {
                                totalShares: true,
                                tokens: {
                                    id: true,
                                    balance: true
                                }
                            }
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        params.poolShares.__args.block = { number: snapshot };
                    }
                    score = {};
                    version_1 = 1;
                    _a.label = 1;
                case 1:
                    if (!(version_1 <= 2)) return [3 /*break*/, 4];
                    versionString = '';
                    if (version_1 == 2) {
                        versionString = '-v2';
                    }
                    return [4 /*yield*/, subgraphRequest(BALANCER_SUBGRAPH_URL[network] + versionString, params)];
                case 2:
                    result = _a.sent();
                    if (result && result.poolShares) {
                        result.poolShares.forEach(function (poolShare) {
                            return poolShare.poolId.tokens.map(function (poolToken) {
                                var _a = poolToken.id.split('-'), tokenAddress = _a[1];
                                if (tokenAddress === options.address.toLowerCase()) {
                                    var userAddress = getAddress(poolShare.userAddress.id);
                                    if (!score[userAddress])
                                        score[userAddress] = 0;
                                    score[userAddress] =
                                        score[userAddress] +
                                            (poolToken.balance / poolShare.poolId.totalShares) *
                                                poolShare.balance;
                                }
                            });
                        });
                    }
                    _a.label = 3;
                case 3:
                    version_1++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, score || {}];
            }
        });
    });
}

function getArgs(options, address) {
    var args = options.args || ['%{address}'];
    return args.map(function (arg) {
        return typeof arg === 'string' ? arg.replace(/%{address}/g, address) : arg;
    });
}
function strategy$1(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, [options.methodABI], addresses.map(function (address) { return [
                            options.address,
                            options.methodABI.name,
                            getArgs(options, address)
                        ]; }), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.toString(), options.decimals))
                        ]; }))];
            }
        });
    });
}

var ENS_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
    '3': 'https://api.thegraph.com/subgraphs/name/ensdomains/ensropsten',
    '4': 'https://api.thegraph.com/subgraphs/name/ensdomains/ensrinkeby',
    '5': 'https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli'
};
function strategy$2(_space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var params, result, score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        domains: {
                            __args: {
                                where: {
                                    name: options.domain
                                },
                                first: 1000
                            },
                            id: true,
                            labelName: true,
                            subdomains: {
                                __args: {
                                    where: {
                                        owner_in: addresses.map(function (address) { return address.toLowerCase(); })
                                    }
                                },
                                owner: {
                                    id: true
                                }
                            }
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        params.domains.__args.block = { number: snapshot };
                    }
                    return [4 /*yield*/, subgraphRequest(ENS_SUBGRAPH_URL[network], params)];
                case 1:
                    result = _a.sent();
                    score = {};
                    if (result && result.domains) {
                        result.domains.forEach(function (u) {
                            u.subdomains.forEach(function (domain) {
                                var userAddress = getAddress(domain.owner.id);
                                if (!score[userAddress])
                                    score[userAddress] = 0;
                                score[userAddress] = score[userAddress] + 1;
                            });
                        });
                    }
                    return [2 /*return*/, score || {}];
            }
        });
    });
}

var abi$1 = [
    {
        inputs: [
            {
                internalType: 'address[]',
                name: 'addresses',
                type: 'address[]'
            }
        ],
        name: 'getNames',
        outputs: [
            {
                internalType: 'string[]',
                name: 'r',
                type: 'string[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
var CONTRACTS = {
    '1': '0x3671aE578E63FdF66ad4F3E12CC0c0d71Ac7510C',
    '3': '0x5bBFe410e18DCcaebbf5fD7A00844d4255615258',
    '4': '0x196eC7109e127A353B709a20da25052617295F6f',
    '5': '0x333Fc8f550043f239a2CF79aEd5e9cF4A20Eb41e'
};
function strategy$3(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, contractAdress, response, r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    contractAdress = CONTRACTS[network];
                    return [4 /*yield*/, call(provider, abi$1, [contractAdress, 'getNames', [addresses]], { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    r = Object.fromEntries(response.map(function (value, i) {
                        var isEligible = value !== '' &&
                            namehash.normalize(value) === value &&
                            value.split('.').length === 2; // no subdomain
                        var number = isEligible ? 1 : 0;
                        return [addresses[i], number];
                    }));
                    return [2 /*return*/, r];
            }
        });
    });
}

var abi$2 = [
    'function balanceOf(address account) external view returns (uint256)'
];
function strategy$4(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$2, addresses.map(function (address) { return [options.address, 'balanceOf', [address]]; }), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.toString(), options.decimals))
                        ]; }))];
            }
        });
    });
}

function strategy$5(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, strategy$4(space, network, provider, addresses, options, snapshot)];
                case 1:
                    score = _a.sent();
                    return [2 /*return*/, Object.fromEntries(Object.entries(score).map(function (address) { return [
                            address[0],
                            address[1] * options.coeff
                        ]; }))];
            }
        });
    });
}

function strategy$6(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var score, totalScore;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, strategy$4(space, network, provider, addresses, options, snapshot)];
                case 1:
                    score = _a.sent();
                    totalScore = Object.values(score).reduce(function (a, b) { return a + b; }, 0);
                    return [2 /*return*/, Object.fromEntries(Object.entries(score).map(function (address) { return [
                            address[0],
                            (options.total * address[1]) / totalScore
                        ]; }))];
            }
        });
    });
}

function strategy$7(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, strategy$4(space, network, provider, addresses, options, snapshot)];
                case 1:
                    score = _a.sent();
                    return [2 /*return*/, Object.fromEntries(Object.entries(score).map(function (address) { return [address[0], Math.sqrt(address[1])]; }))];
            }
        });
    });
}

function strategy$8(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, strategy$4(space, network, provider, addresses, options, snapshot)];
                case 1:
                    score = _a.sent();
                    return [2 /*return*/, Object.fromEntries(Object.entries(score).map(function (address) { return [
                            address[0],
                            address[1] > (options.minBalance || 0) ? 1 : 0
                        ]; }))];
            }
        });
    });
}

function getDelegations(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var addressesLc, spaceIn, params, result, delegations, delegationsReverse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    addressesLc = addresses.map(function (addresses) { return addresses.toLowerCase(); });
                    spaceIn = ['', space];
                    if (space.includes('.eth'))
                        spaceIn.push(space.replace('.eth', ''));
                    params = {
                        delegations: {
                            __args: {
                                where: {
                                    // delegate_in: addressesLc,
                                    // delegator_not_in: addressesLc,
                                    space_in: spaceIn
                                },
                                first: 1000
                            },
                            delegator: true,
                            space: true,
                            delegate: true
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        params.delegations.__args.block = { number: snapshot };
                    }
                    return [4 /*yield*/, subgraphRequest(SNAPSHOT_SUBGRAPH_URL[network], params)];
                case 1:
                    result = _a.sent();
                    if (!(result === null || result === void 0 ? void 0 : result.delegations))
                        return [2 /*return*/, {}];
                    delegations = result.delegations.filter(function (delegation) {
                        return addressesLc.includes(delegation.delegate) &&
                            !addressesLc.includes(delegation.delegator);
                    });
                    if (!delegations)
                        return [2 /*return*/, {}];
                    delegationsReverse = {};
                    delegations.forEach(function (delegation) {
                        return (delegationsReverse[delegation.delegator] = delegation.delegate);
                    });
                    delegations
                        .filter(function (delegation) { return delegation.space !== ''; })
                        .forEach(function (delegation) {
                        return (delegationsReverse[delegation.delegator] = delegation.delegate);
                    });
                    return [2 /*return*/, Object.fromEntries(addresses.map(function (address) { return [
                            address,
                            Object.entries(delegationsReverse)
                                .filter(function (_a) {
                                var delegate = _a[1];
                                return address.toLowerCase() === delegate;
                            })
                                .map(function (_a) {
                                var delegator = _a[0];
                                return getAddress(delegator);
                            })
                        ]; }))];
            }
        });
    });
}

function strategy$9(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var delegations, score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDelegations(space, network, provider, addresses, options, snapshot)];
                case 1:
                    delegations = _a.sent();
                    if (Object.keys(delegations).length === 0)
                        return [2 /*return*/, {}];
                    console.debug('Delegations', delegations);
                    return [4 /*yield*/, strategy$4(space, network, provider, Object.values(delegations).reduce(function (a, b) {
                            return a.concat(b);
                        }), options, snapshot)];
                case 2:
                    score = _a.sent();
                    console.debug('Delegators score', score);
                    return [2 /*return*/, Object.fromEntries(addresses.map(function (address) {
                            var addressScore = delegations[address]
                                ? delegations[address].reduce(function (a, b) { return a + score[b]; }, 0)
                                : 0;
                            return [address, addressScore];
                        }))];
            }
        });
    });
}

function strategy$a(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, strategy$4(space, network, provider, addresses, options, snapshot)];
                case 1:
                    score = _a.sent();
                    Object.keys(score).forEach(function (key) {
                        if (score[key] >= (options.minBalance || 0))
                            score[key] = score[key];
                        else
                            score[key] = 0;
                    });
                    return [2 /*return*/, score];
            }
        });
    });
}

function strategy$b(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi, addresses.map(function (address) { return [
                            MULTICALL[network],
                            'getEthBalance',
                            [address]
                        ]; }), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.toString(), 18))
                        ]; }))];
            }
        });
    });
}

var getJWT = function (dfuseApiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var rawResponse, content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch$1('https://auth.dfuse.io/v1/auth/issue', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ api_key: dfuseApiKey })
                })];
            case 1:
                rawResponse = _a.sent();
                return [4 /*yield*/, rawResponse.json()];
            case 2:
                content = _a.sent();
                return [2 /*return*/, content.token];
        }
    });
}); };
function strategy$c(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var data, query, dfuseJWT;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = [];
                    query = Object.fromEntries(addresses.map(function (address) { return [
                        "_" + address,
                        {
                            __aliasFor: 'searchTransactions',
                            __args: {
                                indexName: new EnumType('CALLS'),
                                query: "(from:" + address + " OR to:" + address + ")",
                                sort: new EnumType('ASC'),
                                limit: 1
                            },
                            edges: {
                                block: {
                                    header: {
                                        timestamp: true
                                    },
                                    number: true
                                },
                                node: {
                                    from: true,
                                    to: true
                                }
                            }
                        }
                    ]; }));
                    return [4 /*yield*/, getJWT(options.dfuseApiKey || 'web_f527db575a38dd11c5b686d7da54d371')];
                case 1:
                    dfuseJWT = _a.sent();
                    return [4 /*yield*/, subgraphRequest('https://mainnet.eth.dfuse.io/graphql', query, {
                            headers: {
                                Authorization: "Bearer " + dfuseJWT
                            }
                        })];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, Object.fromEntries(Object.values(data).map(function (value, i) { return [
                            addresses[i],
                            (function () {
                                var _a, _b, _c;
                                var today = new Date().getTime();
                                var firstTransaction = ((_c = (_b = (_a = value.edges[0]) === null || _a === void 0 ? void 0 : _a.block) === null || _b === void 0 ? void 0 : _b.header) === null || _c === void 0 ? void 0 : _c.timestamp) || today;
                                var diffInSeconds = Math.abs(firstTransaction - today);
                                var walletAgeInDays = Math.floor(diffInSeconds / 1000 / 60 / 60 / 24);
                                return walletAgeInDays;
                            })()
                        ]; }))];
            }
        });
    });
}

var wanchain = {
	key: "wanchain",
	name: "Wanchain",
	chainId: 1,
	network: "mainnet",
	rpc: [
		"https://gwan-ssl.wandevs.org:56891"
	],
	ws: [
		"wss://api.wanchain.org:8443/ws/v3/ddd16770c68f30350a21114802d5418eafe039b722de52b488e7eee1ee2cd73f"
	],
	explorer: "https://www.wanscan.org"
};
var networks = {
	"1": {
	key: "1",
	name: "Ethereum Mainnet",
	chainId: 1,
	network: "homestead",
	rpc: [
		{
			url: "https://api-geth-archive.ankr.com",
			user: "balancer_user",
			password: "balancerAnkr20201015"
		},
		"https://eth-archival.gateway.pokt.network/v1/5f76124fb90218002e9ce985",
		"https://eth-mainnet.alchemyapi.io/v2/4bdDVB5QAaorY2UE-GBUbM2yQB3QJqzv",
		"https://cloudflare-eth.com"
	],
	ws: [
		"wss://eth-mainnet.ws.alchemyapi.io/v2/4bdDVB5QAaorY2UE-GBUbM2yQB3QJqzv"
	],
	explorer: "https://etherscan.io"
},
	"3": {
	key: "3",
	name: "Ethereum Testnet Ropsten",
	shortName: "Ropsten",
	chainId: 3,
	network: "ropsten",
	rpc: [
		"https://eth-ropsten.alchemyapi.io/v2/QzGz6gdkpTyDzebi3PjxIaKO7bDTGnSy"
	],
	explorer: "https://ropsten.etherscan.io"
},
	"4": {
	key: "4",
	name: "Ethereum Testnet Rinkeby",
	shortName: "Rinkeby",
	chainId: 4,
	network: "rinkeby",
	rpc: [
		"https://eth-rinkeby.alchemyapi.io/v2/ugiPEBqMebLQbjro42kalZ1h4StpW_fR",
		"https://eth-rinkeby.gateway.pokt.network/v1/5f76124fb90218002e9ce985"
	],
	ws: [
		"wss://eth-rinkeby.ws.alchemyapi.io/v2/twReQE9Px03E-E_N_Fbb3OVF7YgHxoGq"
	],
	explorer: "https://rinkeby.etherscan.io"
},
	"5": {
	key: "5",
	name: "Ethereum Testnet Görli",
	shortName: "Görli",
	chainId: 5,
	network: "goerli",
	rpc: [
		"https://eth-goerli.alchemyapi.io/v2/v4nqH_J-J3STit45Mm07TxuYexMHQsYZ"
	],
	explorer: "https://goerli.etherscan.io"
},
	"7": {
	key: "7",
	name: "ThaiChain",
	chainId: 7,
	network: "mainnet",
	rpc: [
		"https://rpc.dome.cloud"
	],
	ws: [
		"wss://ws.dome.cloud"
	],
	explorer: "https://exp.tch.in.th"
},
	"30": {
	key: "30",
	name: "RSK Mainnet",
	chainId: 30,
	network: "rsk mainnet",
	rpc: [
		"https://public-node.rsk.co"
	],
	explorer: "https://explorer.rsk.co"
},
	"31": {
	key: "31",
	name: "RSK Testnet",
	chainId: 31,
	network: "rsk testnet",
	rpc: [
		"https://public-node.testnet.rsk.co"
	],
	explorer: "https://explorer.testnet.rsk.co"
},
	"42": {
	key: "42",
	name: "Ethereum Testnet Kovan",
	shortName: "Kovan",
	chainId: 42,
	network: "kovan",
	rpc: [
		"https://eth-kovan.alchemyapi.io/v2/s96TIUFYg0LuddgpmafA040ZyUaZbrpM",
		"https://poa-kovan.gateway.pokt.network/v1/5f76124fb90218002e9ce985"
	],
	ws: [
		"wss://eth-kovan.ws.alchemyapi.io/v2/QCsM2iU0bQ49eGDmZ7-Y--Wpu0lVWXSO"
	],
	explorer: "https://kovan.etherscan.io"
},
	"50": {
	key: "50",
	name: "XinFin MainNet",
	shortName: "XDC",
	chainId: 50,
	network: "mainnet",
	rpc: [
		"https://rpc.xinfin.network"
	],
	ws: [
		"wss://ws.xinfin.network"
	],
	explorer: "http://explorer.xinfin.network/"
},
	"56": {
	key: "56",
	name: "Binance Smart Chain Mainnet",
	shortName: "BSC",
	chainId: 56,
	network: "mainnet",
	rpc: [
		"https://bsc.getblock.io/mainnet/?api_key=91f8195f-bf46-488f-846a-73d6853790e7",
		"https://bsc-private-dataseed1.nariox.org",
		"https://bsc-private-dataseed2.nariox.org",
		"https://bsc-dataseed1.ninicoin.io",
		"https://bsc-dataseed1.binance.org",
		"https://bsc-dataseed2.binance.org",
		"https://bsc-dataseed3.binance.org"
	],
	explorer: "https://bscscan.com"
},
	"61": {
	key: "61",
	name: "Ethereum Classic Mainnet",
	shortName: "Ethereum Classic",
	chainId: 61,
	network: "mainnet",
	rpc: [
		"https://ethereumclassic.network"
	],
	explorer: "https://blockscout.com/etc/mainnet"
},
	"82": {
	key: "82",
	name: "Meter Mainnet",
	shortName: "Meter",
	chainId: 82,
	network: "mainnet",
	rpc: [
		"https://rpc.meter.io"
	],
	explorer: "https://scan.meter.io"
},
	"97": {
	key: "97",
	name: "Binance Smart Chain Testnet",
	shortName: "BSC Testnet",
	chainId: 97,
	network: "testnet",
	rpc: [
		"https://data-seed-prebsc-1-s1.binance.org:8545"
	],
	explorer: "https://testnet.bscscan.com"
},
	"99": {
	key: "99",
	name: "POA Core",
	shortName: "POA",
	chainId: 99,
	network: "mainnet",
	rpc: [
		"https://core.poa.network"
	],
	explorer: "https://blockscout.com/poa/core/"
},
	"100": {
	key: "100",
	name: "xDAI Chain",
	shortName: "xDAI",
	chainId: 100,
	network: "mainnet",
	rpc: [
		"https://xdai-archive.blockscout.com",
		"https://poa-xdai.gateway.pokt.network/v1/5f76124fb90218002e9ce985"
	],
	ws: [
		"wss://rpc.xdaichain.com/wss"
	],
	explorer: "https://blockscout.com/poa/xdai"
},
	"108": {
	key: "108",
	name: "Thundercore Mainnet",
	chainId: 108,
	network: "mainnet",
	rpc: [
		"https://mainnet-rpc.thundercore.com"
	],
	explorer: "https://scan.thundercore.com"
},
	"128": {
	key: "128",
	name: "Huobi Eco Chain Mainnet",
	shortName: "heco",
	chainId: 128,
	network: "Mainnet",
	rpc: [
		"https://http-mainnet.hecochain.com"
	],
	ws: [
		"wss://ws-mainnet-node.huobichain.com"
	],
	explorer: "https://hecoinfo.com"
},
	"137": {
	key: "137",
	name: "Matic Mainnet",
	shortName: "Matic",
	chainId: 137,
	network: "mainnet",
	rpc: [
		"https://rpc-mainnet.maticvigil.com/v1/1cfd7598e5ba6dcf0b4db58e8be484badc6ea08e"
	],
	ws: [
		"wss://ws-mainnet.matic.network"
	],
	explorer: ""
},
	"250": {
	key: "250",
	name: "Fantom Opera",
	shortName: "fantom",
	chainId: 250,
	network: "Mainnet",
	rpc: [
		"https://rpcapi.fantom.network"
	],
	explorer: "https://ftmscan.com"
},
	"256": {
	key: "256",
	name: "Huobi Eco Chain Testnet",
	shortName: "heco",
	chainId: 256,
	network: "testnet",
	rpc: [
		"https://http-testnet.hecochain.com"
	],
	ws: [
		"wss://ws-testnet.hecochain.com"
	],
	explorer: "https://testnet.hecoinfo.com"
},
	"499": {
	key: "499",
	name: "Rupaya",
	shortName: "RUPX",
	chainId: 499,
	network: "mainnet",
	rpc: [
		"https://rpc.rupx.io"
	],
	ws: [
		"wss://ws.rupx.io"
	],
	explorer: "http://scan.rupx.io"
},
	"1287": {
	key: "1287",
	name: "Moonbase Alpha TestNet",
	shortName: "Moonbase",
	chainId: 1287,
	network: "testnet",
	rpc: [
		"https://rpc.testnet.moonbeam.network"
	],
	explorer: "https://moonbase-blockscout.testnet.moonbeam.network/"
},
	"2109": {
	key: "2109",
	name: "Avalanche",
	chainId: 43114,
	network: "mainnet",
	rpc: [
		"https://api.avax.network/ext/bc/C/rpc"
	],
	explorer: "https://cchain.explorer.avax.network"
},
	"32659": {
	key: "32659",
	name: "Fusion Mainnet",
	chainId: 32659,
	network: "mainnet",
	rpc: [
		"https://vote.anyswap.exchange/mainnet"
	],
	ws: [
		"wss://mainnetpublicgateway1.fusionnetwork.io:10001"
	],
	explorer: "https://fsnex.com"
},
	"80001": {
	key: "80001",
	name: "Matic Mumbai",
	chainId: 80001,
	network: "testnet",
	rpc: [
		"https://rpc-mumbai.matic.today"
	],
	ws: [
		"wss://ws-mumbai.matic.today"
	],
	explorer: ""
},
	"1666600000": {
	key: "1666600000",
	name: "Harmony Mainnet",
	shortName: "HarmonyMainnet",
	chainId: 1666600000,
	network: "mainnet",
	rpc: [
		"https://a.api.s0.t.hmny.io"
	],
	ws: [
		"wss://ws.s0.t.hmny.io"
	],
	explorer: "https://explorer.harmony.one"
},
	"1666700000": {
	key: "1666700000",
	name: "Harmony Testnet",
	shortName: "HarmonyTestnet",
	chainId: 1666700000,
	network: "testnet",
	rpc: [
		"https://api.s0.b.hmny.io"
	],
	ws: [
		"wss://ws.s0.b.hmny.io"
	],
	explorer: "https://explorer.pops.one"
},
	wanchain: wanchain
};

var defaultGraphs = {
    '56': 'https://api.thegraph.com/subgraphs/name/apyvision/block-info',
    '137': 'https://api.thegraph.com/subgraphs/name/sameepsi/maticblocks'
};
function getChainBlockNumber(timestamp, graphURL) {
    return __awaiter(this, void 0, void 0, function () {
        var query, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {
                        blocks: {
                            __args: {
                                first: 1,
                                orderBy: 'number',
                                orderDirection: 'desc',
                                where: {
                                    timestamp_lte: timestamp
                                }
                            },
                            number: true,
                            timestamp: true
                        }
                    };
                    return [4 /*yield*/, subgraphRequest(graphURL, query)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, Number(data.blocks[0].number)];
            }
        });
    });
}
function getChainBlocks(snapshot, provider, options, network) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, block, chainBlocks, _i, _b, strategy_1, graph, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, provider.getBlock(blockTag)];
                case 1:
                    block = _e.sent();
                    chainBlocks = {};
                    _i = 0, _b = options.strategies;
                    _e.label = 2;
                case 2:
                    if (!(_i < _b.length)) return [3 /*break*/, 6];
                    strategy_1 = _b[_i];
                    if (chainBlocks[strategy_1.network]) {
                        return [3 /*break*/, 5];
                    }
                    if (!(blockTag === 'latest' || strategy_1.network === network)) return [3 /*break*/, 3];
                    chainBlocks[strategy_1.network] = blockTag;
                    return [3 /*break*/, 5];
                case 3:
                    graph = ((_a = options.graphs) === null || _a === void 0 ? void 0 : _a[strategy_1.network]) || defaultGraphs[strategy_1.network];
                    _c = chainBlocks;
                    _d = strategy_1.network;
                    return [4 /*yield*/, getChainBlockNumber(block.timestamp, graph)];
                case 4:
                    _c[_d] = _e.sent();
                    _e.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/, chainBlocks];
            }
        });
    });
}
function strategy$d(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var promises, chainBlocks, _i, _a, strategy_2, results;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    promises = [];
                    return [4 /*yield*/, getChainBlocks(snapshot, provider, options, network)];
                case 1:
                    chainBlocks = _b.sent();
                    for (_i = 0, _a = options.strategies; _i < _a.length; _i++) {
                        strategy_2 = _a[_i];
                        promises.push(strategies[strategy_2.name](space, strategy_2.network, new JsonRpcProvider(networks[strategy_2.network].rpc[0]), addresses, strategy_2.params, chainBlocks[strategy_2.network]));
                    }
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    results = _b.sent();
                    return [2 /*return*/, results.reduce(function (finalResults, strategyResult) {
                            for (var _i = 0, _a = Object.entries(strategyResult); _i < _a.length; _i++) {
                                var _b = _a[_i], address = _b[0], value = _b[1];
                                if (!finalResults[address]) {
                                    finalResults[address] = 0;
                                }
                                finalResults[address] += value;
                            }
                            return finalResults;
                        }, {})];
            }
        });
    });
}

var MAKER_DS_CHIEF_ADDRESS = {
    '1': '0x9ef05f7f6deb616fd37ac3c959a2ddd25a54e4f5'
};
var abi$3 = [
    {
        constant: true,
        inputs: [
            {
                name: '',
                type: 'address'
            }
        ],
        name: 'deposits',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$e(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$3, addresses.map(function (address) { return [
                            MAKER_DS_CHIEF_ADDRESS[network],
                            'deposits',
                            [address]
                        ]; }), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.toString(), options.decimals))
                        ]; }))];
            }
        });
    });
}

var UNI_ADDRESS = {
    '1': '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
};
var abi$4 = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'getCurrentVotes',
        outputs: [
            {
                internalType: 'uint96',
                name: '',
                type: 'uint96'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$f(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$4, addresses.map(function (address) { return [
                            UNI_ADDRESS[network],
                            'getCurrentVotes',
                            [address.toLowerCase()],
                            { blockTag: blockTag }
                        ]; }))];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.toString(), options.decimals))
                        ]; }))];
            }
        });
    });
}

var abi$5 = [
    {
        constant: true,
        inputs: [],
        name: 'getPricePerFullShare',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$g(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, _a, score, pricePerFullShare;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, Promise.all([
                            strategy$4(space, network, provider, addresses, options, snapshot),
                            multicall(network, provider, abi$5, [[options.address, 'getPricePerFullShare', []]], { blockTag: blockTag })
                        ])];
                case 1:
                    _a = _b.sent(), score = _a[0], pricePerFullShare = _a[1][0];
                    pricePerFullShare = parseFloat(formatUnits(pricePerFullShare.toString(), 18));
                    return [2 /*return*/, Object.fromEntries(Object.entries(score).map(function (address) { return [
                            address[0],
                            address[1] * pricePerFullShare
                        ]; }))];
            }
        });
    });
}

var BIG6 = BigNumber.from('1000000');
var BIG18 = BigNumber.from('1000000000000000000');
// 0.0.1: First iteration. FXS Plus FXS in LPs
// 0.0.2: Adds veFXS
var DECIMALS = 18;
var abi$6 = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'boostedBalanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getReserves',
        outputs: [
            {
                internalType: 'uint112',
                name: '_reserve0',
                type: 'uint112'
            },
            {
                internalType: 'uint112',
                name: '_reserve1',
                type: 'uint112'
            },
            {
                internalType: 'uint32',
                name: '_blockTimestampLast',
                type: 'uint32'
            }
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true
    },
    {
        inputs: [],
        name: 'token0',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
var chunk = function (arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, function (v, i) {
        return arr.slice(i * size, i * size + size);
    });
};
function strategy$h(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, fxsQuery, vefxsQuery, freeUniLPFraxFxsQuery, farmingUniLPFraxFxsQuery, freeSushiLPFraxFxsQuery, farmingSushiLPFraxFxsQuery, freeSushiLPFxsWethQuery, farmingSushiLPFxsWethQuery, response, uniLPFraxFxs_token0, uniLPFraxFxs_getReserves, uniLPFraxFxs_totalSupply, sushiLPFraxFxs_token0, sushiLPFraxFxs_getReserves, sushiLPFraxFxs_totalSupply, sushiLPFxsWeth_token0, sushiLPFxsWeth_getReserves, sushiLPFxsWeth_totalSupply, uniLPFraxFxs_fxs_per_LP_E18, uni_FraxFxs_reservesFXS_E0, uni_FraxFxs_totalSupply_E0, sushiLPFraxFxs_fxs_per_LP_E18, sushi_FraxFxs_reservesFXS_E0, sushi_FraxFxs_totalSupply_E0, sushiLPFxsWeth_fxs_per_LP_E18, sushi_FxsWeth_reservesFXS_E0, sushi_FxsWeth_totalSupply_E0, responseClean, chunks, fxsBalances, vefxsBalances, freeUniFraxFxsBalances, farmUniFraxFxsBalances, freeSushiFraxFxsBalances, farmSushiFraxFxsBalances, freeSushiFxsWethBalances, farmSushiFxsWethBalances;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    fxsQuery = addresses.map(function (address) { return [
                        options.FXS,
                        'balanceOf',
                        [address]
                    ]; });
                    vefxsQuery = addresses.map(function (address) { return [
                        options.VEFXS,
                        'balanceOf',
                        [address]
                    ]; });
                    freeUniLPFraxFxsQuery = addresses.map(function (address) { return [
                        options.UNI_LP_FRAX_FXS,
                        'balanceOf',
                        [address]
                    ]; });
                    farmingUniLPFraxFxsQuery = addresses.map(function (address) { return [
                        options.FARMING_UNI_LP_FRAX_FXS,
                        'boostedBalanceOf',
                        [address]
                    ]; });
                    freeSushiLPFraxFxsQuery = addresses.map(function (address) { return [
                        options.SUSHI_LP_FRAX_FXS,
                        'balanceOf',
                        [address]
                    ]; });
                    farmingSushiLPFraxFxsQuery = addresses.map(function (address) { return [
                        options.FARMING_SUSHI_LP_FRAX_FXS,
                        'boostedBalanceOf',
                        [address]
                    ]; });
                    freeSushiLPFxsWethQuery = addresses.map(function (address) { return [
                        options.SUSHI_LP_FXS_WETH,
                        'balanceOf',
                        [address]
                    ]; });
                    farmingSushiLPFxsWethQuery = addresses.map(function (address) { return [
                        options.FARMING_SUSHI_LP_FXS_WETH,
                        'boostedBalanceOf',
                        [address]
                    ]; });
                    return [4 /*yield*/, multicall(network, provider, abi$6, __spreadArrays([
                            // Get 1inch LP OPIUM-ETH balance of OPIUM
                            // [options.OPIUM, 'balanceOf', [options.LP_1INCH_OPIUM_ETH]],
                            [options.UNI_LP_FRAX_FXS, 'token0'],
                            [options.UNI_LP_FRAX_FXS, 'getReserves'],
                            [options.UNI_LP_FRAX_FXS, 'totalSupply'],
                            [options.SUSHI_LP_FRAX_FXS, 'token0'],
                            [options.SUSHI_LP_FRAX_FXS, 'getReserves'],
                            [options.SUSHI_LP_FRAX_FXS, 'totalSupply'],
                            [options.SUSHI_LP_FXS_WETH, 'token0'],
                            [options.SUSHI_LP_FXS_WETH, 'getReserves'],
                            [options.SUSHI_LP_FXS_WETH, 'totalSupply']
                        ], fxsQuery, vefxsQuery, freeUniLPFraxFxsQuery, farmingUniLPFraxFxsQuery, freeSushiLPFraxFxsQuery, farmingSushiLPFraxFxsQuery, freeSushiLPFxsWethQuery, farmingSushiLPFxsWethQuery), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    uniLPFraxFxs_token0 = response[0];
                    uniLPFraxFxs_getReserves = response[1];
                    uniLPFraxFxs_totalSupply = response[2];
                    sushiLPFraxFxs_token0 = response[3];
                    sushiLPFraxFxs_getReserves = response[4];
                    sushiLPFraxFxs_totalSupply = response[5];
                    sushiLPFxsWeth_token0 = response[6];
                    sushiLPFxsWeth_getReserves = response[7];
                    sushiLPFxsWeth_totalSupply = response[8];
                    if (uniLPFraxFxs_token0[0] == options.FXS)
                        uni_FraxFxs_reservesFXS_E0 = uniLPFraxFxs_getReserves[0];
                    else
                        uni_FraxFxs_reservesFXS_E0 = uniLPFraxFxs_getReserves[1];
                    uni_FraxFxs_totalSupply_E0 = uniLPFraxFxs_totalSupply[0];
                    uniLPFraxFxs_fxs_per_LP_E18 = uni_FraxFxs_reservesFXS_E0
                        .mul(BIG18)
                        .div(uni_FraxFxs_totalSupply_E0);
                    if (sushiLPFraxFxs_token0[0] == options.FXS)
                        sushi_FraxFxs_reservesFXS_E0 = sushiLPFraxFxs_getReserves[0];
                    else
                        sushi_FraxFxs_reservesFXS_E0 = sushiLPFraxFxs_getReserves[1];
                    sushi_FraxFxs_totalSupply_E0 = sushiLPFraxFxs_totalSupply[0];
                    sushiLPFraxFxs_fxs_per_LP_E18 = sushi_FraxFxs_reservesFXS_E0
                        .mul(BIG18)
                        .div(sushi_FraxFxs_totalSupply_E0);
                    if (sushiLPFxsWeth_token0[0] == options.FXS)
                        sushi_FxsWeth_reservesFXS_E0 = sushiLPFxsWeth_getReserves[0];
                    else
                        sushi_FxsWeth_reservesFXS_E0 = sushiLPFxsWeth_getReserves[1];
                    sushi_FxsWeth_totalSupply_E0 = sushiLPFxsWeth_totalSupply[0];
                    sushiLPFxsWeth_fxs_per_LP_E18 = sushi_FxsWeth_reservesFXS_E0
                        .mul(BIG18)
                        .div(sushi_FxsWeth_totalSupply_E0);
                    responseClean = response.slice(9, response.length);
                    chunks = chunk(responseClean, addresses.length);
                    fxsBalances = chunks[0];
                    vefxsBalances = chunks[1];
                    freeUniFraxFxsBalances = chunks[2];
                    farmUniFraxFxsBalances = chunks[3];
                    freeSushiFraxFxsBalances = chunks[4];
                    farmSushiFraxFxsBalances = chunks[5];
                    freeSushiFxsWethBalances = chunks[6];
                    farmSushiFxsWethBalances = chunks[7];
                    return [2 /*return*/, Object.fromEntries(Array(addresses.length)
                            .fill('x')
                            .map(function (_, i) {
                            var free_fxs = fxsBalances[i][0];
                            var vefxs = vefxsBalances[i][0];
                            var free_uni_frax_fxs = freeUniFraxFxsBalances[i][0];
                            var farm_uni_frax_fxs = farmUniFraxFxsBalances[i][0];
                            var free_sushi_frax_fxs = freeSushiFraxFxsBalances[i][0];
                            var farm_sushi_frax_fxs = farmSushiFraxFxsBalances[i][0];
                            var free_sushi_fxs_weth = freeSushiFxsWethBalances[i][0];
                            var farm_sushi_fxs_weth = farmSushiFxsWethBalances[i][0];
                            // console.log(`==================${addresses[i]}==================`);
                            // console.log("Free FXS: ", free_fxs.div(BIG18).toString());
                            // console.log("veFXS: ", vefxs.div(BIG18).toString());
                            // console.log("Free Uni FRAX/FXS LP: ", free_uni_frax_fxs.div(BIG18).toString());
                            // console.log("Farmed Uni FRAX/FXS LP [boosted]: ", farm_uni_frax_fxs.div(BIG18).toString());
                            // console.log("Free Sushi FRAX/FXS LP: ", free_sushi_frax_fxs.div(BIG18).toString());
                            // console.log("Farmed Sushi FRAX/FXS LP [boosted]: ", farm_sushi_frax_fxs.div(BIG18).toString());
                            // console.log("Free Sushi FXS/WETH: ", free_sushi_fxs_weth.div(BIG18).toString());
                            // console.log("Farmed Sushi FXS/WETH [boosted]: ", farm_sushi_fxs_weth.div(BIG18).toString());
                            // console.log("------");
                            // console.log("E18");
                            // console.log("FXS per Uni FRAX/FXS LP E18: ", uniLPFraxFxs_fxs_per_LP_E18.toString());
                            // console.log("FXS per Sushi FRAX/FXS LP E18: ", sushiLPFraxFxs_fxs_per_LP_E18.toString());
                            // console.log("FXS per Sushi FXS/WETH LP E18: ", sushiLPFxsWeth_fxs_per_LP_E18.toString());
                            // console.log("E0");
                            // console.log("FXS per Uni FRAX/FXS LP E0: ", uniLPFraxFxs_fxs_per_LP_E18.div(BIG18).toString());
                            // console.log("FXS per Sushi FRAX/FXS LP E0: ", sushiLPFraxFxs_fxs_per_LP_E18.div(BIG18).toString());
                            // console.log("FXS per Sushi FXS/WETH LP E0: ", sushiLPFxsWeth_fxs_per_LP_E18.div(BIG18).toString());
                            // console.log(``);
                            return [
                                addresses[i],
                                parseFloat(formatUnits(free_fxs
                                    .add(vefxs)
                                    .add(free_uni_frax_fxs.mul(uniLPFraxFxs_fxs_per_LP_E18).div(BIG18)) // FXS share in free Uni FRAX/FXS LP
                                    .add(farm_uni_frax_fxs.mul(uniLPFraxFxs_fxs_per_LP_E18).div(BIG18)) // FXS share in farmed Uni FRAX/FXS LP [boosted]
                                    .add(free_sushi_frax_fxs
                                    .mul(sushiLPFraxFxs_fxs_per_LP_E18)
                                    .div(BIG18)) // FXS share in free Sushi FRAX/FXS LP
                                    .add(farm_sushi_frax_fxs
                                    .mul(sushiLPFraxFxs_fxs_per_LP_E18)
                                    .div(BIG18)) // FXS share in farmed Sushi FRAX/FXS LP [boosted]
                                    .add(free_sushi_fxs_weth
                                    .mul(sushiLPFxsWeth_fxs_per_LP_E18)
                                    .div(BIG18)) // FXS share in free Sushi FXS/WETH LP
                                    .add(farm_sushi_fxs_weth
                                    .mul(sushiLPFxsWeth_fxs_per_LP_E18)
                                    .div(BIG18)) // FXS share in farmed Sushi FXS/WETH LP [boosted]
                                    .toString(), DECIMALS))
                            ];
                        }))];
            }
        });
    });
}

var abi$7 = [
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'memberAddressByDelegateKey',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'members',
        outputs: [
            {
                internalType: 'address',
                name: 'delegateKey',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'shares',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'loot',
                type: 'uint256'
            },
            {
                internalType: 'bool',
                name: 'exists',
                type: 'bool'
            },
            {
                internalType: 'uint256',
                name: 'highestIndexYesVote',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'jailed',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalShares',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$i(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, memberAddresses, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$7, addresses.map(function (address) { return [
                            options.address,
                            'memberAddressByDelegateKey',
                            [address]
                        ]; }), { blockTag: blockTag })];
                case 1:
                    memberAddresses = _a.sent();
                    return [4 /*yield*/, multicall(network, provider, abi$7, memberAddresses
                            .filter(function (addr) {
                            return addr.toString() !== '0x0000000000000000000000000000000000000000';
                        })
                            .map(function (addr) { return [options.address, 'members', [addr.toString()]]; }), { blockTag: blockTag })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.shares.toString(), options.decimals))
                        ]; }))];
            }
        });
    });
}

var UNISWAP_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
};
function strategy$j(_space, network, _provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var params, tokenAddress, result, score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        users: {
                            __args: {
                                where: {
                                    id_in: addresses.map(function (address) { return address.toLowerCase(); })
                                },
                                first: 1000
                            },
                            id: true,
                            liquidityPositions: {
                                __args: {
                                    where: {
                                        liquidityTokenBalance_gt: 0
                                    }
                                },
                                liquidityTokenBalance: true,
                                pair: {
                                    id: true,
                                    token0: {
                                        id: true
                                    },
                                    reserve0: true,
                                    token1: {
                                        id: true
                                    },
                                    reserve1: true,
                                    totalSupply: true
                                }
                            }
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        params.users.liquidityPositions.__args.block = { number: snapshot };
                    }
                    tokenAddress = options.address.toLowerCase();
                    return [4 /*yield*/, subgraphRequest(UNISWAP_SUBGRAPH_URL[network], params)];
                case 1:
                    result = _a.sent();
                    score = {};
                    if (result && result.users) {
                        result.users.forEach(function (u) {
                            u.liquidityPositions
                                .filter(function (lp) {
                                return lp.pair.token0.id == tokenAddress ||
                                    lp.pair.token1.id == tokenAddress;
                            })
                                .forEach(function (lp) {
                                var token0perUni = lp.pair.reserve0 / lp.pair.totalSupply;
                                var token1perUni = lp.pair.reserve1 / lp.pair.totalSupply;
                                var userScore = lp.pair.token0.id == tokenAddress
                                    ? token0perUni * lp.liquidityTokenBalance
                                    : token1perUni * lp.liquidityTokenBalance;
                                var userAddress = getAddress(u.id);
                                if (!score[userAddress])
                                    score[userAddress] = 0;
                                score[userAddress] = score[userAddress] + userScore;
                            });
                        });
                    }
                    return [2 /*return*/, score || {}];
            }
        });
    });
}

var FLASHSTAKE_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/blockzerohello/flash-stake-stats-v2-subgraph'
};
function strategy$k(_space, network, _provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var params, params2, result, stakesResult, score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        users: {
                            __args: {
                                where: {
                                    id_in: addresses.map(function (address) { return address.toLowerCase(); })
                                },
                                first: 1000
                            },
                            id: true,
                            liquidityPositions: {
                                liquidityTokenBalance: true,
                                user: {
                                    id: true
                                },
                                pair: {
                                    id: true,
                                    token0: {
                                        id: true
                                    },
                                    reserve0: true,
                                    token1: {
                                        id: true
                                    },
                                    reserve1: true,
                                    totalSupply: true
                                }
                            }
                        }
                    };
                    params2 = {
                        stakes: {
                            __args: {
                                where: {
                                    user_in: addresses.map(function (address) { return address.toLowerCase(); }),
                                    isActive: true
                                }
                            },
                            id: true,
                            amountIn: true,
                            user: true
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        params.users.__args.block = { number: snapshot };
                        // @ts-ignore
                        params2.stakes.__args.block = { number: snapshot };
                    }
                    return [4 /*yield*/, subgraphRequest(FLASHSTAKE_SUBGRAPH_URL[network], params)];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, subgraphRequest(FLASHSTAKE_SUBGRAPH_URL[network], params2)];
                case 2:
                    stakesResult = _a.sent();
                    score = {};
                    if (stakesResult && stakesResult.stakes) {
                        stakesResult.stakes.map(function (_data) {
                            var address = getAddress(_data.user);
                            if (!score[address])
                                score[address] = 0;
                            score[address] = Number(score[address]) + Number(_data.amountIn);
                        });
                    }
                    if (result && result.users) {
                        result.users.map(function (_data) {
                            var _a;
                            if ((_a = _data.liquidityPositions[0]) === null || _a === void 0 ? void 0 : _a.pair) {
                                _data.liquidityPositions.map(function (__data) {
                                    var address = getAddress(__data.user.id);
                                    var token0perFlash = Number(__data.pair.reserve0) / Number(__data.pair.totalSupply);
                                    var userScore = token0perFlash * Number(__data.liquidityTokenBalance);
                                    if (!score[address])
                                        score[address] = 0;
                                    score[address] = Number(score[address]) + userScore;
                                });
                            }
                        });
                    }
                    return [2 /*return*/, score || {}];
            }
        });
    });
}

var sousChefabi = [
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'userInfo',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
var masterChefAbi = [
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'userInfo',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'rewardDebt',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
var masterChefContractAddress = '0x73feaa1eE314F8c655E354234017bE2193C9E24E';
function strategy$l(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, score, masterBalances, sousBalances;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, strategy$4(space, network, provider, addresses, options, snapshot)];
                case 1:
                    score = _a.sent();
                    return [4 /*yield*/, multicall(network, provider, masterChefAbi, addresses.map(function (address) { return [
                            masterChefContractAddress,
                            'userInfo',
                            ['0', address]
                        ]; }), { blockTag: blockTag })];
                case 2:
                    masterBalances = _a.sent();
                    return [4 /*yield*/, Promise.all(options.chefAddresses.map(function (item) {
                            return multicall(network, provider, sousChefabi, addresses.map(function (address) { return [
                                item.address,
                                'userInfo',
                                [address],
                                { blockTag: blockTag }
                            ]; }), { blockTag: blockTag });
                        }))];
                case 3:
                    sousBalances = _a.sent();
                    return [2 /*return*/, Object.fromEntries(Object.entries(score).map(function (address, index) { return [
                            address[0],
                            address[1] +
                                parseFloat(formatUnits(masterBalances[index].amount.toString(), 18)) +
                                sousBalances.reduce(function (prev, cur, idx) {
                                    return prev +
                                        parseFloat(formatUnits(cur[index].amount.toString(), options.chefAddresses[idx].decimals));
                                }, 0)
                        ]; }))];
            }
        });
    });
}

var SYNTHETIX_SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix";
var quadraticWeighting = function (value) {
    // Scale the value by 100000
    var scaledValue = value * 1e5;
    return Math.sqrt(scaledValue);
};
function strategy$m(_space, _network, _provider, addresses, _, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var params, result, score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        snxholders: {
                            __args: {
                                where: {
                                    id_in: addresses.map(function (address) { return address.toLowerCase(); })
                                },
                                first: 1000
                            },
                            id: true,
                            initialDebtOwnership: true
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        params.snxholders.__args.block = { number: snapshot };
                    }
                    return [4 /*yield*/, subgraphRequest(SYNTHETIX_SUBGRAPH_URL, params)];
                case 1:
                    result = _a.sent();
                    score = {};
                    if (result && result.snxholders) {
                        result.snxholders.forEach(function (holder) {
                            score[getAddress(holder.id)] = quadraticWeighting(parseFloat(formatUnits(holder.initialDebtOwnership.toString(), 27)));
                        });
                    }
                    return [2 /*return*/, score || {}];
            }
        });
    });
}

var abi$8 = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'borrowBalanceStored',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$n(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, oldBlockTag, _a, balanceOfCalls, borrowBalanceCalls, calls, _b, response, balancesOldResponse, balancesNowResponse, borrowsNowResponse, resultData, i, noBorrow, balanceNow, balanceOld;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    if (!(typeof snapshot === 'number')) return [3 /*break*/, 1];
                    _a = snapshot - options.offsetCheck;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, provider.getBlockNumber()];
                case 2:
                    _a = (_c.sent()) - options.offsetCheck;
                    _c.label = 3;
                case 3:
                    oldBlockTag = _a;
                    balanceOfCalls = addresses.map(function (address) { return [
                        options.address,
                        'balanceOf',
                        [address]
                    ]; });
                    borrowBalanceCalls = addresses.map(function (address) { return [
                        options.address,
                        'borrowBalanceStored',
                        [address]
                    ]; });
                    calls = balanceOfCalls.concat(borrowBalanceCalls);
                    return [4 /*yield*/, Promise.all([
                            multicall(network, provider, abi$8, calls, { blockTag: blockTag }),
                            multicall(network, provider, abi$8, addresses.map(function (address) { return [
                                options.address,
                                'balanceOf',
                                [address]
                            ]; }), { blockTag: oldBlockTag })
                        ])];
                case 4:
                    _b = _c.sent(), response = _b[0], balancesOldResponse = _b[1];
                    balancesNowResponse = response.slice(0, addresses.length);
                    borrowsNowResponse = response.slice(addresses.length);
                    resultData = {};
                    for (i = 0; i < balancesNowResponse.length; i++) {
                        noBorrow = 1;
                        if (options.borrowingRestricted) {
                            noBorrow =
                                borrowsNowResponse[i].toString().localeCompare('0') == 0 ? 1 : 0;
                        }
                        balanceNow = parseFloat(formatUnits(balancesNowResponse[i].toString(), options.decimals));
                        balanceOld = parseFloat(formatUnits(balancesOldResponse[i].toString(), options.decimals));
                        resultData[addresses[i]] = Math.min(balanceNow, balanceOld) * noBorrow;
                    }
                    return [2 /*return*/, resultData];
            }
        });
    });
}

var Multicaller = /** @class */ (function () {
    function Multicaller(network, provider, abi, options) {
        this.options = {};
        this.calls = [];
        this.paths = [];
        this.network = network;
        this.provider = provider;
        this.abi = abi;
        this.options = options || {};
    }
    Multicaller.prototype.call = function (path, address, fn, params) {
        this.calls.push([address, fn, params]);
        this.paths.push(path);
        return this;
    };
    Multicaller.prototype.execute = function (from) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = from || {};
                        return [4 /*yield*/, multicall(this.network, this.provider, this.abi, this.calls, this.options)];
                    case 1:
                        result = _a.sent();
                        this.paths.forEach(function (path, i) { return set(obj, path, result[i][0]); });
                        this.calls = [];
                        this.paths = [];
                        return [2 /*return*/, obj];
                }
            });
        });
    };
    return Multicaller;
}());

var ONE_E18 = parseUnits('1', 18);
var abi$9 = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'userInfo',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'rewardDebt',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'exchangeRateStored',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'borrowBalanceStored',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
var CREAM_VOTING_POWER = '0xb146BF59f30a54750209EF529a766D952720D0f9';
var CREAM_VOTING_POWER_DEPLOY_BLOCK = 12315028;
function strategy$o(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var snapshotBlock, _a, snapshotBlocks, i, blocksPerPeriod, blockTag, scores, averageScore;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(typeof snapshot === 'number')) return [3 /*break*/, 1];
                    _a = snapshot;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, getBlockNumber(provider)];
                case 2:
                    _a = _b.sent();
                    _b.label = 3;
                case 3:
                    snapshotBlock = _a;
                    snapshotBlocks = [];
                    for (i = 0; i < options.periods; i++) {
                        blocksPerPeriod = 80640;
                        blockTag = snapshotBlock > blocksPerPeriod * i
                            ? snapshotBlock - blocksPerPeriod * i
                            : snapshotBlock;
                        snapshotBlocks.push(blockTag);
                    }
                    return [4 /*yield*/, Promise.all(__spreadArrays(snapshotBlocks.map(function (blockTag) {
                            return blockTag > CREAM_VOTING_POWER_DEPLOY_BLOCK
                                ? getScores(provider, addresses, options, blockTag)
                                : getLegacyScores(provider, addresses, options, blockTag);
                        })))];
                case 4:
                    scores = _b.sent();
                    averageScore = {};
                    addresses.forEach(function (address) {
                        var userScore = scores
                            .map(function (score) { return score[address]; })
                            .reduce(function (accumulator, score) { return (accumulator += score); }, 0);
                        averageScore[address] = userScore / options.periods;
                    });
                    return [2 /*return*/, Object.fromEntries(Array(addresses.length)
                            .fill('')
                            .map(function (_, i) {
                            var score = averageScore[addresses[i]];
                            // ignore score < minimum voting amount
                            if (score < options.minVote) {
                                return [addresses[i], 0];
                            }
                            return [addresses[i], score];
                        }))];
            }
        });
    });
}
function getScores(provider, addresses, options, blockTag) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, strategy$4('cream', '1', provider, addresses, {
                    address: CREAM_VOTING_POWER,
                    decimals: 18
                }, blockTag)];
        });
    });
}
function getLegacyScores(provider, addresses, options, blockTag) {
    return __awaiter(this, void 0, void 0, function () {
        var score, multi1, multi2, multi3, multi4, results, result, creamPerSushiswapLP, creamPerUniswapLP, creamPerBalancerLP;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    score = {};
                    multi1 = new Multicaller('1', provider, abi$9, { blockTag: blockTag });
                    multi1.call('sushiswap.cream', options.token, 'balanceOf', [
                        options.sushiswap
                    ]);
                    multi1.call('sushiswap.totalSupply', options.sushiswap, 'totalSupply');
                    addresses.forEach(function (address) {
                        multi1.call("sushiswap." + address + ".balanceOf", options.sushiswap, 'balanceOf', [address]);
                        multi1.call("sushiswap." + address + ".userInfo", options.masterChef, 'userInfo', [options.pid, address]);
                    });
                    multi2 = new Multicaller('1', provider, abi$9, { blockTag: blockTag });
                    multi2.call('uniswap.cream', options.token, 'balanceOf', [options.uniswap]);
                    multi2.call('uniswap.totalSupply', options.uniswap, 'totalSupply');
                    multi2.call('balancer.cream', options.token, 'balanceOf', [options.balancer]);
                    multi2.call('balancer.totalSupply', options.balancer, 'totalSupply');
                    addresses.forEach(function (address) {
                        multi2.call("uniswap." + address + ".balanceOf", options.uniswap, 'balanceOf', [
                            address
                        ]);
                        multi2.call("balancer." + address + ".balanceOf", options.balancer, 'balanceOf', [address]);
                    });
                    multi3 = new Multicaller('1', provider, abi$9, { blockTag: blockTag });
                    multi3.call('crCREAM.exchangeRate', options.crCREAM, 'exchangeRateStored');
                    addresses.forEach(function (address) {
                        multi3.call("crCREAM." + address + ".balanceOf", options.crCREAM, 'balanceOf', [
                            address
                        ]);
                        multi3.call("crCREAM." + address + ".borrow", options.crCREAM, 'borrowBalanceStored', [address]);
                    });
                    multi4 = new Multicaller('1', provider, abi$9, { blockTag: blockTag });
                    addresses.forEach(function (address) {
                        options.pools.forEach(function (pool) {
                            multi4.call("pool." + address + "." + pool.name, pool.address, 'balanceOf', [
                                address
                            ]);
                        });
                    });
                    return [4 /*yield*/, Promise.all([
                            multi1.execute(),
                            multi2.execute(),
                            multi3.execute(),
                            multi4.execute()
                        ])];
                case 1:
                    results = _a.sent();
                    result = results.reduce(function (sumResult, partialResult) {
                        Object.entries(partialResult).forEach(function (_a) {
                            var key = _a[0], value = _a[1];
                            sumResult[key] = value;
                        });
                        return sumResult;
                    }, {});
                    creamPerSushiswapLP = parseUnits(result.sushiswap.cream.toString(), 18).div(result.sushiswap.totalSupply);
                    creamPerUniswapLP = parseUnits(result.uniswap.cream.toString(), 18).div(result.uniswap.totalSupply);
                    creamPerBalancerLP = parseUnits(result.balancer.cream.toString(), 18).div(result.balancer.totalSupply);
                    addresses.forEach(function (address) {
                        var userScore = score[address] || BigNumber.from(0);
                        var sushi = result.sushiswap[address].balanceOf
                            .add(result.sushiswap[address].userInfo)
                            .mul(creamPerSushiswapLP)
                            .div(ONE_E18);
                        var uniswap = result.uniswap[address].balanceOf
                            .mul(creamPerUniswapLP)
                            .div(ONE_E18);
                        var balancer = result.balancer[address].balanceOf
                            .mul(creamPerBalancerLP)
                            .div(ONE_E18);
                        var crCREAM = result.crCREAM[address].balanceOf
                            .mul(result.crCREAM.exchangeRate)
                            .div(ONE_E18)
                            .sub(result.crCREAM[address].borrow);
                        var pools = Object.values(result.pool[address]).reduce(function (accumulator, poolBalance) {
                            return accumulator.add(poolBalance);
                        }, BigNumber.from(0));
                        score[address] = userScore
                            .add(sushi)
                            .add(uniswap)
                            .add(balancer)
                            .add(crCREAM)
                            .add(pools);
                    });
                    Object.keys(score).map(function (address) {
                        score[address] = parseFloat(formatUnits(score[address], 18));
                    });
                    return [2 /*return*/, score];
            }
        });
    });
}

var abi$a = [
    {
        constant: true,
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'balanceOfBonded',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$p(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, daoQuery, lpQuery, response, uniswapESD, uniswapTotalSupply, daoBalances, lpBalances;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    daoQuery = addresses.map(function (address) { return [
                        options.dao,
                        'balanceOfBonded',
                        [address]
                    ]; });
                    lpQuery = addresses.map(function (address) { return [
                        options.rewards,
                        'balanceOfBonded',
                        [address]
                    ]; });
                    return [4 /*yield*/, multicall(network, provider, abi$a, __spreadArrays([
                            [options.token, 'balanceOf', [options.uniswap]],
                            [options.uniswap, 'totalSupply']
                        ], daoQuery, lpQuery), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    uniswapESD = response[0];
                    uniswapTotalSupply = response[1];
                    daoBalances = response.slice(2, addresses.length + 2);
                    lpBalances = response.slice(addresses.length + 2, addresses.length * 2 + 2);
                    return [2 /*return*/, Object.fromEntries(Array(addresses.length)
                            .fill('x')
                            .map(function (_, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(uniswapESD[0]
                                .div(uniswapTotalSupply[0])
                                .mul(lpBalances[i][0])
                                .add(daoBalances[i][0])
                                .toString(), options.decimals))
                        ]; }))];
            }
        });
    });
}

function strategy$q(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var delegations, score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDelegations(space, network, provider, addresses, options, snapshot)];
                case 1:
                    delegations = _a.sent();
                    if (Object.keys(delegations).length === 0)
                        return [2 /*return*/, {}];
                    console.debug('Delegations', delegations);
                    return [4 /*yield*/, strategy$p(space, network, provider, Object.values(delegations).reduce(function (a, b) {
                            return a.concat(b);
                        }), options, snapshot)];
                case 2:
                    score = _a.sent();
                    console.debug('Delegators score', score);
                    return [2 /*return*/, Object.fromEntries(addresses.map(function (address) {
                            var addressScore = delegations[address]
                                ? delegations[address].reduce(function (a, b) { return a + score[b]; }, 0)
                                : 0;
                            return [address, addressScore];
                        }))];
            }
        });
    });
}

var tokenAbi = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$r(_space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, res, totalSupply, tokenBalanceInUni, tokensPerUni, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, tokenAbi, [
                            [options.uniswapAddress, 'totalSupply', []],
                            [options.tokenAddress, 'balanceOf', [options.uniswapAddress]]
                        ].concat(addresses.map(function (address) { return [
                            options.stakingAddress,
                            'balanceOf',
                            [address]
                        ]; })), { blockTag: blockTag })];
                case 1:
                    res = _a.sent();
                    totalSupply = res[0];
                    tokenBalanceInUni = res[1];
                    tokensPerUni = tokenBalanceInUni / Math.pow(10, options.decimals) / (totalSupply / 1e18);
                    response = res.slice(2);
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            (value / Math.pow(10, options.decimals)) * tokensPerUni
                        ]; }))];
            }
        });
    });
}

var abi$b = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
var chunk$1 = function (arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, function (v, i) {
        return arr.slice(i * size, i * size + size);
    });
};
function strategy$s(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, doughv1Query, doughv2Query, eDOUGHQuery, stakedDoughQuery, lpDoughQuery, response, doughv2BPT, doughv2BptTotalSupply, responseClean, chunks, doughv1Balances, doughv2Balances, eDOUGHBalances, stakedDoughBalances, lpDoughBalances;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    doughv1Query = addresses.map(function (address) { return [
                        options.doughv1,
                        'balanceOf',
                        [address]
                    ]; });
                    doughv2Query = addresses.map(function (address) { return [
                        options.doughv2,
                        'balanceOf',
                        [address]
                    ]; });
                    eDOUGHQuery = addresses.map(function (address) { return [
                        options.eDOUGH,
                        'balanceOf',
                        [address]
                    ]; });
                    stakedDoughQuery = addresses.map(function (address) { return [
                        options.stakedDough,
                        'balanceOf',
                        [address]
                    ]; });
                    lpDoughQuery = addresses.map(function (address) { return [
                        options.BPT,
                        'balanceOf',
                        [address]
                    ]; });
                    return [4 /*yield*/, multicall(network, provider, abi$b, __spreadArrays([
                            [options.doughv2, 'balanceOf', [options.BPT]],
                            [options.BPT, 'totalSupply']
                        ], doughv1Query, doughv2Query, eDOUGHQuery, stakedDoughQuery, lpDoughQuery), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    doughv2BPT = response[0];
                    doughv2BptTotalSupply = response[1];
                    responseClean = response.slice(2, response.length);
                    chunks = chunk$1(responseClean, addresses.length);
                    doughv1Balances = chunks[0];
                    doughv2Balances = chunks[1];
                    eDOUGHBalances = chunks[2];
                    stakedDoughBalances = chunks[3];
                    lpDoughBalances = chunks[4];
                    return [2 /*return*/, Object.fromEntries(Array(addresses.length)
                            .fill('x')
                            .map(function (_, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(doughv2BPT[0]
                                .mul(stakedDoughBalances[i][0])
                                .div(doughv2BptTotalSupply[0])
                                .add(doughv2BPT[0]
                                .mul(lpDoughBalances[i][0])
                                .div(doughv2BptTotalSupply[0]))
                                .add(doughv1Balances[i][0])
                                .add(doughv2Balances[i][0])
                                .add(eDOUGHBalances[i][0])
                                .toString(), options.decimals))
                        ]; }))];
            }
        });
    });
}

function strategy$t() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var addresses, options, snapshot, _a, coeff, receivingAddresses, charitableTransactions, scores, _loop_1, _b, addresses_1, address;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    addresses = args[3], options = args[4], snapshot = args[5];
                    _a = options.coeff, coeff = _a === void 0 ? 1 : _a, receivingAddresses = options.receivingAddresses;
                    return [4 /*yield*/, fetch$1('https://api.anyblock.tools/ethereum/ethereum/mainnet/es/tx/search/', {
                            method: 'POST',
                            body: JSON.stringify({
                                from: 0,
                                size: 10000,
                                query: {
                                    bool: {
                                        must: [
                                            {
                                                bool: {
                                                    should: __spreadArrays(addresses.map(function (a) { return ({
                                                        match: {
                                                            from: a
                                                        }
                                                    }); }))
                                                }
                                            },
                                            {
                                                bool: {
                                                    should: __spreadArrays(receivingAddresses.map(function (a) { return ({
                                                        match: {
                                                            to: a
                                                        }
                                                    }); }))
                                                }
                                            }
                                        ]
                                    }
                                }
                            }),
                            headers: {
                                Authorization: 'Bearer 8c8b3826-afd5-4535-a8be-540562624fbe',
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(function (r) { return r.json(); })
                            .catch(function (e) {
                            console.error('Eth-Received AnyBlock ElasticSearch Query Failed:');
                            throw e;
                        })];
                case 1:
                    charitableTransactions = _c.sent();
                    scores = {};
                    _loop_1 = function (address) {
                        scores[address] = charitableTransactions.hits.hits
                            .filter(function (tx) {
                            var validAddress = tx._source.from.toLowerCase() == address.toLowerCase();
                            return validAddress;
                        })
                            .reduce(function (prev, curr) {
                            return prev + curr._source.value.eth * coeff;
                        }, 0);
                    };
                    for (_b = 0, addresses_1 = addresses; _b < addresses_1.length; _b++) {
                        address = addresses_1[_b];
                        _loop_1(address);
                    }
                    return [2 /*return*/, scores];
            }
        });
    });
}

function strategy$u() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var provider, addresses, options, snapshot, _a, coeff, _b, dfuseApiKey, receivingAddresses, contractAddress, decimals, loadJWT, edges, _c, _d, _e, _f, _g, _h, _j, _k, _l, matchingLogs, txLogs, scores, _loop_1, _m, addresses_1, address;
        var _this = this;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    provider = args[2], addresses = args[3], options = args[4], snapshot = args[5];
                    _a = options.coeff, coeff = _a === void 0 ? 1 : _a, _b = options.dfuseApiKey, dfuseApiKey = _b === void 0 ? 'server_806bdc9bb370dad11ec5807e82e57fa0' : _b, receivingAddresses = options.receivingAddresses, contractAddress = options.contractAddress, decimals = options.decimals;
                    loadJWT = function (dfuseApiKey) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, fetch$1('https://auth.dfuse.io/v1/auth/issue', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ api_key: dfuseApiKey })
                                })
                                    .then(function (r) { return r.json(); })
                                    .then(function (r) { return r.token; })];
                        });
                    }); };
                    _c = fetch$1;
                    _d = ['https://mainnet.eth.dfuse.io/graphql'];
                    _e = {
                        method: 'POST'
                    };
                    _f = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    };
                    _g = "Bearer ";
                    return [4 /*yield*/, loadJWT(dfuseApiKey)];
                case 1:
                    _e.headers = (_f.Authorization = _g + (_o.sent()),
                        _f);
                    _j = (_h = JSON).stringify;
                    _k = {
                        query: /* GraphQL */ "\n        query(\n          $query: String!\n          $sort: SORT\n          $low: Int64\n          $high: Int64\n          $limit: Int64\n        ) {\n          searchTransactions(\n            indexName: LOGS\n            query: $query\n            sort: $sort\n            lowBlockNum: $low\n            highBlockNum: $high\n            limit: $limit\n          ) {\n            edges {\n              node {\n                matchingLogs {\n                  topics\n                  data\n                }\n              }\n            }\n          }\n        }\n      "
                    };
                    _l = {
                        query: "address: '" + contractAddress + "' topic.0:'Transfer(address,address,uint256)' (" + addresses
                            .map(function (a) { return "topic.1:'" + a + "'"; })
                            .join(' OR ') + ") (" + receivingAddresses
                            .map(function (a) { return "topic.2:'" + a + "'"; })
                            .join(' OR ') + ")",
                        sort: 'ASC',
                        limit: 0
                    };
                    return [4 /*yield*/, provider.getBlockNumber()];
                case 2: return [4 /*yield*/, _c.apply(void 0, _d.concat([(_e.body = _j.apply(_h, [(_k.variables = (_l.high = _o.sent(),
                                _l),
                                _k)]),
                            _e)]))
                        .then(function (r) { return __awaiter(_this, void 0, void 0, function () {
                        var json;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, r.json()];
                                case 1:
                                    json = _a.sent();
                                    if (json.errors)
                                        throw json.errors;
                                    return [2 /*return*/, json];
                            }
                        });
                    }); })
                        .catch(function (e) {
                        console.error(e);
                        throw new Error('Strategy ERC20-Received: Dfuse Query Failed');
                    })];
                case 3:
                    edges = (_o.sent()).data.searchTransactions.edges;
                    matchingLogs = edges.reduce(function (prev, edge) { return __spreadArrays(prev, edge.node.matchingLogs); }, []);
                    txLogs = matchingLogs.map(function (log) {
                        var _a = log.topics.map(function (t) {
                            return t.replace('0x000000000000000000000000', '0x');
                        }), from = _a[1], to = _a[2];
                        var amount = BigNumber.from(log.data);
                        return {
                            from: from,
                            to: to,
                            amount: amount
                        };
                    });
                    scores = {};
                    _loop_1 = function (address) {
                        var logsWithAddress = txLogs.filter(function (log) {
                            var validAddress = log.from.toLowerCase() == address.toLowerCase();
                            return validAddress;
                        });
                        // Sum of all transfers
                        scores[address] = logsWithAddress.reduce(function (prev, curr) {
                            return (prev +
                                parseFloat(formatUnits(curr.amount, BigNumber.from(decimals))) * coeff);
                        }, 0);
                    };
                    for (_m = 0, addresses_1 = addresses; _m < addresses_1.length; _m++) {
                        address = addresses_1[_m];
                        _loop_1(address);
                    }
                    return [2 /*return*/, scores];
            }
        });
    });
}

var ethCharities = [
    ['GiveDirectly', '0xc7464dbcA260A8faF033460622B23467Df5AEA42'],
    ['Unsung.org', '0x02a13ED1805624738Cc129370Fee358ea487B0C6'],
    ['Heifer.org', '0xD3F81260a44A1df7A7269CF66Abd9c7e4f8CdcD1'],
    ['GraceAid.org.uk', '0x236dAA98f115caa9991A3894ae387CDc13eaaD1B'],
    ['SENS.org', '0x542EFf118023cfF2821b24156a507a513Fe93539'],
    ['350.org', '0x50990F09d4f0cb864b8e046e7edC749dE410916b'],
    ['EFF.org', '0xb189f76323678E094D4996d182A792E52369c005'],
    ['WikiLeaks', '0xE96E2181F6166A37EA4C04F6E6E2bD672D72Acc1'],
    ['GiveWell.org', '0x7cF2eBb5Ca55A8bd671A020F8BDbAF07f60F26C1'],
    ['CoolEarth.org', '0x3c8cB169281196737c493AfFA8F49a9d823bB9c5'],
    ['Run2Rescue.org', '0xd17bcbFa6De9E3741aa43Ed32e64696F6a9FA996'],
    ['Archive.org', '0xFA8E3920daF271daB92Be9B87d9998DDd94FEF08']
];
function strategy$v() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var space, network, provider, addresses, options, snapshot, _a, coeff;
        return __generator(this, function (_b) {
            space = args[0], network = args[1], provider = args[2], addresses = args[3], options = args[4], snapshot = args[5];
            _a = options.coeff, coeff = _a === void 0 ? 100 : _a;
            return [2 /*return*/, strategy$t(space, network, provider, addresses, {
                    receivingAddresses: ethCharities.map(function (_a) {
                        var name = _a[0], address = _a[1];
                        return address;
                    }),
                    coeff: coeff
                }, snapshot)];
        });
    });
}

var ZERO = BigNumber.from(0);
var ONE = BigNumber.from(1);
var TWO = BigNumber.from(2);
var THREE = BigNumber.from(3);
var squareRoot = function (y) {
    var z = ZERO;
    if (y.gt(THREE)) {
        z = y;
        var x = y.div(TWO).add(ONE);
        while (x.lt(z)) {
            z = x;
            x = y.div(x).add(x).div(TWO);
        }
    }
    else if (!y.isZero()) {
        z = ONE;
    }
    return z;
};
var YEAR = BigNumber.from(31536000); // year in seconds
var ONE_ETHER = BigNumber.from('1000000000000000000');
var MAX_EMISSION_RATE = BigNumber.from('150000000000000000'); // 15%
var calculateEmission = function (deposit, timePassed, sigmoidParams, totalSupplyFactor, totalSupply, totalStaked) {
    var d = timePassed.sub(sigmoidParams.b);
    var personalEmissionRate = ZERO;
    if (d.gt(ZERO)) {
        personalEmissionRate = sigmoidParams.a
            .mul(d)
            .div(squareRoot(d.pow(TWO).add(sigmoidParams.c)));
    }
    var targetTotalStaked = totalSupply.mul(totalSupplyFactor).div(ONE_ETHER);
    var generalEmissionRate = MAX_EMISSION_RATE.div(TWO);
    if (totalStaked.lt(targetTotalStaked)) {
        generalEmissionRate = generalEmissionRate
            .mul(totalStaked)
            .div(targetTotalStaked);
    }
    if (personalEmissionRate.isZero()) {
        generalEmissionRate = ZERO;
    }
    var emissionRate = personalEmissionRate.add(generalEmissionRate);
    var emission = deposit
        .mul(emissionRate)
        .mul(timePassed)
        .div(YEAR.mul(ONE_ETHER));
    return emission;
};

var EASY_STAKING_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/maxaleks/easy-staking';
var ercABI = [
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function getEasyStakingDeposits(addresses, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var params, page, deposits, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        deposits: {
                            __args: {
                                where: {
                                    user_in: addresses.map(function (address) { return address.toLowerCase(); }),
                                    amount_gt: 0
                                },
                                first: 1000,
                                skip: 0
                            },
                            user: true,
                            amount: true,
                            timestamp: true
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        params.deposits.__args.block = { number: snapshot };
                    }
                    page = 0;
                    deposits = [];
                    _a.label = 1;
                case 1:
                    params.deposits.__args.skip = page * 1000;
                    return [4 /*yield*/, subgraphRequest(EASY_STAKING_SUBGRAPH_URL, params)];
                case 2:
                    data = _a.sent();
                    deposits = deposits.concat(data.deposits);
                    page++;
                    if (data.deposits.length < 1000)
                        return [3 /*break*/, 3];
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, deposits.map(function (deposit) { return (__assign(__assign({}, deposit), { amount: BigNumber.from(deposit.amount), timestamp: BigNumber.from(deposit.timestamp) })); })];
            }
        });
    });
}
function getEasyStakingParams(snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var params, commonData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        commonData: {
                            __args: {
                                id: 'common'
                            },
                            sigmoidParamA: true,
                            sigmoidParamB: true,
                            sigmoidParamC: true,
                            totalSupplyFactor: true,
                            totalStaked: true
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        params.commonData.__args.block = { number: snapshot };
                    }
                    return [4 /*yield*/, subgraphRequest(EASY_STAKING_SUBGRAPH_URL, params)];
                case 1:
                    commonData = (_a.sent()).commonData;
                    return [2 /*return*/, {
                            sigmoidParameters: {
                                a: BigNumber.from(commonData.sigmoidParamA),
                                b: BigNumber.from(commonData.sigmoidParamB),
                                c: BigNumber.from(commonData.sigmoidParamC)
                            },
                            totalSupplyFactor: BigNumber.from(commonData.totalSupplyFactor),
                            totalStaked: BigNumber.from(commonData.totalStaked)
                        }];
            }
        });
    });
}
function strategy$w(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, easyStakingDeposits, _b, sigmoidParameters, totalSupplyFactor, totalStaked, block, totalSupply, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        getEasyStakingDeposits(addresses, snapshot),
                        getEasyStakingParams(snapshot),
                        provider.getBlock(snapshot),
                        call(provider, ercABI, [options.address, 'totalSupply', []])
                    ])];
                case 1:
                    _a = _c.sent(), easyStakingDeposits = _a[0], _b = _a[1], sigmoidParameters = _b.sigmoidParameters, totalSupplyFactor = _b.totalSupplyFactor, totalStaked = _b.totalStaked, block = _a[2], totalSupply = _a[3];
                    result = {};
                    addresses.forEach(function (address) {
                        result[address] = 0;
                    });
                    if (!easyStakingDeposits || easyStakingDeposits.length === 0) {
                        return [2 /*return*/, result];
                    }
                    return [2 /*return*/, Object.fromEntries(Object.entries(result).map(function (_a) {
                            var address = _a[0], balance = _a[1];
                            var totalBalance = balance;
                            var userDeposits = easyStakingDeposits.filter(function (deposit) { return deposit.user.toLowerCase() === address.toLowerCase(); });
                            userDeposits.forEach(function (deposit) {
                                var timePassed = BigNumber.from(block.timestamp).sub(deposit.timestamp);
                                var emission = calculateEmission(deposit.amount, timePassed, sigmoidParameters, totalSupplyFactor, totalSupply, totalStaked);
                                totalBalance += parseFloat(formatUnits(deposit.amount.add(emission).toString(), options.decimals));
                            });
                            return [address, totalBalance];
                        }))];
            }
        });
    });
}

var SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/maxaleks/xdai-stakers';
function getUsers(addresses, snapshot, userType) {
    return __awaiter(this, void 0, void 0, function () {
        var params, page, users, data;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    params = (_a = {},
                        _a[userType] = {
                            __args: {
                                where: {
                                    address_in: addresses.map(function (address) { return address.toLowerCase(); }),
                                    balance_gt: 0
                                },
                                first: 1000,
                                skip: 0
                            },
                            address: true,
                            balance: true
                        },
                        _a);
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        params[userType].__args.block = { number: snapshot };
                    }
                    page = 0;
                    users = [];
                    _b.label = 1;
                case 1:
                    params[userType].__args.skip = page * 1000;
                    return [4 /*yield*/, subgraphRequest(SUBGRAPH_URL, params)];
                case 2:
                    data = _b.sent();
                    users = users.concat(data[userType]);
                    page++;
                    if (data[userType].length < 1000)
                        return [3 /*break*/, 3];
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, users];
            }
        });
    });
}
var getXdaiBlockNumber = function (timestamp) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, fetch$1("https://blockscout.com/xdai/mainnet/api?module=block&action=getblocknobytime&timestamp=" + timestamp + "&closest=before")
                .then(function (r) { return r.json(); })
                .then(function (r) { return Number(r.result.blockNumber); })];
    });
}); };
function strategy$x(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var xdaiSnapshot, timestamp, users, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    xdaiSnapshot = 'latest';
                    if (!(snapshot !== 'latest')) return [3 /*break*/, 3];
                    return [4 /*yield*/, provider.getBlock(snapshot)];
                case 1:
                    timestamp = (_a.sent()).timestamp;
                    return [4 /*yield*/, getXdaiBlockNumber(timestamp)];
                case 2:
                    xdaiSnapshot = _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, getUsers(addresses, xdaiSnapshot, options.userType)];
                case 4:
                    users = _a.sent();
                    result = {};
                    addresses.forEach(function (address) {
                        result[address] = 0;
                    });
                    if (!users || users.length === 0) {
                        return [2 /*return*/, result];
                    }
                    return [2 /*return*/, Object.fromEntries(Object.entries(result).map(function (_a) {
                            var address = _a[0];
                            var user = users.find(function (item) { return item.address.toLowerCase() === address.toLowerCase(); });
                            var balance = 0;
                            if (user) {
                                balance = parseFloat(formatUnits(user.balance, options.decimals));
                            }
                            return [address, balance];
                        }))];
            }
        });
    });
}

function strategy$y(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, strategy$x(space, network, provider, addresses, __assign(__assign({}, options), { userType: 'stakers' }), snapshot)];
        });
    });
}

function strategy$z(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, strategy$x(space, network, provider, addresses, __assign(__assign({}, options), { userType: 'holders' }), snapshot)];
        });
    });
}

function strategy$A(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var delegations, delegationsArray, erc20Balances, easyStakingBalances, posdaoStakingBalances, erc20BalancesOnXdai;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDelegations(space, network, provider, addresses, options, snapshot)];
                case 1:
                    delegations = _a.sent();
                    if (Object.keys(delegations).length === 0)
                        return [2 /*return*/, {}];
                    console.debug('Delegations', delegations);
                    delegationsArray = Object.values(delegations).reduce(function (a, b) { return a.concat(b); });
                    return [4 /*yield*/, strategy$4(space, network, provider, delegationsArray, options, snapshot)];
                case 2:
                    erc20Balances = _a.sent();
                    return [4 /*yield*/, strategy$w(space, network, provider, delegationsArray, options, snapshot)];
                case 3:
                    easyStakingBalances = _a.sent();
                    return [4 /*yield*/, strategy$y(space, network, provider, delegationsArray, options, snapshot)];
                case 4:
                    posdaoStakingBalances = _a.sent();
                    return [4 /*yield*/, strategy$z(space, network, provider, delegationsArray, options, snapshot)];
                case 5:
                    erc20BalancesOnXdai = _a.sent();
                    console.debug('Delegators ERC20 balances', erc20Balances);
                    console.debug('Delegators EasyStaking balances', easyStakingBalances);
                    console.debug('Delegators POSDAO Staking balances', posdaoStakingBalances);
                    console.debug('Delegators ERC20 balances on xDai', erc20BalancesOnXdai);
                    return [2 /*return*/, Object.fromEntries(addresses.map(function (address) {
                            var addressScore = delegations[address]
                                ? delegations[address].reduce(function (a, b) {
                                    return a +
                                        erc20Balances[b] +
                                        easyStakingBalances[b] +
                                        posdaoStakingBalances[b] +
                                        erc20BalancesOnXdai[b];
                                }, 0)
                                : 0;
                            return [address, addressScore];
                        }))];
            }
        });
    });
}

var abi$c = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getPricePerFullShare',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$B(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, queries, response, pps;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    queries = [];
                    addresses.forEach(function (voter) {
                        queries.push([options.address, 'balanceOf', [voter]]);
                    });
                    queries.push([options.address, 'getPricePerFullShare']);
                    return [4 /*yield*/, multicall(network, provider, abi$c, queries, { blockTag: blockTag })];
                case 1:
                    response = (_a.sent()).map(function (r) { return r[0]; });
                    pps = response[response.length - 1];
                    return [2 /*return*/, Object.fromEntries(Array(addresses.length)
                            .fill('x')
                            .map(function (_, i) {
                            return [
                                addresses[i],
                                parseFloat(formatUnits(response[i].mul(pps), 36 /* decimals */))
                            ];
                        }))];
            }
        });
    });
}

var tokenAbi$1 = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: '_account',
                type: 'address'
            }
        ],
        name: 'staked',
        outputs: [
            {
                internalType: 'uint256',
                name: 'ghst_',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'poolTokens_',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'ghstUsdcPoolToken_',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$C(_space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, res, ghstQuickTotalSupply, ghstQuickTokenBalanceInUni, ghstQuickTokensPerUni, ghstUsdcTotalSupply, ghstUsdcTokenBalanceInUni, ghstUsdcTokensPerUni, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, tokenAbi$1, [
                            [options.ghstQuickAddress, 'totalSupply', []],
                            [options.tokenAddress, 'balanceOf', [options.ghstQuickAddress]],
                            [options.ghstUsdcAddress, 'totalSupply', []],
                            [options.tokenAddress, 'balanceOf', [options.ghstUsdcAddress]]
                        ].concat(addresses.map(function (address) { return [
                            options.stakingAddress,
                            'staked',
                            [address]
                        ]; })), { blockTag: blockTag })];
                case 1:
                    res = _a.sent();
                    ghstQuickTotalSupply = res[0];
                    ghstQuickTokenBalanceInUni = res[1];
                    ghstQuickTokensPerUni = ghstQuickTokenBalanceInUni /
                        Math.pow(10, options.decimals) /
                        (ghstQuickTotalSupply / 1e18);
                    ghstUsdcTotalSupply = res[2];
                    ghstUsdcTokenBalanceInUni = res[3];
                    ghstUsdcTokensPerUni = ghstUsdcTokenBalanceInUni /
                        Math.pow(10, options.decimals) /
                        (ghstUsdcTotalSupply / 1e18);
                    response = res.slice(4);
                    return [2 /*return*/, Object.fromEntries(response.map(function (values, i) { return [
                            addresses[i],
                            values[0] / 1e18 + //ghst_
                                (values[1] / Math.pow(10, options.decimals)) * ghstQuickTokensPerUni + //poolTokens_
                                (values[2] / Math.pow(10, options.decimals)) * ghstUsdcTokensPerUni //ghstUsdcPoolToken_
                        ]; }))];
            }
        });
    });
}

var abi$d = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$D(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, response, misPerLP, lpBalances, stakedLpBalances, tokenBalances, boardroomBalances;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$d, __spreadArrays([
                            [options.token, 'balanceOf', [options.sushiswap]],
                            [options.sushiswap, 'totalSupply']
                        ], addresses.map(function (address) { return [
                            options.sushiswap,
                            'balanceOf',
                            [address]
                        ]; }), addresses.map(function (address) { return [
                            options.sharePool,
                            'balanceOf',
                            [address]
                        ]; }), addresses.map(function (address) { return [
                            options.token,
                            'balanceOf',
                            [address]
                        ]; }), addresses.map(function (address) { return [
                            options.boardroom,
                            'balanceOf',
                            [address]
                        ]; })), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    misPerLP = parseUnits(response[0][0].toString(), 18).div(response[1][0]);
                    lpBalances = response.slice(2, addresses.length + 2);
                    stakedLpBalances = response.slice(addresses.length + 2, addresses.length * 2 + 2);
                    tokenBalances = response.slice(addresses.length * 2 + 2, addresses.length * 3 + 2);
                    boardroomBalances = response.slice(addresses.length * 3 + 2, addresses.length * 4 + 2);
                    return [2 /*return*/, Object.fromEntries(Array(addresses.length)
                            .fill('')
                            .map(function (_, i) {
                            var lpBalance = lpBalances[i][0].add(stakedLpBalances[i][0]);
                            var misLpBalance = lpBalance.mul(misPerLP).div(parseUnits('1', 18));
                            return [
                                addresses[i],
                                parseFloat(formatUnits(misLpBalance
                                    .add(tokenBalances[i][0])
                                    .add(boardroomBalances[i][0]), options.decimals))
                            ];
                        }))];
            }
        });
    });
}

var abi$e = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'addr',
                type: 'address'
            }
        ],
        name: 'totalStakedFor',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getPricePerFullShare',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$E(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, multi, result, dittoPerLP, autofarmBalance, cafeswapBalance, pricePerFullShare;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    multi = new Multicaller(network, provider, abi$e, { blockTag: blockTag });
                    multi.call('cafeswapBalance', options.token, 'balanceOf', [options.cafeswap]);
                    multi.call('jetfuelBalance', options.token, 'balanceOf', [options.jetfuel]);
                    multi.call('jetfuelTotalSupply', options.jetfuel, 'totalSupply');
                    multi.call('autofarmBalance', options.token, 'balanceOf', [options.autofarm]);
                    multi.call('pancakeBalance', options.token, 'balanceOf', [options.pancake]);
                    multi.call('pancakeTotalSupply', options.pancake, 'totalSupply');
                    multi.call('pricePerFullShare', options.jetfuel, 'getPricePerFullShare');
                    addresses.forEach(function (address) {
                        multi.call("scores." + address + ".totalStaked", options.sharePool, 'totalStakedFor', [address]);
                        multi.call("scores." + address + ".pancake", options.pancake, 'balanceOf', [
                            address
                        ]);
                        multi.call("scores." + address + ".jetfuel", options.jetfuel, 'balanceOf', [
                            address
                        ]);
                        multi.call("scores." + address + ".balance", options.token, 'balanceOf', [
                            address
                        ]);
                    });
                    return [4 /*yield*/, multi.execute()];
                case 1:
                    result = _a.sent();
                    dittoPerLP = result.pancakeBalance;
                    autofarmBalance = result.autofarmBalance;
                    cafeswapBalance = result.cafeswapBalance;
                    pricePerFullShare = result.pricePerFullShare;
                    return [2 /*return*/, Object.fromEntries(Array(addresses.length)
                            .fill('')
                            .map(function (_, i) {
                            var lpBalances = result.scores[addresses[i]].pancake;
                            var lpBalancesJetFuel = result.scores[addresses[i]].jetfuel;
                            var stakedLpBalances = result.scores[addresses[i]].totalStaked;
                            var tokenBalances = result.scores[addresses[i]].balance;
                            var lpBalance = lpBalances.add(stakedLpBalances);
                            var dittoLpBalance = lpBalance
                                .add(tokenBalances)
                                .mul(dittoPerLP)
                                .div(parseUnits('1', 9));
                            var dittoFuelBalance = lpBalancesJetFuel.mul(pricePerFullShare);
                            return [
                                addresses[i],
                                parseFloat(formatUnits(dittoLpBalance
                                    .add(dittoFuelBalance)
                                    .add(autofarmBalance)
                                    .add(cafeswapBalance), options.decimals))
                            ];
                        }))];
            }
        });
    });
}

// Merged ABIs from below contracts:
// * BPool from Balancer-labs: https://github.com/balancer-labs/balancer-core/blob/master/contracts/BPool.sol
// * Unipool contract from @k06a: https://github.com/k06a/Unipool/blob/master/contracts/Unipool.sol
var contractAbi = [
    {
        constant: true,
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'earned',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'getBalance',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function bn(num) {
    return BigNumber.from(num.toString());
}
function strategy$F(_space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, res, totalBPTsInBPool, totalTokensInBPool, tokensPerBPT, userTokensFromBPTList, userEarnedTokensList, sumList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, contractAbi, __spreadArrays([
                            [options.bpoolAddress, 'totalSupply', []],
                            [options.bpoolAddress, 'getBalance', [options.tokenAddress]]
                        ], addresses.map(function (address) { return [
                            options.unipoolAddress,
                            'balanceOf',
                            [address]
                        ]; }), addresses.map(function (address) { return [
                            options.unipoolAddress,
                            'earned',
                            [address]
                        ]; })), { blockTag: blockTag })];
                case 1:
                    res = _a.sent();
                    totalBPTsInBPool = bn(res[0]);
                    totalTokensInBPool = bn(res[1]);
                    tokensPerBPT = totalTokensInBPool.div(totalBPTsInBPool);
                    res = res.slice(2);
                    userTokensFromBPTList = res.slice(0, addresses.length).map(function (num) {
                        var userBPTs = bn(num); // decimal: 18
                        return userBPTs.mul(tokensPerBPT); // decimal: options.decimal
                    });
                    userEarnedTokensList = res.slice(addresses.length).map(function (num) {
                        return bn(num); // decimal: options.decimal
                    });
                    sumList = userTokensFromBPTList.map(function (userTokensFromBPT, i) {
                        return userTokensFromBPT.add(userEarnedTokensList[i]);
                    });
                    return [2 /*return*/, Object.fromEntries(sumList.map(function (sum, i) {
                            var parsedSum = parseFloat(formatUnits(sum, options.decimal));
                            return [addresses[i], parsedSum];
                        }))];
            }
        });
    });
}

var SUSHISWAP_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange'
};
function strategy$G(_space, network, _provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var params, tokenAddress, result, score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        users: {
                            __args: {
                                where: {
                                    id_in: addresses.map(function (address) { return address.toLowerCase(); })
                                },
                                first: 1000
                            },
                            id: true,
                            liquidityPositions: {
                                __args: {
                                    where: {
                                        liquidityTokenBalance_gt: 0
                                    }
                                },
                                liquidityTokenBalance: true,
                                pair: {
                                    id: true,
                                    token0: {
                                        id: true
                                    },
                                    reserve0: true,
                                    token1: {
                                        id: true
                                    },
                                    reserve1: true,
                                    totalSupply: true
                                }
                            }
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        params.users.liquidityPositions.__args.block = { number: snapshot };
                    }
                    tokenAddress = options.address.toLowerCase();
                    return [4 /*yield*/, subgraphRequest(SUSHISWAP_SUBGRAPH_URL[network], params)];
                case 1:
                    result = _a.sent();
                    score = {};
                    if (result && result.users) {
                        result.users.forEach(function (u) {
                            u.liquidityPositions
                                .filter(function (lp) {
                                return lp.pair.token0.id == tokenAddress ||
                                    lp.pair.token1.id == tokenAddress;
                            })
                                .forEach(function (lp) {
                                var token0perUni = lp.pair.reserve0 / lp.pair.totalSupply;
                                var token1perUni = lp.pair.reserve1 / lp.pair.totalSupply;
                                var userScore = lp.pair.token0.id == tokenAddress
                                    ? token0perUni * lp.liquidityTokenBalance
                                    : token1perUni * lp.liquidityTokenBalance;
                                var userAddress = getAddress(u.id);
                                if (!score[userAddress])
                                    score[userAddress] = 0;
                                score[userAddress] = score[userAddress] + userScore;
                            });
                        });
                    }
                    return [2 /*return*/, score || {}];
            }
        });
    });
}

var MASTERCHEF_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/sushiswap/master-chef'
};
var SUSHISWAP_SUBGRAPH_URL$1 = {
    '1': 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange'
};
function strategy$H(_space, network, _provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenAddress, sushiPools0Params, sushiPools1Params, sushiPools0Result, sushiPools1Result, allSushiPools, pools, masterchefParams, masterchefResult, one_gwei, stakedBalances, score, pair_1, token0perUni_1, token1perUni_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tokenAddress = options.address.toLowerCase();
                    sushiPools0Params = {
                        pairs: {
                            __args: {
                                where: {
                                    token0: tokenAddress
                                },
                                first: 100
                            },
                            id: true,
                            token0: {
                                id: true
                            },
                            reserve0: true,
                            token1: {
                                id: true
                            },
                            reserve1: true,
                            totalSupply: true
                        }
                    };
                    sushiPools1Params = {
                        pairs: {
                            __args: {
                                where: {
                                    token1: tokenAddress
                                },
                                first: 100
                            },
                            id: true,
                            token0: {
                                id: true
                            },
                            reserve0: true,
                            token1: {
                                id: true
                            },
                            reserve1: true,
                            totalSupply: true
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        sushiPools0Params.pairs.__args.block = { number: snapshot };
                        // @ts-ignore
                        sushiPools1Params.pairs.__args.block = { number: snapshot };
                    }
                    return [4 /*yield*/, subgraphRequest(SUSHISWAP_SUBGRAPH_URL$1[network], sushiPools0Params)];
                case 1:
                    sushiPools0Result = _a.sent();
                    return [4 /*yield*/, subgraphRequest(SUSHISWAP_SUBGRAPH_URL$1[network], sushiPools1Params)];
                case 2:
                    sushiPools1Result = _a.sent();
                    if (!sushiPools0Result || !sushiPools1Result) {
                        return [2 /*return*/];
                    }
                    allSushiPools = sushiPools0Result.pairs.concat(sushiPools1Result.pairs);
                    pools = allSushiPools.map(function (_a) {
                        var id = _a.id;
                        return id.toLowerCase();
                    });
                    masterchefParams = {
                        pools: {
                            __args: {
                                where: {
                                    pair_in: pools
                                },
                                first: 100
                            },
                            id: true,
                            pair: true,
                            users: {
                                __args: {
                                    where: {
                                        amount_gt: 0,
                                        address_in: addresses.map(function (address) { return address.toLowerCase(); })
                                    }
                                },
                                address: true,
                                amount: true
                            }
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        masterchefParams.pools.__args.block = { number: snapshot };
                    }
                    return [4 /*yield*/, subgraphRequest(MASTERCHEF_SUBGRAPH_URL[network], masterchefParams)];
                case 3:
                    masterchefResult = _a.sent();
                    one_gwei = BigNumber.from(10).pow(9);
                    stakedBalances = [];
                    if (masterchefResult && masterchefResult.pools.length == 1) {
                        stakedBalances = masterchefResult.pools[0].users.map(function (u) {
                            return {
                                address: u.address,
                                amount: u.amount
                            };
                        });
                    }
                    score = {};
                    if (allSushiPools && allSushiPools.length > 0) {
                        pair_1 = allSushiPools.filter(function (_a) {
                            var id = _a.id;
                            return id == masterchefResult.pools[0].pair;
                        })[0];
                        console.log(pair_1);
                        token0perUni_1 = pair_1.reserve0 / pair_1.totalSupply;
                        token1perUni_1 = pair_1.reserve1 / pair_1.totalSupply;
                        stakedBalances.forEach(function (u) {
                            var userScore = (u.amount / one_gwei.toNumber()) *
                                (pair_1.token0.id == tokenAddress ? token0perUni_1 : token1perUni_1);
                            var userScoreInEther = userScore / one_gwei.toNumber();
                            var userAddress = getAddress(u.address);
                            if (!score[userAddress])
                                score[userAddress] = 0;
                            score[userAddress] = score[userAddress] + userScoreInEther;
                        });
                    }
                    return [2 /*return*/, score || {}];
            }
        });
    });
}

var abi$f = [
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'userInfo',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'rewardDebt',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'poolsInfo',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$I(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, multi, result, parseRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    multi = new Multicaller(network, provider, abi$f, { blockTag: blockTag });
                    addresses.forEach(function (address) {
                        multi.call("stax." + address, options.stax.address, 'balanceOf', [address]);
                        multi.call("stakingChef." + address, options.stakingchef.address, 'poolsInfo', [address]);
                        options.pools.forEach(function (pool) {
                            multi.call("masterChef." + address + ".pool_" + pool.poolId, options.masterchef.address, 'userInfo', [pool.poolId, address]);
                        });
                    });
                    return [4 /*yield*/, multi.execute()];
                case 1:
                    result = _a.sent();
                    parseRes = function (elem, decimals) {
                        return parseFloat(formatUnits(elem, decimals));
                    };
                    return [2 /*return*/, Object.fromEntries(addresses.map(function (address) { return [
                            address,
                            parseRes(result.stax[address], options.stax.decimals) * 1 +
                                parseRes(result.stakingChef[address], options.stakingchef.decimals) *
                                    options.stakingchef.weightage +
                                +options.pools.reduce(function (prev, pool, idx) {
                                    return prev +
                                        parseRes(result.masterChef[address]["pool_" + pool.poolId], options.masterchef.decimals) *
                                            pool.weightage;
                                }, 0)
                        ]; }))];
            }
        });
    });
}

var KEEP_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/miracle2k/all-the-keeps'
};
function strategy$J(_space, network, _provider, addresses, _options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var params, result, score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        operators: {
                            __args: {
                                where: {
                                    owner_in: addresses.map(function (address) { return address.toLowerCase(); })
                                },
                                first: 1000
                            },
                            owner: true,
                            stakedAmount: true
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        params.operators.__args.block = { number: snapshot };
                    }
                    return [4 /*yield*/, subgraphRequest(KEEP_SUBGRAPH_URL[network], params)];
                case 1:
                    result = _a.sent();
                    score = {};
                    if (result && result.operators) {
                        result.operators.forEach(function (op) {
                            var userAddress = getAddress(op.owner);
                            if (!score[userAddress])
                                score[userAddress] = 0;
                            score[userAddress] = score[userAddress] + Number(op.stakedAmount);
                        });
                    }
                    return [2 /*return*/, score];
            }
        });
    });
}

var abi$g = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$K(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, multi, result, phoonPerMicLP, phoonPerUsdtLP;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    multi = new Multicaller(network, provider, abi$g, { blockTag: blockTag });
                    multi.call('micLP.phoon', options.token, 'balanceOf', [options.micLP]);
                    multi.call('micLP.totalSupply', options.micLP, 'totalSupply');
                    multi.call('usdtLP.phoon', options.token, 'balanceOf', [options.usdtLP]);
                    multi.call('usdtLP.totalSupply', options.usdtLP, 'totalSupply');
                    addresses.forEach(function (address) {
                        multi.call("balance." + address, options.token, 'balanceOf', [address]);
                        multi.call("micLP." + address + ".balance", options.micLP, 'balanceOf', [
                            address
                        ]);
                        multi.call("micLP." + address + ".staked", options.micRewardPool, 'balanceOf', [
                            address
                        ]);
                        multi.call("usdtLP." + address + ".balance", options.usdtLP, 'balanceOf', [
                            address
                        ]);
                        multi.call("usdtLP." + address + ".staked", options.usdtRewardPool, 'balanceOf', [address]);
                    });
                    return [4 /*yield*/, multi.execute()];
                case 1:
                    result = _a.sent();
                    phoonPerMicLP = parseUnits(result.micLP.phoon.toString(), 18).div(result.micLP.totalSupply);
                    phoonPerUsdtLP = parseUnits(result.usdtLP.phoon.toString(), 18).div(result.usdtLP.totalSupply);
                    return [2 /*return*/, Object.fromEntries(Array(addresses.length)
                            .fill('')
                            .map(function (_, i) {
                            var micPhoon = result.micLP[addresses[i]].balance
                                .add(result.micLP[addresses[i]].staked)
                                .mul(phoonPerMicLP)
                                .div(parseUnits('1', 18));
                            var usdtPhoon = result.usdtLP[addresses[i]].balance
                                .add(result.usdtLP[addresses[i]].staked)
                                .mul(phoonPerUsdtLP)
                                .div(parseUnits('1', 18));
                            var score = result.balance[addresses[i]].add(micPhoon).add(usdtPhoon);
                            return [addresses[i], parseFloat(formatUnits(score, 18))];
                        }))];
            }
        });
    });
}

function strategy$L(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var delegations, scores;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDelegations(space, network, provider, addresses, options, snapshot)];
                case 1:
                    delegations = _a.sent();
                    if (Object.keys(delegations).length === 0)
                        return [2 /*return*/, {}];
                    return [4 /*yield*/, getScores$1(space, options.strategies, network, provider, Object.values(delegations).reduce(function (a, b) {
                            return a.concat(b);
                        }), snapshot)];
                case 2:
                    scores = (_a.sent()).filter(function (score) { return Object.keys(score).length !== 0; });
                    return [2 /*return*/, Object.fromEntries(addresses.map(function (address) {
                            var addressScore = delegations[address]
                                ? delegations[address].reduce(function (a, b) { return a + scores.reduce(function (x, y) { return x + y[b] || 0; }, 0); }, 0)
                                : 0;
                            return [address, addressScore];
                        }))];
            }
        });
    });
}

function strategy$M(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Object.fromEntries(addresses.map(function (address) { return [address, 1]; }))];
        });
    });
}

var abi$h = [
    {
        inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
        name: 'isWhitelisted',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'stakes',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$N(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, multi, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    multi = new Multicaller(network, provider, abi$h, { blockTag: blockTag });
                    addresses.forEach(function (address) {
                        multi.call(address + ".isWhitelisted", options.whitelist, 'isWhitelisted', [
                            address
                        ]);
                        multi.call(address + ".stake", options.stake, 'stakes', [address]);
                    });
                    return [4 /*yield*/, multi.execute()];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, Object.fromEntries(addresses.map(function (address) {
                            var stake = parseFloat(formatUnits(result[address].stake.toString(), options.decimals));
                            return [
                                address,
                                result[address].isWhitelisted ? Math.sqrt(stake) + 1 : 0
                            ];
                        }))];
            }
        });
    });
}

function strategy$O(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, strategy$4(space, network, provider, addresses, options, snapshot)];
                case 1:
                    score = _a.sent();
                    return [2 /*return*/, Object.fromEntries(Object.entries(score).map(function (address) { return [
                            address[0],
                            address[1] > (options.min || 0) ? 1 : 0
                        ]; }))];
            }
        });
    });
}

var DECIMALS$1 = 18;
var abi$i = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
var chunk$2 = function (arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, function (v, i) {
        return arr.slice(i * size, i * size + size);
    });
};
function strategy$P(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, opiumQuery, wOpiumQuery, lp1inchOpiumEthQuery, farmingLp1inchOpiumEthQuery, response, opiumLp1inchOpiumEth, opiumLp1inchOpiumEthTotalSupply, responseClean, chunks, opiumBalances, wOpiumBalances, lp1inchOpiumEthBalances, farmingLp1inchOpiumEthBalances;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    opiumQuery = addresses.map(function (address) { return [
                        options.OPIUM,
                        'balanceOf',
                        [address]
                    ]; });
                    wOpiumQuery = addresses.map(function (address) { return [
                        options.wOPIUM,
                        'balanceOf',
                        [address]
                    ]; });
                    lp1inchOpiumEthQuery = addresses.map(function (address) { return [
                        options.LP_1INCH_OPIUM_ETH,
                        'balanceOf',
                        [address]
                    ]; });
                    farmingLp1inchOpiumEthQuery = addresses.map(function (address) { return [
                        options.FARMING_LP_1INCH_OPIUM_ETH,
                        'balanceOf',
                        [address]
                    ]; });
                    return [4 /*yield*/, multicall(network, provider, abi$i, __spreadArrays([
                            // Get 1inch LP OPIUM-ETH balance of OPIUM
                            [options.OPIUM, 'balanceOf', [options.LP_1INCH_OPIUM_ETH]],
                            // Get total supply of 1inch LP OPIUM-ETH
                            [options.LP_1INCH_OPIUM_ETH, 'totalSupply']
                        ], opiumQuery, wOpiumQuery, lp1inchOpiumEthQuery, farmingLp1inchOpiumEthQuery), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    opiumLp1inchOpiumEth = response[0];
                    opiumLp1inchOpiumEthTotalSupply = response[1];
                    responseClean = response.slice(2, response.length);
                    chunks = chunk$2(responseClean, addresses.length);
                    opiumBalances = chunks[0];
                    wOpiumBalances = chunks[1];
                    lp1inchOpiumEthBalances = chunks[2];
                    farmingLp1inchOpiumEthBalances = chunks[3];
                    return [2 /*return*/, Object.fromEntries(Array(addresses.length)
                            .fill('x')
                            .map(function (_, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(
                            // OPIUM
                            opiumBalances[i][0]
                                // wOPIUM
                                .add(wOpiumBalances[i][0])
                                // LP 1inch OPIUM-ETH + farming
                                .add(opiumLp1inchOpiumEth[0]
                                .mul(lp1inchOpiumEthBalances[i][0].add(farmingLp1inchOpiumEthBalances[i][0]))
                                .div(opiumLp1inchOpiumEthTotalSupply[0]))
                                .toString(), DECIMALS$1))
                        ]; }))];
            }
        });
    });
}

function verifyResultsLength(result, expectedResults, type) {
    result === expectedResults
        ? console.log(">>> SUCCESS: " + type + " match expected results - length")
        : console.error(">>> ERROR: " + type + " do not match expected results - length");
}
function verifyResults(result, expectedResults, type) {
    result === expectedResults
        ? console.log(">>> SUCCESS: " + type + " match expected results")
        : console.error(">>> ERROR: " + type + " do not match expected results");
}

var OCEAN_ERC20_DECIMALS = 18;
var OCEAN_SUBGRAPH_URL = {
    '1': 'https://subgraph.mainnet.oceanprotocol.com/subgraphs/name/oceanprotocol/ocean-subgraph',
    '42': 'https://subgraph.rinkeby.oceanprotocol.com/subgraphs/name/oceanprotocol/ocean-subgraph'
};
// Returns a BigDecimal as a BigNumber with 10^decimals extra zeros
function bdToBn(bd, decimals) {
    var bn;
    var splitDecimal = bd.split('.');
    if (splitDecimal.length > 1) {
        bn = splitDecimal[0] + "." + splitDecimal[1].slice(0, decimals - splitDecimal[0].length - 1);
    }
    else {
        bn = "" + splitDecimal[0];
    }
    var bn2 = parseUnits(bn, decimals);
    return bn2;
}
function strategy$Q(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var params, graphResults, score, userAddresses, return_score, results, expectedResults_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        pools: {
                            __args: {
                                first: 1000,
                                orderBy: 'oceanReserve',
                                orderDirection: 'desc'
                            },
                            active: true,
                            totalShares: true,
                            holderCount: true,
                            oceanReserve: true,
                            shares: {
                                __args: {
                                    where: {
                                        userAddress_in: addresses.map(function (address) { return address.toLowerCase(); })
                                    },
                                    orderBy: 'balance',
                                    orderDirection: 'desc'
                                },
                                userAddress: {
                                    id: true
                                },
                                balance: true
                            }
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        params.pools.__args.block = { number: +snapshot };
                    }
                    return [4 /*yield*/, subgraphRequest(OCEAN_SUBGRAPH_URL[network], params)];
                case 1:
                    graphResults = _a.sent();
                    score = {};
                    userAddresses = [];
                    return_score = {};
                    if (graphResults && graphResults.pools) {
                        graphResults.pools.forEach(function (pool) {
                            if (pool.holderCount > 0 && pool.active) {
                                pool.shares.map(function (share) {
                                    var userAddress = getAddress(share.userAddress.id);
                                    if (!userAddresses.includes(userAddress))
                                        userAddresses.push(userAddress);
                                    if (!score[userAddress])
                                        score[userAddress] = BigNumber.from(0);
                                    var userShare = share.balance * (pool.oceanReserve / pool.totalShares);
                                    if (userShare > 0.0001) {
                                        score[userAddress] = score[userAddress].add(bdToBn(userShare.toString(), OCEAN_ERC20_DECIMALS));
                                    }
                                });
                            }
                        });
                        // We then sum total votes, per user address
                        userAddresses.forEach(function (address) {
                            var parsedSum = parseFloat(formatUnits(score[address], OCEAN_ERC20_DECIMALS));
                            return_score[address] = parsedSum;
                        });
                    }
                    results = Object.fromEntries(Object.entries(return_score).filter(function (_a) {
                        var k = _a[0], v = _a[1];
                        return addresses.indexOf(k) >= 0;
                    }));
                    // Test validation: Update examples.json w/ expectedResults to reflect LPs @ blockHeight
                    // Success criteria: Address scores and length, must match expectedResults. Order not validated.
                    // From GRT's graphUtils.ts => verifyResults => Scores need to match expectedResults.
                    // npm run test --strategy=ocean-marketplace | grep -E 'SUCCESS|ERROR'
                    if (options.expectedResults) {
                        expectedResults_1 = {};
                        Object.keys(options.expectedResults.scores).forEach(function (key) {
                            expectedResults_1[key] = results[key];
                        });
                        verifyResults(JSON.stringify(expectedResults_1), JSON.stringify(options.expectedResults.scores), 'Scores');
                        verifyResultsLength(Object.keys(expectedResults_1).length, Object.keys(options.expectedResults.scores).length, 'Scores');
                    }
                    return [2 /*return*/, results || {}];
            }
        });
    });
}

var GRAPH_NETWORK_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/graphprotocol/graph-network-mainnet',
    '4': 'https://api.thegraph.com/subgraphs/name/graphprotocol/graph-network-testnet'
};
var bnWEI = BigNumber.from('1000000000000000000');
// Pass in a BigDecimal and BigNumber from a subgraph query, and return the multiplication of
// them as a BigNumber
function bdMulBn(bd, bn) {
    var splitDecimal = bd.split('.');
    var split;
    // Truncate the BD so it can be converted to a BN (no decimals) when multiplied by WEI
    if (splitDecimal.length > 1) {
        split = splitDecimal[0] + "." + splitDecimal[1].slice(0, 18);
    }
    else {
        // Didn't have decimals, even though it was BigDecimal (i.e. "2")
        return BigNumber.from(bn).mul(BigNumber.from(bd));
    }
    // Convert it to BN
    var bdWithWEI = parseUnits(split, 18);
    // Multiple, then divide by WEI to have it back in BN
    return BigNumber.from(bn).mul(bdWithWEI).div(bnWEI);
}
function calcNonStakedTokens(totalSupply, totalTokensStaked, totalDelegatedTokens) {
    return BigNumber.from(totalSupply)
        .sub(BigNumber.from(totalTokensStaked))
        .sub(BigNumber.from(totalDelegatedTokens))
        .div(bnWEI)
        .toNumber();
}
function verifyResults$1(result, expectedResults, type) {
    result === expectedResults
        ? console.log(">>> SUCCESS: " + type + " match expected results")
        : console.error(">>> ERROR: " + type + " do not match expected results");
}

var TOKEN_DISTRIBUTION_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/graphprotocol/token-distribution',
    '4': 'https://api.thegraph.com/subgraphs/name/davekaj/token-distribution-rinkeby'
};
/*
  @dev Queries the subgraph to find if an address owns any token lock wallets
  @returns An object with the beneficiaries as keys and TLWs as values in an array
*/
function getTokenLockWallets(_space, network, _provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenLockParams, result, tokenLockWallets;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tokenLockParams = {
                        tokenLockWallets: {
                            __args: {
                                where: {
                                    beneficiary_in: addresses
                                },
                                first: 1000
                            },
                            id: true,
                            beneficiary: true
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        tokenLockParams.tokenLockWallets.__args.block = { number: snapshot };
                    }
                    return [4 /*yield*/, subgraphRequest(TOKEN_DISTRIBUTION_SUBGRAPH_URL[network], tokenLockParams)];
                case 1:
                    result = _a.sent();
                    tokenLockWallets = {};
                    if (result && result.tokenLockWallets) {
                        if (options.expectedResults) {
                            verifyResults$1(JSON.stringify(result.tokenLockWallets), JSON.stringify(options.expectedResults.tokenLockWallets), 'Token lock wallets');
                        }
                        result.tokenLockWallets.forEach(function (tw) {
                            if (tokenLockWallets[tw.beneficiary] == undefined)
                                tokenLockWallets[tw.beneficiary] = [];
                            tokenLockWallets[tw.beneficiary] = tokenLockWallets[tw.beneficiary].concat(tw.id);
                        });
                    }
                    else {
                        console.error('Subgraph request failed');
                    }
                    return [2 /*return*/, tokenLockWallets || {}];
            }
        });
    });
}

function balanceStrategy(_space, network, _provider, addresses, _options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var balanceParams, result, score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    balanceParams = {
                        graphAccounts: {
                            __args: {
                                where: {
                                    id_in: addresses
                                },
                                first: 1000
                            },
                            id: true,
                            balance: true
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        balanceParams.graphAccounts.__args.block = { number: snapshot };
                    }
                    return [4 /*yield*/, subgraphRequest(GRAPH_NETWORK_SUBGRAPH_URL[network], balanceParams)];
                case 1:
                    result = _a.sent();
                    score = {};
                    if (result && result.graphAccounts) {
                        // Must iterate on addresses since the query can return nothing for a beneficiary that has
                        // only interacted through token lock wallets
                        addresses.forEach(function (a) {
                            var balanceScore = 0;
                            for (var i = 0; i < result.graphAccounts.length; i++) {
                                if (result.graphAccounts[i].id == a) {
                                    balanceScore = BigNumber.from(result.graphAccounts[i].balance)
                                        .div(bnWEI)
                                        .toNumber();
                                    break;
                                }
                            }
                            score[a] = balanceScore;
                        });
                    }
                    else {
                        console.error('Subgraph request failed');
                    }
                    return [2 /*return*/, score || {}];
            }
        });
    });
}

function indexersStrategy(_space, network, _provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var indexersParams, result, score, normalizationFactor, nonStakedTokens;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    indexersParams = {
                        graphAccounts: {
                            __args: {
                                where: {
                                    id_in: addresses
                                },
                                first: 1000
                            },
                            id: true,
                            indexer: {
                                stakedTokens: true
                            }
                        },
                        graphNetworks: {
                            __args: {
                                first: 1000
                            },
                            totalSupply: true,
                            totalDelegatedTokens: true,
                            totalTokensStaked: true
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        indexersParams.graphAccounts.__args.block = { number: snapshot };
                        // @ts-ignore
                        indexersParams.graphNetworks.__args.block = { number: snapshot };
                    }
                    return [4 /*yield*/, subgraphRequest(GRAPH_NETWORK_SUBGRAPH_URL[network], indexersParams)];
                case 1:
                    result = _a.sent();
                    score = {};
                    normalizationFactor = 0;
                    if (result && result.graphNetworks) {
                        nonStakedTokens = calcNonStakedTokens(result.graphNetworks[0].totalSupply, result.graphNetworks[0].totalTokensStaked, result.graphNetworks[0].totalDelegatedTokens);
                        normalizationFactor =
                            nonStakedTokens /
                                BigNumber.from(result.graphNetworks[0].totalTokensStaked)
                                    .div(bnWEI)
                                    .toNumber();
                    }
                    if (options.expectedResults) {
                        verifyResults$1(normalizationFactor.toString(), options.expectedResults.normalizationFactor.toString(), 'Normalization factor');
                    }
                    if (result && result.graphAccounts) {
                        addresses.forEach(function (a) {
                            var indexerScore = 0;
                            for (var i = 0; i < result.graphAccounts.length; i++) {
                                if (result.graphAccounts[i].id == a) {
                                    if (result.graphAccounts[i].indexer != null) {
                                        var indexerTokens = BigNumber.from(result.graphAccounts[i].indexer.stakedTokens);
                                        indexerScore =
                                            indexerTokens.div(bnWEI).toNumber() * normalizationFactor;
                                    }
                                    break;
                                }
                            }
                            score[a] = indexerScore;
                        });
                    }
                    else {
                        console.error('Subgraph request failed');
                    }
                    return [2 /*return*/, score || {}];
            }
        });
    });
}

function delegatorsStrategy(_space, network, _provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var delegatorsParams, result, score, normalizationFactor, nonStakedTokens;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    delegatorsParams = {
                        graphAccounts: {
                            __args: {
                                where: {
                                    id_in: addresses
                                },
                                first: 1000
                            },
                            id: true,
                            delegator: {
                                stakes: {
                                    shareAmount: true,
                                    lockedTokens: true,
                                    indexer: {
                                        delegationExchangeRate: true
                                    }
                                }
                            }
                        },
                        graphNetworks: {
                            __args: {
                                first: 1000
                            },
                            totalSupply: true,
                            totalDelegatedTokens: true,
                            totalTokensStaked: true
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        delegatorsParams.graphAccounts.__args.block = { number: snapshot };
                        // @ts-ignore
                        delegatorsParams.graphNetworks.__args.block = { number: snapshot };
                    }
                    return [4 /*yield*/, subgraphRequest(GRAPH_NETWORK_SUBGRAPH_URL[network], delegatorsParams)];
                case 1:
                    result = _a.sent();
                    score = {};
                    normalizationFactor = 0;
                    if (result && result.graphNetworks) {
                        nonStakedTokens = calcNonStakedTokens(result.graphNetworks[0].totalSupply, result.graphNetworks[0].totalTokensStaked, result.graphNetworks[0].totalDelegatedTokens);
                        normalizationFactor =
                            nonStakedTokens /
                                BigNumber.from(result.graphNetworks[0].totalDelegatedTokens)
                                    .div(bnWEI)
                                    .toNumber();
                    }
                    if (options.expectedResults) {
                        verifyResults$1(normalizationFactor.toString(), options.expectedResults.normalizationFactor.toString(), 'Normalization factor');
                    }
                    if (result && result.graphAccounts) {
                        addresses.forEach(function (a) {
                            var delegationScore = 0;
                            for (var i = 0; i < result.graphAccounts.length; i++) {
                                if (result.graphAccounts[i].id == a) {
                                    if (result.graphAccounts[i].delegator != null) {
                                        result.graphAccounts[i].delegator.stakes.forEach(function (s) {
                                            var delegatedTokens = bdMulBn(s.indexer.delegationExchangeRate, s.shareAmount);
                                            var lockedTokens = BigNumber.from(s.lockedTokens);
                                            var oneDelegationScore = delegatedTokens
                                                .add(lockedTokens)
                                                .div(bnWEI)
                                                .toNumber();
                                            delegationScore = delegationScore + oneDelegationScore;
                                        });
                                        delegationScore = delegationScore * normalizationFactor;
                                    }
                                }
                            }
                            score[a] = delegationScore;
                        });
                    }
                    else {
                        console.error('Subgraph request failed');
                    }
                    return [2 /*return*/, score || {}];
            }
        });
    });
}

function baseStrategy(_space, network, _provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenLockWallets, allAccounts, beneficiary, scores, combinedScores, _loop_1, _i, addresses_1, account;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    addresses = addresses.map(function (address) { return address.toLowerCase(); });
                    return [4 /*yield*/, getTokenLockWallets(_space, network, _provider, addresses, options, snapshot)];
                case 1:
                    tokenLockWallets = _a.sent();
                    allAccounts = __spreadArrays(addresses);
                    for (beneficiary in tokenLockWallets) {
                        tokenLockWallets[beneficiary].forEach(function (tw) {
                            allAccounts.push(tw);
                        });
                    }
                    scores = {};
                    if (!(options.strategyType == 'balance')) return [3 /*break*/, 3];
                    return [4 /*yield*/, balanceStrategy(_space, network, _provider, allAccounts, options, snapshot)];
                case 2:
                    scores = _a.sent();
                    return [3 /*break*/, 8];
                case 3:
                    if (!(options.strategyType == 'delegation')) return [3 /*break*/, 5];
                    return [4 /*yield*/, delegatorsStrategy(_space, network, _provider, allAccounts, options, snapshot)];
                case 4:
                    scores = _a.sent();
                    return [3 /*break*/, 8];
                case 5:
                    if (!(options.strategyType == 'indexing')) return [3 /*break*/, 7];
                    return [4 /*yield*/, indexersStrategy(_space, network, _provider, allAccounts, options, snapshot)];
                case 6:
                    scores = _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    console.error('ERROR: Strategy does not exist');
                    _a.label = 8;
                case 8:
                    if (options.expectedResults) {
                        verifyResults$1(JSON.stringify(scores), JSON.stringify(options.expectedResults.scores), 'Scores');
                    }
                    combinedScores = {};
                    _loop_1 = function (account) {
                        var accountScore = scores[account];
                        // It was found that this beneficiary has token lock wallets, lets add them
                        if (tokenLockWallets[account] != null) {
                            tokenLockWallets[account].forEach(function (tw) {
                                accountScore = accountScore + scores[tw];
                            });
                        }
                        combinedScores[account] = accountScore;
                    };
                    for (_i = 0, addresses_1 = addresses; _i < addresses_1.length; _i++) {
                        account = addresses_1[_i];
                        _loop_1(account);
                    }
                    if (options.expectedResults) {
                        verifyResults$1(JSON.stringify(combinedScores), JSON.stringify(options.expectedResults.combinedScores), 'Combined scores');
                    }
                    return [2 /*return*/, Object.fromEntries(Object.entries(combinedScores).map(function (score) { return [
                            getAddress(score[0]),
                            score[1]
                        ]; }))];
            }
        });
    });
}

function strategy$R(_space, network, _provider, addresses, _options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, baseStrategy(_space, network, _provider, addresses, _options, snapshot)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

function strategy$S(_space, network, _provider, addresses, _options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, baseStrategy(_space, network, _provider, addresses, _options, snapshot)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

function strategy$T(_space, network, _provider, addresses, _options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, baseStrategy(_space, network, _provider, addresses, _options, snapshot)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

function strategy$U(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var whitelist;
        return __generator(this, function (_a) {
            whitelist = options === null || options === void 0 ? void 0 : options.addresses.map(function (address) { return address.toLowerCase(); });
            return [2 /*return*/, Object.fromEntries(addresses.map(function (address) { return [
                    address,
                    whitelist.includes(address.toLowerCase()) ? 1 : 0
                ]; }))];
        });
    });
}

var abi$j = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
        name: 'earned',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$V(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, response, lonPerLPUniswap, lonPerLPSushiSwap, lpBalancesUniswap, lpBalancesUniswapStaking2, lonEarnedBalancesUniswapStaking2, lpBalancesUniswapStaking3, lonEarnedBalancesUniswapStaking3, lpBalancesSushiSwap, lpBalancesSushiSwapStaking2, lonEarnedBalancesSushiSwapStaking2, lpBalancesSushiSwapStaking3, lonEarnedBalancesSushiSwapStaking3, tokenBalances, lonBalanceOfxLON, xLONTotalSupply, xLONBalanceOfUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$j, __spreadArrays([
                            [options.token, 'balanceOf', [options.uniswap]],
                            [options.uniswap, 'totalSupply'],
                            [options.token, 'balanceOf', [options.sushiswap]],
                            [options.sushiswap, 'totalSupply']
                        ], addresses.map(function (address) { return [
                            options.uniswap,
                            'balanceOf',
                            [address]
                        ]; }), addresses.map(function (address) { return [
                            options.stakingRewardUniswap2,
                            'balanceOf',
                            [address]
                        ]; }), addresses.map(function (address) { return [
                            options.stakingRewardUniswap2,
                            'earned',
                            [address]
                        ]; }), addresses.map(function (address) { return [
                            options.stakingRewardUniswap3,
                            'balanceOf',
                            [address]
                        ]; }), addresses.map(function (address) { return [
                            options.stakingRewardUniswap3,
                            'earned',
                            [address]
                        ]; }), addresses.map(function (address) { return [
                            options.sushiswap,
                            'balanceOf',
                            [address]
                        ]; }), addresses.map(function (address) { return [
                            options.stakingRewardSushiSwap2,
                            'balanceOf',
                            [address]
                        ]; }), addresses.map(function (address) { return [
                            options.stakingRewardSushiSwap2,
                            'earned',
                            [address]
                        ]; }), addresses.map(function (address) { return [
                            options.stakingRewardSushiSwap3,
                            'balanceOf',
                            [address]
                        ]; }), addresses.map(function (address) { return [
                            options.stakingRewardSushiSwap3,
                            'earned',
                            [address]
                        ]; }), addresses.map(function (address) { return [
                            options.token,
                            'balanceOf',
                            [address]
                        ]; }), [
                            [options.token, 'balanceOf', [options.xLON]],
                            [options.xLON, 'totalSupply', []]
                        ], addresses.map(function (address) { return [options.xLON, 'balanceOf', [address]]; })), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    lonPerLPUniswap = parseUnits(response[0][0].toString(), 18).div(response[1][0]);
                    lonPerLPSushiSwap = parseUnits(response[2][0].toString(), 18).div(response[3][0]);
                    lpBalancesUniswap = response.slice(4, addresses.length + 4);
                    lpBalancesUniswapStaking2 = response.slice(addresses.length * 1 + 4, addresses.length * 2 + 4);
                    lonEarnedBalancesUniswapStaking2 = response.slice(addresses.length * 2 + 4, addresses.length * 3 + 4);
                    lpBalancesUniswapStaking3 = response.slice(addresses.length * 3 + 4, addresses.length * 4 + 4);
                    lonEarnedBalancesUniswapStaking3 = response.slice(addresses.length * 4 + 4, addresses.length * 5 + 4);
                    lpBalancesSushiSwap = response.slice(addresses.length * 5 + 4, addresses.length * 6 + 4);
                    lpBalancesSushiSwapStaking2 = response.slice(addresses.length * 6 + 4, addresses.length * 7 + 4);
                    lonEarnedBalancesSushiSwapStaking2 = response.slice(addresses.length * 7 + 4, addresses.length * 8 + 4);
                    lpBalancesSushiSwapStaking3 = response.slice(addresses.length * 8 + 4, addresses.length * 9 + 4);
                    lonEarnedBalancesSushiSwapStaking3 = response.slice(addresses.length * 9 + 4, addresses.length * 10 + 4);
                    tokenBalances = response.slice(addresses.length * 10 + 4, addresses.length * 11 + 4);
                    lonBalanceOfxLON = response.slice(addresses.length * 11 + 4, addresses.length * 11 + 5)[0][0];
                    xLONTotalSupply = response.slice(addresses.length * 11 + 5, addresses.length * 11 + 6)[0][0];
                    xLONBalanceOfUsers = response.slice(addresses.length * 11 + 6, addresses.length * 12 + 6);
                    return [2 /*return*/, Object.fromEntries(Array(addresses.length)
                            .fill('')
                            .map(function (_, i) {
                            var xLONBalanceOfUser = xLONBalanceOfUsers[i][0];
                            var userLONShares = xLONBalanceOfUser
                                .mul(lonBalanceOfxLON)
                                .div(xLONTotalSupply);
                            var lpBalanceUniswap = lpBalancesUniswap[i][0];
                            var lpBalanceUniswapStaking2 = lpBalancesUniswapStaking2[i][0];
                            var lpBalanceUniswapStaking3 = lpBalancesUniswapStaking3[i][0];
                            var lonLpBalanceUniswap = lpBalanceUniswap
                                .add(lpBalanceUniswapStaking2)
                                .add(lpBalanceUniswapStaking3)
                                .mul(lonPerLPUniswap)
                                .div(parseUnits('1', 18));
                            var lonEarnedBalanceUniswapStaking2 = lonEarnedBalancesUniswapStaking2[i][0];
                            var lonEarnedBalanceUniswapStaking3 = lonEarnedBalancesUniswapStaking3[i][0];
                            var lpBalanceSushiSwap = lpBalancesSushiSwap[i][0];
                            var lpBalanceSushiSwapStaking2 = lpBalancesSushiSwapStaking2[i][0];
                            var lpBalanceSushiSwapStaking3 = lpBalancesSushiSwapStaking3[i][0];
                            var lonLpBalanceSushiSwap = lpBalanceSushiSwap
                                .add(lpBalanceSushiSwapStaking2)
                                .add(lpBalanceSushiSwapStaking3)
                                .mul(lonPerLPSushiSwap)
                                .div(parseUnits('1', 18));
                            var lonEarnedBalanceSushiSwapStaking2 = lonEarnedBalancesSushiSwapStaking2[i][0];
                            var lonEarnedBalanceSushiSwapStaking3 = lonEarnedBalancesSushiSwapStaking3[i][0];
                            return [
                                addresses[i],
                                parseFloat(formatUnits(tokenBalances[i][0]
                                    .add(userLONShares)
                                    .add(lonLpBalanceUniswap)
                                    .add(lonEarnedBalanceUniswapStaking2)
                                    .add(lonEarnedBalanceUniswapStaking3)
                                    .add(lonLpBalanceSushiSwap)
                                    .add(lonEarnedBalanceSushiSwapStaking2)
                                    .add(lonEarnedBalanceSushiSwapStaking3), options.decimals))
                            ];
                        }))];
            }
        });
    });
}

var abi$k = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'addr',
                type: 'address'
            }
        ],
        name: 'totalStakedFor',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$W(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, multi, result, rebasedPerLP;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    multi = new Multicaller(network, provider, abi$k, { blockTag: blockTag });
                    multi.call('uniswapBalance', options.token, 'balanceOf', [options.uniswap]);
                    multi.call('uniswapTotalSupply', options.uniswap, 'totalSupply');
                    addresses.forEach(function (address) {
                        multi.call("scores." + address + ".totalStaked", options.sharePool, 'totalStakedFor', [address]);
                        multi.call("scores." + address + ".uniswap", options.uniswap, 'balanceOf', [
                            address
                        ]);
                        multi.call("scores." + address + ".balance", options.token, 'balanceOf', [
                            address
                        ]);
                    });
                    return [4 /*yield*/, multi.execute()];
                case 1:
                    result = _a.sent();
                    rebasedPerLP = result.uniswapBalance;
                    return [2 /*return*/, Object.fromEntries(Array(addresses.length)
                            .fill('')
                            .map(function (_, i) {
                            var lpBalances = result.scores[addresses[i]].uniswap;
                            var stakedLpBalances = result.scores[addresses[i]].totalStaked;
                            var tokenBalances = result.scores[addresses[i]].balance;
                            var lpBalance = lpBalances.add(stakedLpBalances);
                            var rebasedLpBalance = lpBalance
                                .add(tokenBalances)
                                .mul(rebasedPerLP)
                                .div(parseUnits('1', 18));
                            return [
                                addresses[i],
                                parseFloat(formatUnits(rebasedLpBalance, options.decimals))
                            ];
                        }))];
            }
        });
    });
}

var SUBGRAPH_URL$1 = {
    '1': 'https://api.thegraph.com/subgraphs/name/proofofbeauty/hash'
};
function strategy$X(_space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var lowerCasedAddressToOriginalAddressMap, hashOwnersParams, result, scoresMap, scores;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lowerCasedAddressToOriginalAddressMap = Object.fromEntries(new Map(addresses.map(function (a) { return [a.toLowerCase(), a]; })));
                    hashOwnersParams = {
                        hashOwners: {
                            __args: {
                                where: {
                                    id_in: Object.keys(lowerCasedAddressToOriginalAddressMap)
                                },
                                first: 1000 // IS THIS ENOUGH?
                            },
                            id: true,
                            totalQuantity: true
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        hashOwnersParams.hashOwners.__args.block = { number: snapshot };
                    }
                    return [4 /*yield*/, subgraphRequest(SUBGRAPH_URL$1[network], hashOwnersParams)];
                case 1:
                    result = _a.sent();
                    scoresMap = {};
                    if (result && result.hashOwners) {
                        result.hashOwners.forEach(function (ow) {
                            var id = lowerCasedAddressToOriginalAddressMap[ow.id];
                            if (scoresMap[id] == undefined)
                                scoresMap[id] = 0;
                            scoresMap[id] = scoresMap[id] + parseInt(ow.totalQuantity);
                        });
                    }
                    else {
                        console.error('Subgraph request failed');
                    }
                    scores = Object.entries(scoresMap).map(function (_a) {
                        var address = _a[0], score = _a[1];
                        return [address, score];
                    });
                    return [2 /*return*/, Object.fromEntries(scores)];
            }
        });
    });
}

var data_reader_address = '0x421456eFcEBf814975c8739CD613e5e7a954C474';
var data_reader_abi = [
    {
        name: 'getDaoShares',
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        outputs: [
            {
                internalType: 'uint256',
                name: 'daoShares',
                type: 'uint256'
            }
        ]
    }
];
function strategy$Y(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, totalShares, shares_by_address, _1e18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, data_reader_abi, addresses.map(function (addr) { return [
                            data_reader_address,
                            'getDaoShares',
                            [addr]
                        ]; }), { blockTag: blockTag })];
                case 1:
                    totalShares = _a.sent();
                    shares_by_address = {};
                    _1e18 = BigNumber.from('1000000000000000000');
                    totalShares.forEach(function (v, i) {
                        var sharesBN = BigNumber.from(v.toString());
                        shares_by_address[addresses[i]] = sharesBN.div(_1e18).toNumber();
                    });
                    return [2 /*return*/, shares_by_address];
            }
        });
    });
}

var abi$l = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$Z(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$l, addresses.map(function (address) { return [
                            options.address,
                            'balanceOf',
                            [address, options.tokenId]
                        ]; }), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.toString(), options.decimals))
                        ]; }))];
            }
        });
    });
}

function strategy$_(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, strategy$Z(space, network, provider, addresses, options, snapshot)];
                case 1:
                    score = _a.sent();
                    return [2 /*return*/, Object.fromEntries(Object.entries(score).map(function (address) { return [address[0], Math.sqrt(address[1])]; }))];
            }
        });
    });
}

var abi$m = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'getCurrentVotes',
        outputs: [
            {
                internalType: 'uint96',
                name: '',
                type: 'uint96'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$$(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$m, addresses.map(function (address) { return [
                            options.address,
                            'getCurrentVotes',
                            [address.toLowerCase()],
                            { blockTag: blockTag }
                        ]; }))];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.toString(), options.decimals))
                        ]; }))];
            }
        });
    });
}

function strategy$10(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var max, pages, promises, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    max = options.limit || 300;
                    pages = Math.ceil(addresses.length / max);
                    promises = [];
                    Array.from(Array(pages)).forEach(function (x, i) {
                        var addressesInPage = addresses.slice(max * i, max * (i + 1));
                        promises.push(strategies[options.strategy.name](space, network, provider, addressesInPage, options.strategy.params, snapshot));
                    });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    results = _a.sent();
                    // @ts-ignore
                    return [2 /*return*/, results.reduce(function (obj, result) { return (__assign(__assign({}, obj), result)); }, {})];
            }
        });
    });
}

var tokenAbi$2 = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_lpToken',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '_account',
                type: 'address'
            }
        ],
        name: 'getUser',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'amount',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'rewardsWriteoffs',
                        type: 'uint256[]'
                    }
                ],
                internalType: 'struct IBonusRewards.User',
                name: '',
                type: 'tuple'
            },
            {
                internalType: 'uint256[]',
                name: '',
                type: 'uint256[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$11(_space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, res, totalSupply, tokenBalanceInLP, tokensPerLP, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, tokenAbi$2, [
                            [options.sushiPoolAddress, 'totalSupply', []],
                            [options.tokenAddress, 'balanceOf', [options.sushiPoolAddress]]
                        ].concat(addresses.map(function (address) { return [
                            options.stakingAddress,
                            'getUser',
                            [options.sushiPoolAddress, address]
                        ]; })), { blockTag: blockTag })];
                case 1:
                    res = _a.sent();
                    totalSupply = res[0];
                    tokenBalanceInLP = res[1];
                    tokensPerLP = tokenBalanceInLP / Math.pow(10, options.decimals) / (totalSupply / 1e18);
                    response = res.slice(2);
                    return [2 /*return*/, Object.fromEntries(response.map(function (_a, i) {
                            var userInfo = _a[0], _ = _a[1];
                            return [
                                addresses[i],
                                (userInfo.amount / Math.pow(10, options.decimals)) * tokensPerLP
                            ];
                        }))];
            }
        });
    });
}

/**
 * Any standard xToken with `balanceOf` and `getShareValue` can use this strategy.
 */
var abi$n = [
    {
        constant: true,
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getShareValue',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$12(space, network, provider, addresses, params, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, balanceCallParams, res, shareValue, balances;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    balanceCallParams = addresses.map(function (addr) { return [
                        params.tokenAddress,
                        'balanceOf',
                        [addr]
                    ]; });
                    return [4 /*yield*/, multicall(network, provider, abi$n, __spreadArrays([[params.tokenAddress, 'getShareValue']], balanceCallParams), { blockTag: blockTag })];
                case 1:
                    res = _a.sent();
                    shareValue = res[0] / 1e18;
                    balances = res.slice(1);
                    return [2 /*return*/, Object.fromEntries(balances.map(function (balance, i) { return [addresses[i], (balance * shareValue) / 1e18]; }))];
            }
        });
    });
}

var abi$o = [
    {
        inputs: [
            { internalType: 'uint256', name: '', type: 'uint256' },
            { internalType: 'address', name: '', type: 'address' }
        ],
        name: 'userInfo',
        outputs: [
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            { internalType: 'uint256', name: 'rewardDebt', type: 'uint256' }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$13(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$o, addresses.map(function (address) { return [
                            options.address,
                            'userInfo',
                            [options.pool, address]
                        ]; }), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.amount.toString(), options.decimals))
                        ]; }))];
            }
        });
    });
}

var erc20Abi = [
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
var masterChefAbi$1 = [
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'userInfo',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'rewardDebt',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        name: 'poolInfo',
        outputs: [
            {
                internalType: 'contract IERC20',
                name: 'lpToken',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'allocPoint',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'lastRewardBlock',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'accMMPerShare',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$14(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, masterChefMulti, masterChefResult_1, erc20Multi, erc20Result_1, masterChefResult_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    masterChefMulti = new Multicaller(network, provider, masterChefAbi$1, {
                        blockTag: blockTag
                    });
                    addresses.forEach(function (address) {
                        masterChefMulti.call(address + ".userInfo.amount", options.masterchef, 'userInfo', [options.pool, address]);
                    });
                    if (!(options.type === 'lp')) return [3 /*break*/, 3];
                    masterChefMulti.call('poolInfo.lpToken', options.masterchef, 'poolInfo', [
                        options.pool
                    ]);
                    return [4 /*yield*/, masterChefMulti.execute()];
                case 1:
                    masterChefResult_1 = _a.sent();
                    erc20Multi = new Multicaller(network, provider, erc20Abi, {
                        blockTag: blockTag
                    });
                    erc20Multi.call('lpTotalSupply', masterChefResult_1.poolInfo.lpToken, 'totalSupply');
                    erc20Multi.call('poolMMBalance', options.govtoken, 'balanceOf', [
                        masterChefResult_1.poolInfo.lpToken
                    ]);
                    return [4 /*yield*/, erc20Multi.execute()];
                case 2:
                    erc20Result_1 = _a.sent();
                    return [2 /*return*/, Object.fromEntries(addresses.map(function (address) {
                            return [
                                address,
                                parseFloat(formatUnits(masterChefResult_1[address].userInfo.amount
                                    .mul(erc20Result_1.poolMMBalance)
                                    .div(erc20Result_1.lpTotalSupply)
                                    .toString(), 18))
                            ];
                        }))];
                case 3: return [4 /*yield*/, masterChefMulti.execute()];
                case 4:
                    masterChefResult_2 = _a.sent();
                    return [2 /*return*/, Object.fromEntries(addresses.map(function (address) {
                            return [
                                address,
                                parseFloat(formatUnits(masterChefResult_2[address].userInfo.amount.toString(), 18))
                            ];
                        }))];
            }
        });
    });
}

function strategy$15(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        // Given a card and address-tokencount mapping,
        // calculate the weight for this card.
        // i.e., assuming card CRO01 had weight 1.5,
        //       given  {'0x123': 2, '0x456': 4}
        //       return {'0x123': 3, '0x456': 6}
        function applyWeightForCard(cardName, addressHoldings) {
            var weight = curioWeights[cardName];
            var result = {};
            Object.keys(addressHoldings).map(function (k) {
                result[k] = addressHoldings[k] * weight;
            });
            return result;
        }
        // Sums multiple address-voteweight mappings into a single object.
        // i.e., given [{'0x123': 1, '0x456': 2}, {'0x123': 10, '0x456': 20}]
        //       return {'0x123': 11, '0x456': 22}
        function sumAddressWeights(arrayOfWeights) {
            return arrayOfWeights.reduce(function (sum, current) {
                for (var k in current) {
                    sum[k] = (sum[k] || 0) + current[k];
                }
                return sum;
            }, {});
        }
        // helper
        function returnPromiseWithContext(promise, context) {
            return __awaiter(this, void 0, void 0, function () {
                var ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, promise];
                        case 1:
                            ret = _a.sent();
                            return [2 /*return*/, { rv: ret, context: context }];
                    }
                });
            });
        }
        var curioAddresses, curioSupply, curioWeights, cardBalancePromises;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    curioAddresses = {
                        CRO1: '0x6aa2044c7a0f9e2758edae97247b03a0d7e73d6c',
                        CRO2: '0xe9a6a26598b05db855483ff5ecc5f1d0c81140c8',
                        CRO3: '0x3f8131b6e62472ceea9cb8aa67d87425248a3702',
                        CRO4: '0x4f1694be039e447b729ab11653304232ae143c69',
                        CRO5: '0x5a3d4a8575a688b53e8b270b5c1f26fd63065219',
                        CRO6: '0x1ca6ac0ce771094f0f8a383d46bf3acc9a5bf27f',
                        CRO7: '0x2647bd8777e0c66819d74ab3479372ea690912c3',
                        CRO8: '0x2fce2713a561bb019bc5a110be0a19d10581ee9e',
                        CRO9: '0xbf4cc966f1e726087c5c55aac374e687000d4d45',
                        CRO10: '0x72b34d637c0d14ace58359ef1bf472e4b4c57125',
                        CRO11: '0xb36c87f1f1539c5fc6f6e7b1c632e1840c9b66b4',
                        CRO12: '0xd15af10a258432e7227367499e785c3532b50271',
                        CRO13: '0x2d922712f5e99428c65b44f09ea389373d185bb3',
                        CRO14: '0x0565ac44e5119a3224b897de761a46a92aa28ae8',
                        CRO15: '0xdb7f262237ad8acca8922aa2c693a34d0d13e8fe',
                        CRO16: '0x1b63532ccb1fee0595c7fe2cb35cfd70ddf862cd',
                        CRO17: '0xf59536290906f204c3c7918d40c1cc5f99643d0b',
                        CRO18: '0xa507d9d28bbca54cbcffad4bb770c2ea0519f4f0',
                        CRO19: '0xf26bc97aa8afe176e275cf3b08c363f09de371fa',
                        CRO20: '0xd0ec99e99ce22f2487283a087614aee37f6b1283',
                        CRO21: '0xb7a5a84ff90e8ef91250fb56c50a7bb92a6306ee',
                        CRO22: '0x148ff761d16632da89f3d30ef3dfe34bc50ca765',
                        CRO23: '0xcde7185b5c3ed9ea68605a960f6653aa1a5b5c6c',
                        CRO24: '0xe67dad99c44547b54367e3e60fc251fc45a145c6',
                        CRO25: '0xc7f60c2b1dbdfd511685501edeb05c4194d67018',
                        CRO26: '0x1cb5bf4be53eb141b56f7e4bb36345a353b5488c',
                        CRO27: '0xfb9f3fa2502d01d43167a0a6e80be03171df407e',
                        CRO28: '0x59d190e8a2583c67e62eec8da5ea7f050d8bf27e',
                        CRO29: '0xd3540bcd9c2819771f9d765edc189cbd915feabd',
                        CRO30: '0x7f5b230dc580d1e67df6ed30dee82684dd113d1f'
                    };
                    curioSupply = {
                        CRO1: 1817,
                        CRO2: 1576,
                        CRO3: 1627,
                        CRO4: 465,
                        CRO5: 438,
                        CRO6: 424,
                        CRO7: 2006,
                        CRO8: 2002,
                        CRO9: 2009,
                        CRO10: 1999,
                        CRO11: 1999,
                        CRO12: 1998,
                        CRO13: 2000,
                        CRO14: 500,
                        CRO15: 499,
                        CRO16: 497,
                        CRO17: 508,
                        CRO18: 500,
                        CRO19: 500,
                        CRO20: 1996,
                        CRO21: 497,
                        CRO22: 500,
                        CRO23: 250,
                        CRO24: 333,
                        CRO25: 222,
                        CRO26: 106,
                        CRO27: 603,
                        CRO28: 397,
                        CRO29: 197,
                        CRO30: 823
                    };
                    curioWeights = {};
                    Object.keys(curioSupply).map(function (k) {
                        curioWeights[k] = (1000 * 1) / curioSupply[k];
                    });
                    cardBalancePromises = [];
                    Object.keys(curioAddresses).forEach(function (cardName) {
                        return cardBalancePromises.push(returnPromiseWithContext(strategy$4(space, network, provider, addresses, { address: curioAddresses[cardName], decimals: 0, start: 3678637 }, snapshot), cardName));
                    });
                    return [4 /*yield*/, Promise.all(cardBalancePromises)
                            .then(function (cardBalances) {
                            // then transform token balance -> vote weight
                            var cardBalancesWeighted = [];
                            cardBalances.forEach(function (cb) {
                                var cbWeighted = applyWeightForCard(cb.context, cb.rv);
                                console.debug('Weighting for card ' +
                                    cb.context +
                                    ':\n' +
                                    JSON.stringify(cbWeighted, null, 2));
                                cardBalancesWeighted.push(cbWeighted);
                            });
                            return cardBalancesWeighted;
                        })
                            .then(function (cardBalancesWeighted) {
                            // finally, sum card balances
                            return sumAddressWeights(cardBalancesWeighted);
                        })];
                case 1: 
                // Execute erc20 balance fetch in parallel
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}

var BIG18$1 = BigNumber.from('1000000000000000000');
var VOTE_BOOST_DIV_1000 = BigNumber.from(1000);
var DECIMALS$2 = 18;
var QUERIES_PER_DEX_LP_PAIR = 2;
var abi$p = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getReserves',
        outputs: [
            {
                internalType: 'uint112',
                name: '_reserve0',
                type: 'uint112'
            },
            {
                internalType: 'uint112',
                name: '_reserve1',
                type: 'uint112'
            },
            {
                internalType: 'uint32',
                name: '_blockTimestampLast',
                type: 'uint32'
            }
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
// DirectBoostScheme provides logic to apply a multiplier, or boost, to a raw balance value. This gives
// Saffron Finance the ability to adjust the voting power a token holder has depending external configuration.
//
// name       ... unique string that identifies the instance of the VotingScheme
// multiplier ... the raw balance value is multiplied by the multiplier such that: score = (multiplier)(balance).
//                If this value is 1.0, it is equivalent to score = balance.
//                If this value is less than 1.0 and greater than 0.0, then the token holder's voting power is reduced.
//                If this value is 0.0, then the token holder has no voting power.
var DirectBoostScheme = /** @class */ (function () {
    function DirectBoostScheme(name, multiplier) {
        this.name = name;
        this.multiplier = multiplier;
    }
    DirectBoostScheme.prototype.doAlgorithm = function (balance) {
        var voteBoost1000 = BigNumber.from(this.multiplier * 1000);
        return balance.mul(voteBoost1000).div(VOTE_BOOST_DIV_1000);
    };
    return DirectBoostScheme;
}());
// LPReservePairScheme provides logic to apply a voting score to only the SFI side of a Uniswap or Sushiswap LP token
// pair.
//
// name            ... unique string that identifies the instance of the VotingScheme
// multiplier ... the raw balance value is multiplied by the multiplier such that: score = (multiplier)(balance).
//                If this value is 1.0, it is equivalent to score = balance.
//                If this value is less than 1.0 and greater than 0.0, then the token holder's voting power is reduced.
//                If this value is 0.0, then the token holder has no voting power.
// saffLpToSfi_E18 ... Conversion of the Saffron LP Pair Token holding to SFI value with expected value to be in wei.
var LPReservePairScheme = /** @class */ (function () {
    function LPReservePairScheme(name, multiplier, saffLpToSfi_E18) {
        this.name = name;
        this.multiplier = multiplier;
        this.saffLpToSfi_E18 = saffLpToSfi_E18;
    }
    LPReservePairScheme.prototype.doAlgorithm = function (balance) {
        var voteMult1000 = BigNumber.from(this.multiplier * 1000);
        var calculatedScore = balance.mul(this.saffLpToSfi_E18).div(BIG18$1);
        return calculatedScore.mul(voteMult1000).div(VOTE_BOOST_DIV_1000);
    };
    return LPReservePairScheme;
}());
// VoteScorer acts as the context to invoke the relevant VotingScheme by way of its calculateScore method.
// It assumes all VotingScheme's are created by the createVotingScheme method prior to invocation of calculateScore.
//
// votingSchemes    ...  A Map that provides keyed access to a VotingScheme instance.
// dexReserveData   ...  An Array that holds necessary Uniswap and Sushiswap LP Pair Token data for LPReservePairScheme.
var VoteScorer = /** @class */ (function () {
    function VoteScorer(dexReserveData) {
        this.votingSchemes = new Map();
        this.dexReserveData = new Array();
        this.dexReserveData = dexReserveData;
        this.votingSchemes.set('default', new DirectBoostScheme('default', 1.0));
    }
    VoteScorer.prototype.createVotingScheme = function (name, type, multiplier) {
        var votingScheme = new DirectBoostScheme('no-vote-scheme', 0.0);
        if (type === 'DirectBoostScheme') {
            votingScheme = new DirectBoostScheme(name, multiplier);
        }
        else if (type === 'LPReservePairScheme') {
            var lpReservePairData = this.dexReserveData.find(function (e) { return e.name === name; });
            if (lpReservePairData === undefined) {
                throw Error("Failed to locate token LP Pair data for " + name + ".");
            }
            votingScheme = new LPReservePairScheme(name, multiplier, lpReservePairData.saffLpToSFI_E18);
        }
        else {
            throw new Error("Unsupported voting scheme type, " + type + ".");
        }
        this.votingSchemes.set(name, votingScheme);
    };
    VoteScorer.prototype.calculateScore = function (schemeName, balance) {
        var votingScheme = this.votingSchemes.get(schemeName);
        if (votingScheme === undefined) {
            throw new Error("Failed to locate voting scheme, " + schemeName + ". Check initialization of votingSchemes.");
        }
        return votingScheme.doAlgorithm(balance);
    };
    return VoteScorer;
}());
function strategy$16(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, callQueries, callResponses, holdersQueryBatches, votingScores, callQueryIndex, dexReserveData, voteScorer, emptyVotingScoreCountToAdd, emptyVote, i, addressVotingScore;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    callQueries = new Array();
                    callResponses = new Array();
                    holdersQueryBatches = new Array();
                    votingScores = new Array();
                    callQueryIndex = 0;
                    dexReserveData = new Array();
                    options.dexLpTypes.forEach(function (dexToken) {
                        var d = {
                            name: dexToken.name,
                            reservesQuery: [dexToken.lpToken, 'getReserves'],
                            reserveQueryIdx: 0,
                            reserve: BigNumber.from(0),
                            supplyQuery: [dexToken.lpToken, 'totalSupply'],
                            supplyQueryIdx: 0,
                            supply: BigNumber.from(0),
                            saffLpToSFI_E18: BigNumber.from(0)
                        };
                        callQueries.push(d.reservesQuery);
                        d.reserveQueryIdx = callQueryIndex++;
                        callQueries.push(d.supplyQuery);
                        d.supplyQueryIdx = callQueryIndex++;
                        dexReserveData.push(d);
                    });
                    // ============= Multicall queries ==============
                    options.contracts.forEach(function (contract) {
                        var queries = addresses.map(function (address) {
                            return [contract.tokenAddress, 'balanceOf', [address]];
                        });
                        var queriesLength = callQueries.push.apply(callQueries, queries);
                        var batch = {
                            tag: contract.label,
                            votingScheme: contract.votingScheme,
                            qIdxStart: callQueryIndex,
                            qIdxEnd: queriesLength
                        };
                        callQueryIndex = queriesLength;
                        holdersQueryBatches.push(batch);
                    });
                    return [4 /*yield*/, multicall(network, provider, abi$p, callQueries, {
                            blockTag: blockTag
                        })];
                case 1:
                    // Run queries
                    callResponses = _a.sent();
                    // ========== Extract and process query responses ==========
                    dexReserveData.forEach(function (drd) {
                        drd.reserve = callResponses[drd.reserveQueryIdx][0];
                        drd.supply = callResponses[drd.supplyQueryIdx][0];
                        drd.saffLpToSFI_E18 = drd.reserve.mul(BIG18$1).div(drd.supply);
                    });
                    voteScorer = new VoteScorer(dexReserveData);
                    options.votingSchemes.forEach(function (scheme) {
                        voteScorer.createVotingScheme(scheme.name, scheme.type, scheme.multiplier);
                    });
                    emptyVotingScoreCountToAdd = dexReserveData.length * QUERIES_PER_DEX_LP_PAIR;
                    emptyVote = { address: '0x00', score: 0.0 };
                    for (i = 0; i < emptyVotingScoreCountToAdd; i++) {
                        votingScores.push(emptyVote);
                    }
                    options.contracts.forEach(function (contract) {
                        var batch = holdersQueryBatches.find(function (e) { return e.tag === contract.label; });
                        if (batch === undefined) {
                            throw new Error("Failed to locate tag, " + contract.label + ", in queryBatches.");
                        }
                        var idxStart = batch.qIdxStart;
                        var batchScores = addresses.map(function (address, index) {
                            return {
                                address: address,
                                score: voteScorer.calculateScore(contract.votingScheme, callResponses[idxStart + index][0])
                            };
                        });
                        votingScores.push.apply(votingScores, batchScores);
                    });
                    addressVotingScore = addresses.map(function (address, addressIndex) {
                        var total = BigNumber.from(0);
                        holdersQueryBatches.forEach(function (batch) {
                            var votingScore = votingScores[batch.qIdxStart + addressIndex];
                            if (votingScore === undefined) {
                                throw new Error("Expected a votingScore at batch.qIdxStart: " + batch.qIdxStart + ", addressIndex: " + addressIndex);
                            }
                            if (votingScore.address === address) {
                                total = total.add(votingScore.score);
                            }
                            else {
                                throw new Error(batch.tag + " expected address, " + address + ", found " + votingScore.address);
                            }
                        });
                        // Return single record { address, score } where score should have exponent of 18
                        return { address: address, score: total };
                    });
                    return [2 /*return*/, Object.fromEntries(addressVotingScore.map(function (addressVote) {
                            return [
                                addressVote.address,
                                parseFloat(formatUnits(addressVote.score, DECIMALS$2))
                            ];
                        }))];
            }
        });
    });
}

/*
 * A strategy based on the number of RenVM nodes an address has, and how long
 * each node has been registered for.
 */
var RENVM_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/renproject/renvm',
    '42': 'https://api.thegraph.com/subgraphs/name/renproject/renvm-testnet'
};
// A month in seconds.
var MONTH = 28 * 24 * 60 * 60;
// Subgraph restricts the number of results of a query to 1000 entities.
var QUERY_LIMIT = 1000;
var RENVM_SUBGRAPH_QUERY = {
    darknodes: {
        __args: {
            first: QUERY_LIMIT,
            // Updated each loop.
            skip: 0,
            where: {
                // Skip nodes that have been deregistered.
                registeredAt_gt: 0,
                // Updated below.
                registeredAt_lte: undefined
            }
        },
        registeredAt: true,
        deregisteredAt: true,
        operator: true
    }
};
function strategy$17(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var timestamp, nodes, result, scores;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        RENVM_SUBGRAPH_QUERY.darknodes.__args.block = { number: snapshot };
                    }
                    return [4 /*yield*/, provider.getBlock(snapshot)];
                case 1:
                    timestamp = (_a.sent()).timestamp;
                    RENVM_SUBGRAPH_QUERY.darknodes.__args.where.registeredAt_lte = timestamp;
                    nodes = [];
                    _a.label = 2;
                case 2:
                    if (!(nodes.length < 10000)) return [3 /*break*/, 4];
                    // Skip the number nodes already seen.
                    RENVM_SUBGRAPH_QUERY.darknodes.__args.skip = nodes.length;
                    return [4 /*yield*/, subgraphRequest(RENVM_SUBGRAPH_URL[network], RENVM_SUBGRAPH_QUERY)];
                case 3:
                    result = _a.sent();
                    if (result && result.darknodes) {
                        nodes = nodes.concat(result.darknodes);
                    }
                    else {
                        return [3 /*break*/, 4];
                    }
                    // If the number of results returned was less than QUERY_LIMIT, then there
                    // are no more results to fetch.
                    if (result.darknodes.length < QUERY_LIMIT) {
                        return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 2];
                case 4:
                    scores = addresses.reduce(function (obj, address) {
                        var _a;
                        return (__assign(__assign({}, obj), (_a = {}, _a[getAddress(address)] = 0, _a)));
                    }, {});
                    nodes.forEach(function (darknode) {
                        // Skip operators that aren't in `addresses`.
                        var nodeOperator = getAddress(darknode.operator);
                        if (scores[nodeOperator] === undefined) {
                            return;
                        }
                        // Check that the darknode isn't deregistered.
                        if (darknode.deregisteredAt > 0 && darknode.deregisteredAt < timestamp) {
                            return;
                        }
                        // Take square root of the number of months (rounded up) the node has been
                        // registered for.
                        var timeRegistered = timestamp - darknode.registeredAt;
                        var score = Math.sqrt(Math.ceil(timeRegistered / MONTH));
                        scores[nodeOperator] += score;
                    });
                    return [2 /*return*/, scores];
            }
        });
    });
}

var abi$q = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address'
            }
        ],
        name: 'isOwner',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$18(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$q, addresses.map(function (address) { return [options.address, 'isOwner', [address]]; }), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    console.log('RES: ', response);
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [addresses[i], value[0] ? 1 : 0]; }))];
            }
        });
    });
}

var abi$r = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'user',
                type: 'address'
            },
            {
                internalType: 'address',
                name: 'token',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$19(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$r, addresses.map(function (address) { return [
                            options.address,
                            'balanceOf',
                            [address, options.tokenAddress]
                        ]; }), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.toString(), options.decimals))
                        ]; }))];
            }
        });
    });
}

var tokenAbi$3 = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: '_account',
                type: 'address'
            }
        ],
        name: 'getAddressPpblzStakeAmount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: '_account',
                type: 'address'
            }
        ],
        name: 'getAddressUniV2StakeAmount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$1a(_space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, res, totalSupply, tokenBalanceInUni, p1, p2, p3, p4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, tokenAbi$3, [
                            [options.uniswapAddress, 'totalSupply', []],
                            [options.tokenAddress, 'balanceOf', [options.uniswapAddress]]
                        ]
                            .concat(addresses.map(function (address) { return [
                            options.tokenAddress,
                            'balanceOf',
                            [address]
                        ]; }))
                            .concat(addresses.map(function (address) { return [
                            options.stakingAddress,
                            'getAddressPpblzStakeAmount',
                            [address]
                        ]; }))
                            .concat(addresses.map(function (address) { return [
                            options.uniswapAddress,
                            'balanceOf',
                            [address]
                        ]; }))
                            .concat(addresses.map(function (address) { return [
                            options.stakingAddress,
                            'getAddressUniV2StakeAmount',
                            [address]
                        ]; })), { blockTag: blockTag })];
                case 1:
                    res = _a.sent();
                    totalSupply = res[0][0];
                    tokenBalanceInUni = res[1][0];
                    p1 = res.slice(2, 2 + addresses.length);
                    p2 = res.slice(2 + addresses.length, 2 + addresses.length * 2);
                    p3 = res.slice(2 + addresses.length * 2, 2 + addresses.length * 3);
                    p4 = res.slice(2 + addresses.length * 3, 2 + addresses.length * 4);
                    return [2 /*return*/, Object.fromEntries(p1.map(function (values, i) { return [
                            addresses[i],
                            //ppblz_, uniV2PoolTokens
                            parseFloat(formatUnits(p1[i][0].toString(), 18)) +
                                parseFloat(formatUnits(p2[i][0].toString(), 18)) +
                                parseFloat(formatUnits(p3[i][0].mul(tokenBalanceInUni).div(totalSupply).toString(), 18)) +
                                parseFloat(formatUnits(p4[i][0].mul(tokenBalanceInUni).div(totalSupply).toString(), 18))
                        ]; }))];
            }
        });
    });
}

var SUBGRAPH_URL$2 = {
    '1': 'https://api.thegraph.com/subgraphs/name/alexvorobiov/eip1155subgraph'
};
function strategy$1b(_space, network, _provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var eip1155OwnersParams, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    eip1155OwnersParams = {
                        accounts: {
                            __args: {
                                where: {
                                    id_in: addresses.map(function (a) { return a.toLowerCase(); })
                                }
                            },
                            id: true,
                            balances: {
                                value: true,
                                token: {
                                    registry: {
                                        id: true
                                    }
                                }
                            }
                        }
                    };
                    if (snapshot !== 'latest') {
                        // @ts-ignore
                        eip1155OwnersParams.accounts.__args.block = { number: snapshot };
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, subgraphRequest(SUBGRAPH_URL$2[network], eip1155OwnersParams)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result.accounts.reduce(function (acc, val) {
                            var relevantTokenBalances = val.balances.filter(function (balance) {
                                var isRightAddress = balance.token.registry.id === options.address.toLowerCase();
                                return isRightAddress;
                            });
                            acc[getAddress(val.id)] = relevantTokenBalances.reduce(function (acc, val) { return acc + parseInt(val.value, 10); }, 0);
                            return acc;
                        }, {})];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, {}];
                case 4: return [2 /*return*/];
            }
        });
    });
}

var UNISWAP_SUBGRAPH_URL$1 = {
    '1': 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
};
var abi$s = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'user',
                type: 'address'
            },
            {
                internalType: 'address',
                name: 'token',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$1c(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, lpTokenAddress, tokenAddress, rate, params, result, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    lpTokenAddress = options.lpTokenAddress.toLowerCase();
                    tokenAddress = options.tokenAddress.toLowerCase();
                    params = {
                        pairs: {
                            __args: {
                                where: {
                                    id: lpTokenAddress
                                }
                            },
                            id: true,
                            totalSupply: true,
                            reserve0: true,
                            reserve1: true,
                            token0: {
                                id: true
                            },
                            token1: {
                                id: true
                            }
                        }
                    };
                    return [4 /*yield*/, subgraphRequest(UNISWAP_SUBGRAPH_URL$1[network], params)];
                case 1:
                    result = _a.sent();
                    if (result && result.pairs) {
                        result.pairs.map(function (object) {
                            rate =
                                +object.token0.id == tokenAddress
                                    ? +object.reserve0 / +object.totalSupply
                                    : +object.reserve1 / +object.totalSupply;
                        }, []);
                    }
                    return [4 /*yield*/, multicall(network, provider, abi$s, addresses.map(function (address) { return [
                            options.address,
                            'balanceOf',
                            [address, lpTokenAddress]
                        ]; }), { blockTag: blockTag })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.toString(), options.decimals)) * rate
                        ]; }))];
            }
        });
    });
}

/*
 * Generic masterchef pool balance strategy. Accepted options:
 * - chefAddress: masterchef contract address
 * - pid: mastechef pool id (starting with zero)
 * - uniPairAddress: address of a uniswap pair (or a sushi pair or any other with the same interface)
 *    - if the uniPairAddress option is provided, converts staked LP token balance to base token balance
 *      (based on the pair total supply and base token reserve)
 *    - if uniPairAddress is null or undefined, returns staked token balance as is
 * - weight: integer multiplier of the result (for combining strategies with different weights, totally optional)
 */
var abi$t = [
    // to get a user/pool balance from masterchef
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'userInfo',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'rewardDebt',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    // to get supply/reserve from uni pair
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getReserves',
        outputs: [
            {
                internalType: 'uint112',
                name: '_reserve0',
                type: 'uint112'
            },
            {
                internalType: 'uint112',
                name: '_reserve1',
                type: 'uint112'
            },
            {
                internalType: 'uint32',
                name: '_blockTimestampLast',
                type: 'uint32'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
// calls is a 1-dimensional array so we just push 3 calls for every address
var getCalls = function (addresses, options) {
    var result = [];
    for (var _i = 0, addresses_1 = addresses; _i < addresses_1.length; _i++) {
        var address = addresses_1[_i];
        result.push([options.chefAddress, 'userInfo', [options.pid, address]]);
        if (options.uniPairAddress != null) {
            result.push([options.uniPairAddress, 'totalSupply', []]);
            result.push([options.uniPairAddress, 'getReserves', []]);
        }
    }
    return result;
};
function arrayChunk(arr, chunkSize) {
    var result = [];
    for (var i = 0, j = arr.length; i < j; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
}
// values is an array of (chunked) call results for every input address
// for setups with uniPairAddress each chunk has 3 items, for setups without, only 1 item
function processValues(values, options) {
    var poolStaked = values[0][0];
    var weight = BigNumber.from(options.weight || 1);
    var result;
    if (options.uniPairAddress == null) {
        result = poolStaked.mul(weight);
    }
    else {
        var uniTotalSupply = values[1][0];
        var uniReserve = values[2][0];
        var precision = BigNumber.from(10).pow(18);
        var tokensPerLp = uniReserve.mul(precision).div(uniTotalSupply);
        result = poolStaked.mul(tokensPerLp).mul(weight).div(precision);
    }
    return parseFloat(formatUnits(result.toString(), options.decimals || 18));
}
function strategy$1d(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$t, getCalls(addresses, options), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(
                        // chunk to response so that we can process values for each address
                        arrayChunk(response, options.uniPairAddress == null ? 1 : 3).map(function (value, i) { return [addresses[i], processValues(value, options)]; }))];
            }
        });
    });
}

var AVT_ABI = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
var VR_ABI = [
    {
        inputs: [
            { internalType: 'uint8', name: 'node', type: 'uint8' },
            { internalType: 'address', name: 'staker', type: 'address' }
        ],
        name: 'getStakerBalance',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    }
];
var NUM_NODES = 10;
// [0, 1, ... , 9] for convinience
var NODES_INDICES = Array.from(Array(NUM_NODES).keys());
var STAKES_MULTIPLIER = 2;
var EthCall = /** @class */ (function () {
    function EthCall(contract, method, args) {
        this.contract = contract;
        this.method = method;
        this.args = args;
    }
    Object.defineProperty(EthCall.prototype, "ethCall", {
        get: function () {
            return [this.contract, this.method, this.args];
        },
        enumerable: true,
        configurable: true
    });
    return EthCall;
}());
/** creates flat array of eth calls for each user's stake in each VR contract in each node */
function serializeVrMultiCalls(vr1Address, vr2Address, userAddresses) {
    // [ [0, 1, ... , 19],  [0, 1, ... , 19] , ..., [0, 1, ... 19], ... ]
    var userCalls = userAddresses.map(function (user) {
        var method = 'getStakerBalance';
        // map to objects to prevent flatting eth call arrays
        var vr1Calls = NODES_INDICES.map(function (node) { return new EthCall(vr1Address, method, [node, user]); });
        var vr2Calls = NODES_INDICES.map(function (node) { return new EthCall(vr2Address, method, [node, user]); });
        // * [0-9] calls for each node in VR1
        // * [10-19] calls for each node in VR2
        return vr1Calls.concat(vr2Calls);
    });
    // flat it and map to a list of the call primitives
    var objCalls = userCalls.flat();
    return objCalls.map(function (obj) { return obj.ethCall; });
}
/** splits array into chunks */
function chunkArray(arr, length) {
    var chunks = [];
    var i = 0, n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, (i += length)));
    }
    return chunks;
}
/** sums big numbers in array */
function sumNumbers(arr) {
    return arr.reduce(function (previus, current) {
        return previus.add(current[0]);
    }, BigNumber.from(0));
}
/**
 * Parses multicall response
 * @param response multicall response
 * @returns summed AVT staked for each user in every node in every VR contract
 */
function parseVrResponse(response, users) {
    return chunkArray(response, 2 * NUM_NODES).map(sumNumbers);
}
function strategy$1e(_space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, avtResponses, avtValues, vrMultiResponse, stakes, vrVotes, scores;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, AVT_ABI, addresses.map(function (address) { return [
                            options.tokenAddress,
                            'balanceOf',
                            [address]
                        ]; }), { blockTag: blockTag })];
                case 1:
                    avtResponses = _a.sent();
                    avtValues = avtResponses.map(function (value) { return value[0]; });
                    return [4 /*yield*/, multicall(network, provider, VR_ABI, serializeVrMultiCalls(options.vrAddress, options.vr2Address, addresses), { blockTag: blockTag })];
                case 2:
                    vrMultiResponse = _a.sent();
                    stakes = parseVrResponse(vrMultiResponse);
                    vrVotes = stakes.map(function (v) { return v.mul(STAKES_MULTIPLIER); });
                    scores = avtValues.map(function (value, i) {
                        return value.add(vrVotes[i]);
                    });
                    return [2 /*return*/, Object.fromEntries(scores.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.toString(), options.decimals))
                        ]; }))];
            }
        });
    });
}

function strategy$1f(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var api_url, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    api_url = options.api + '/' + options.strategy;
                    api_url += '?network=' + network;
                    api_url += '&snapshot=' + snapshot;
                    api_url += '&addresses=' + addresses.join(',');
                    return [4 /*yield*/, fetch$1(api_url, {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, Object.fromEntries(data.score.map(function (value) { return [
                            value.address,
                            parseFloat(formatUnits(value.score.toString(), options.decimals))
                        ]; }))];
            }
        });
    });
}

/**
 * xSEEN token ABI
 */
var xseenAbi = [
    {
        constant: true,
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    }
];
/**
 * SEEN token ABI
 */
var seenAbi = [
    {
        constant: true,
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$1g(space, network, provider, addresses, params, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, stakingContractSeenBalanceCallParams, seenRes, seenBalanceInStakingContract, xseenBalanceCallParams, xseenRes, totalSupply, balances;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    stakingContractSeenBalanceCallParams = [
                        '0xCa3FE04C7Ee111F0bbb02C328c699226aCf9Fd33',
                        'balanceOf',
                        [params.tokenAddress]
                    ];
                    return [4 /*yield*/, multicall(network, provider, seenAbi, [stakingContractSeenBalanceCallParams], { blockTag: blockTag })];
                case 1:
                    seenRes = _a.sent();
                    seenBalanceInStakingContract = seenRes[0];
                    xseenBalanceCallParams = addresses.map(function (addr) { return [
                        params.tokenAddress,
                        'balanceOf',
                        [addr]
                    ]; });
                    return [4 /*yield*/, multicall(network, provider, xseenAbi, __spreadArrays([[params.tokenAddress, 'totalSupply']], xseenBalanceCallParams), { blockTag: blockTag })];
                case 2:
                    xseenRes = _a.sent();
                    totalSupply = xseenRes[0];
                    balances = xseenRes.slice(1);
                    return [2 /*return*/, Object.fromEntries(balances.map(function (balance, i) { return [
                            addresses[i],
                            (balance * (seenBalanceInStakingContract / totalSupply)) / 1e18
                        ]; }))];
            }
        });
    });
}

var abi$u = [
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'memberAddressByDelegateKey',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'members',
        outputs: [
            {
                internalType: 'address',
                name: 'delegateKey',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'shares',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'loot',
                type: 'uint256'
            },
            {
                internalType: 'bool',
                name: 'exists',
                type: 'bool'
            },
            {
                internalType: 'uint256',
                name: 'highestIndexYesVote',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'jailed',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalShares',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$1h(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, memberAddresses, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$u, addresses.map(function (address) { return [
                            options.address,
                            'memberAddressByDelegateKey',
                            [address]
                        ]; }), { blockTag: blockTag })];
                case 1:
                    memberAddresses = _a.sent();
                    return [4 /*yield*/, multicall(network, provider, abi$u, memberAddresses
                            .filter(function (addr) {
                            return addr.toString() !== '0x0000000000000000000000000000000000000000';
                        })
                            .map(function (addr) { return [options.address, 'members', [addr.toString()]]; }), { blockTag: blockTag })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.shares.toString(), options.decimals)) +
                                parseFloat(formatUnits(value.loot.toString(), options.decimals))
                        ]; }))];
            }
        });
    });
}

var abi$v = [
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'memberAddressByDelegateKey',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'members',
        outputs: [
            {
                internalType: 'address',
                name: 'delegateKey',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'shares',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'loot',
                type: 'uint256'
            },
            {
                internalType: 'bool',
                name: 'exists',
                type: 'bool'
            },
            {
                internalType: 'uint256',
                name: 'highestIndexYesVote',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'jailed',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalShares',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$1i(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, memberAddresses, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$v, addresses.map(function (address) { return [
                            options.address,
                            'memberAddressByDelegateKey',
                            [address]
                        ]; }), { blockTag: blockTag })];
                case 1:
                    memberAddresses = _a.sent();
                    return [4 /*yield*/, multicall(network, provider, abi$v, memberAddresses
                            .filter(function (addr) {
                            return addr.toString() !== '0x0000000000000000000000000000000000000000';
                        })
                            .map(function (addr) { return [options.address, 'members', [addr.toString()]]; }), { blockTag: blockTag })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.loot.toString(), options.decimals))
                        ]; }))];
            }
        });
    });
}

function strategy$1j(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options.decimals = 0;
                    return [4 /*yield*/, strategy$4(space, network, provider, addresses, options, snapshot)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

var abi$w = [
    'function balanceOf(address account) external view returns (uint256)'
];
function strategy$1k(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var multipler, blockTag, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    multipler = options.multiplier || 1;
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$w, addresses.map(function (address) { return [options.address, 'balanceOf', [address]]; }), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.toString(), 0)) * multipler
                        ]; }))];
            }
        });
    });
}

var tokenAndPoolAbi = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'liquidityProviders',
        outputs: [
            {
                internalType: 'uint256',
                name: 'claimedUntil',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'currentBalance',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
var XDAI_BLOCK_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/1hive/xdai-blocks';
var HOPR_XDAI_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/hoprnet/hopr-on-xdai';
function getXdaiBlockNumber$1(timestamp) {
    return __awaiter(this, void 0, void 0, function () {
        var query, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {
                        blocks: {
                            __args: {
                                first: 1,
                                orderBy: 'number',
                                orderDirection: 'desc',
                                where: {
                                    timestamp_lte: timestamp
                                }
                            },
                            number: true,
                            timestamp: true
                        }
                    };
                    return [4 /*yield*/, subgraphRequest(XDAI_BLOCK_SUBGRAPH_URL, query)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, Number(data.blocks[0].number)];
            }
        });
    });
}
function xHoprSubgraphQuery(addresses, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var query, data, entries;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {
                        accounts: {
                            __args: {
                                block: {
                                    number: blockNumber
                                },
                                where: {
                                    id_in: addresses.map(function (adr) { return adr.toLowerCase(); })
                                }
                            },
                            id: true,
                            totalBalance: true
                        }
                    };
                    return [4 /*yield*/, subgraphRequest(HOPR_XDAI_SUBGRAPH_URL, query)];
                case 1:
                    data = _a.sent();
                    entries = data.accounts.map(function (d) { return [d.id, Number(d.totalBalance)]; });
                    return [2 /*return*/, Object.fromEntries(entries)];
            }
        });
    });
}
function strategy$1l(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, _a, res, block, hoprBalanceOfPool, poolTotalSupply, response, snapshotXdaiBlock, hoprOnXdaiBalance, hoprOnXdaiScore;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, Promise.all([
                            multicall(network, provider, tokenAndPoolAbi, [
                                [options.hoprAddress, 'balanceOf', [options.uniPoolAddress]],
                                [options.uniPoolAddress, 'totalSupply', []]
                            ]
                                .concat(addresses.map(function (address) { return [
                                options.uniPoolAddress,
                                'balanceOf',
                                [address]
                            ]; }))
                                .concat(blockTag >= options.farmDeployBlock || blockTag === 'latest'
                                ? addresses.map(function (address) { return [
                                    options.farmAddress,
                                    'liquidityProviders',
                                    [address]
                                ]; })
                                : []), { blockTag: blockTag }),
                            provider.getBlock(blockTag)
                        ])];
                case 1:
                    _a = _b.sent(), res = _a[0], block = _a[1];
                    hoprBalanceOfPool = res[0];
                    poolTotalSupply = res[1];
                    response = blockTag >= options.farmDeployBlock || blockTag === 'latest'
                        ? res
                            .slice(2, 2 + addresses.length)
                            .map(function (r, i) {
                            return r[0].add(res[2 + i + addresses.length][1]);
                        })
                        : res.slice(2).map(function (r) { return r[0]; });
                    return [4 /*yield*/, getXdaiBlockNumber$1(block.timestamp)];
                case 2:
                    snapshotXdaiBlock = _b.sent();
                    return [4 /*yield*/, xHoprSubgraphQuery(addresses, snapshotXdaiBlock)];
                case 3:
                    hoprOnXdaiBalance = _b.sent();
                    hoprOnXdaiScore = addresses.map(function (address) { var _a; return (_a = hoprOnXdaiBalance[address]) !== null && _a !== void 0 ? _a : 0; });
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.mul(hoprBalanceOfPool[0]).div(poolTotalSupply[0]), 18)) + hoprOnXdaiScore[i] // xHOPR + wxHOPR balance
                        ]; }))];
            }
        });
    });
}

var abi$x = [
    'function balanceOf(address account) external view returns (uint256)'
];
function strategy$1m(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, abi$x, addresses.map(function (address) { return [options.address, 'balanceOf', [address]]; }), { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, Object.fromEntries(response.map(function (value, i) { return [
                            addresses[i],
                            parseFloat(formatUnits(value.toString(), 0))
                        ]; }))];
            }
        });
    });
}

var chefAbi = [
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'userInfo',
        outputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'rewardDebt',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
var lpPairAbi = [
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getReserves',
        outputs: [
            {
                internalType: 'uint112',
                name: '_reserve0',
                type: 'uint112'
            },
            {
                internalType: 'uint112',
                name: '_reserve1',
                type: 'uint112'
            },
            {
                internalType: 'uint32',
                name: '_blockTimestampLast',
                type: 'uint32'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
var chef1Address = '0xCA74b3db871c679e928E70917Ae804DC7BFd8781';
var chef2Address = '0x062D9b9a97B4eFC67D286e99618dA87C614B166F';
var lpPairAddress = '0x52307F4C5CeBB1f157c3947D335B999091bAa3F7';
var decimals = 18;
var precision = BigNumber.from(10).pow(18);
function strategy$1n(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, userInfoPool1, userInfoPool2, lpSupply, lpReserves;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    return [4 /*yield*/, multicall(network, provider, chefAbi, addresses.map(function (address) { return [chef1Address, 'userInfo', [1, address]]; }), { blockTag: blockTag })];
                case 1:
                    userInfoPool1 = _a.sent();
                    return [4 /*yield*/, multicall(network, provider, chefAbi, addresses.map(function (address) { return [chef2Address, 'userInfo', [0, address]]; }), { blockTag: blockTag })];
                case 2:
                    userInfoPool2 = _a.sent();
                    return [4 /*yield*/, call(provider, lpPairAbi, [
                            lpPairAddress,
                            'totalSupply',
                            []
                        ])];
                case 3:
                    lpSupply = _a.sent();
                    return [4 /*yield*/, call(provider, lpPairAbi, [
                            lpPairAddress,
                            'getReserves',
                            []
                        ])];
                case 4:
                    lpReserves = _a.sent();
                    return [2 /*return*/, Object.fromEntries(userInfoPool1.map(function (info1, i) {
                            var balance1 = info1.amount;
                            var balance2 = userInfoPool2[i].amount;
                            var tokensPerLp = lpReserves._reserve1.mul(precision).div(lpSupply);
                            var balance2Normalized = balance2.mul(tokensPerLp).div(precision);
                            var sum = balance1.add(balance2Normalized);
                            return [addresses[i], parseFloat(formatUnits(sum.toString(), decimals))];
                        }))];
            }
        });
    });
}

var abi$y = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'getbalanceOfControl',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'earned',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function strategy$1o(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var blockTag, queries, addressCount, response, ctrlOwned, ctrlStaked, ctrlEarned;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
                    queries = [];
                    addressCount = addresses.length;
                    addresses.forEach(function (address) {
                        queries.push([options.ctrl, 'balanceOf', [address]]);
                    });
                    addresses.forEach(function (address) {
                        queries.push([options.boardroom, 'getbalanceOfControl', [address]]);
                    });
                    addresses.forEach(function (address) {
                        queries.push([options.boardroom, 'earned', [address]]);
                    });
                    return [4 /*yield*/, multicall(network, provider, abi$y, queries, { blockTag: blockTag })];
                case 1:
                    response = _a.sent();
                    ctrlOwned = response.slice(0, addressCount);
                    ctrlStaked = response.slice(addressCount, addressCount * 2);
                    ctrlEarned = response.slice(addressCount * 2, addressCount * 3);
                    return [2 /*return*/, Object.fromEntries(Array(addresses.length)
                            .fill('x')
                            .map(function (_, i) {
                            var score = ctrlOwned[i][0]
                                .add(ctrlStaked[i][0])
                                .add(ctrlEarned[i][0])
                                .add(ctrlEarned[i][1]);
                            return [
                                addresses[i],
                                parseFloat(formatUnits(score.toString(), options.decimals))
                            ];
                        }))];
            }
        });
    });
}

var DECENTRALAND_MARKETPLACE_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/decentraland/marketplace',
    '3': 'https://api.thegraph.com/subgraphs/name/decentraland/marketplaceropsten'
};
function strategy$1p(space, network, provider, addresses, options, snapshot) {
    return __awaiter(this, void 0, void 0, function () {
        var multipler, blockNumber, _a, params, score, hasNext, result, nfts, _i, _b, estate, userAddress;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    multipler = options.multiplier || 1;
                    if (!(typeof snapshot === 'number')) return [3 /*break*/, 1];
                    _a = snapshot;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, getBlockNumber(provider)];
                case 2:
                    _a = _c.sent();
                    _c.label = 3;
                case 3:
                    blockNumber = _a;
                    params = {
                        nfts: {
                            __args: {
                                where: {
                                    owner_in: addresses.map(function (address) { return address.toLowerCase(); }),
                                    category: 'estate',
                                    searchEstateSize_gt: 0
                                },
                                block: {
                                    number: blockNumber
                                },
                                first: 1000,
                                skip: 0
                            },
                            owner: {
                                id: true
                            },
                            searchEstateSize: true
                        }
                    };
                    score = {};
                    hasNext = true;
                    _c.label = 4;
                case 4:
                    if (!hasNext) return [3 /*break*/, 6];
                    return [4 /*yield*/, subgraphRequest(DECENTRALAND_MARKETPLACE_SUBGRAPH_URL[network], params)];
                case 5:
                    result = _c.sent();
                    nfts = result && result.nfts ? result.nfts : [];
                    for (_i = 0, _b = result.nfts; _i < _b.length; _i++) {
                        estate = _b[_i];
                        userAddress = getAddress(estate.owner.id);
                        score[userAddress] =
                            (score[userAddress] || 0) +
                                (estate.searchEstateSize * multipler);
                    }
                    params.nfts.__args.skip += params.nfts.__args.first;
                    hasNext = nfts.length === params.nfts.__args.first;
                    return [3 /*break*/, 4];
                case 6: return [2 /*return*/, score];
            }
        });
    });
}

var strategies = {
    balancer: strategy,
    'erc20-received': strategy$u,
    'contract-call': strategy$1,
    'eth-received': strategy$t,
    'eth-philanthropy': strategy$v,
    'ens-domains-owned': strategy$2,
    'ens-reverse-record': strategy$3,
    'erc20-balance-of': strategy$4,
    'erc20-balance-of-fixed-total': strategy$6,
    'erc20-balance-of-cv': strategy$7,
    'erc20-balance-of-coeff': strategy$5,
    'erc20-with-balance': strategy$8,
    'erc20-balance-of-delegation': strategy$9,
    'balance-of-with-min': strategy$a,
    'eth-balance': strategy$b,
    'eth-wallet-age': strategy$c,
    'maker-ds-chief': strategy$e,
    erc721: strategy$1m,
    'erc721-enumerable': strategy$1j,
    'erc721-with-multiplier': strategy$1k,
    'erc1155-balance-of': strategy$Z,
    'erc1155-balance-of-cv': strategy$_,
    multichain: strategy$d,
    uni: strategy$f,
    'frax-finance': strategy$h,
    'yearn-vault': strategy$g,
    moloch: strategy$i,
    masterchef: strategy$H,
    sushiswap: strategy$G,
    uniswap: strategy$j,
    flashstake: strategy$k,
    pancake: strategy$l,
    synthetix: strategy$m,
    ctoken: strategy$n,
    cream: strategy$o,
    'staked-uniswap': strategy$r,
    esd: strategy$p,
    'esd-delegation': strategy$q,
    piedao: strategy$s,
    'xdai-easy-staking': strategy$w,
    'xdai-posdao-staking': strategy$y,
    'xdai-stake-holders': strategy$z,
    'xdai-stake-delegation': strategy$A,
    defidollar: strategy$B,
    aavegotchi: strategy$C,
    mithcash: strategy$D,
    stablexswap: strategy$I,
    dittomoney: strategy$E,
    'staked-keep': strategy$J,
    'balancer-unipool': strategy$F,
    typhoon: strategy$K,
    delegation: strategy$L,
    ticket: strategy$M,
    work: strategy$N,
    'ticket-validity': strategy$O,
    opium: strategy$P,
    'ocean-marketplace': strategy$Q,
    'the-graph-balance': strategy$R,
    'the-graph-delegation': strategy$S,
    'the-graph-indexing': strategy$T,
    whitelist: strategy$U,
    tokenlon: strategy$V,
    rebased: strategy$W,
    'pob-hash': strategy$X,
    'total-axion-shares': strategy$Y,
    'comp-like-votes': strategy$$,
    pagination: strategy$10,
    'ruler-staked-lp': strategy$11,
    xcover: strategy$12,
    'niu-staked': strategy$13,
    mushrooms: strategy$14,
    'curio-cards-erc20-weighted': strategy$15,
    'ren-nodes': strategy$17,
    'multisig-owners': strategy$18,
    'tranche-staking': strategy$19,
    pepemon: strategy$1a,
    'erc1155-all-balances-of': strategy$1b,
    'saffron-finance': strategy$16,
    'tranche-staking-lp': strategy$1c,
    'masterchef-pool-balance': strategy$1d,
    'avn-balance-of-staked': strategy$1e,
    api: strategy$1f,
    xseen: strategy$1g,
    'moloch-all': strategy$1h,
    'moloch-loot': strategy$1i,
    'hopr-uni-lp-farm': strategy$1l,
    apescape: strategy$1n,
    liftkitchen: strategy$1o,
    'decentraland-estate-size': strategy$1p
};

var providers = {};
function getProvider(network) {
    var url = networks[network].rpc[0];
    if (!providers[network])
        providers[network] = new JsonRpcProvider(url);
    return providers[network];
}

var supportedCodecs = ['ipns-ns', 'ipfs-ns', 'swarm-ns', 'onion', 'onion3'];
var REGISTRAR_ABI = [
    {
        constant: true,
        inputs: [
            {
                name: 'node',
                type: 'bytes32'
            }
        ],
        name: 'resolver',
        outputs: [
            {
                name: 'resolverAddress',
                type: 'address'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
var REGISTRAR_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
var RESOLVER_ABI = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'bytes32',
                name: 'node',
                type: 'bytes32'
            }
        ],
        name: 'contenthash',
        outputs: [
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
function decodeContenthash(encoded) {
    var decoded, protocolType, error;
    if (encoded.error) {
        return { protocolType: null, decoded: encoded.error };
    }
    if (encoded) {
        try {
            decoded = contentHash.decode(encoded);
            var codec = contentHash.getCodec(encoded);
            if (codec === 'ipfs-ns') {
                // convert the ipfs from base58 to base32 (url host compatible)
                // if needed the hash can now be resolved through a secured origin gateway (<hash>.gateway.com)
                decoded = contentHash.helpers.cidV0ToV1Base32(decoded);
                protocolType = 'ipfs';
            }
            else if (codec === 'ipns-ns') {
                decoded = bs58.decode(decoded).slice(2).toString();
                protocolType = 'ipns';
            }
            else if (codec === 'swarm-ns') {
                protocolType = 'bzz';
            }
            else if (codec === 'onion') {
                protocolType = 'onion';
            }
            else if (codec === 'onion3') {
                protocolType = 'onion3';
            }
            else {
                decoded = encoded;
            }
        }
        catch (e) {
            error = e.message;
        }
    }
    return { protocolType: protocolType, decoded: decoded, error: error };
}
function validateContent(encoded) {
    return (contentHash.isHashOfType(encoded, contentHash.Types.ipfs) ||
        contentHash.isHashOfType(encoded, contentHash.Types.swarm));
}
function isValidContenthash(encoded) {
    try {
        var codec = contentHash.getCodec(encoded);
        return isHexString(encoded) && supportedCodecs.includes(codec);
    }
    catch (e) {
        console.log(e);
    }
}
function encodeContenthash(text) {
    var content, contentType;
    var encoded = false;
    if (text) {
        var matched = text.match(/^(ipfs|ipns|bzz|onion|onion3):\/\/(.*)/) ||
            text.match(/\/(ipfs)\/(.*)/) ||
            text.match(/\/(ipns)\/(.*)/);
        if (matched) {
            contentType = matched[1];
            content = matched[2];
        }
        try {
            if (contentType === 'ipfs') {
                if (content.length >= 4) {
                    encoded = '0x' + contentHash.encode('ipfs-ns', content);
                }
            }
            else if (contentType === 'ipns') {
                var bs58content = bs58.encode(Buffer.concat([
                    Buffer.from([0, content.length]),
                    Buffer.from(content)
                ]));
                encoded = '0x' + contentHash.encode('ipns-ns', bs58content);
            }
            else if (contentType === 'bzz') {
                if (content.length >= 4) {
                    encoded = '0x' + contentHash.fromSwarm(content);
                }
            }
            else if (contentType === 'onion') {
                if (content.length == 16) {
                    encoded = '0x' + contentHash.encode('onion', content);
                }
            }
            else if (contentType === 'onion3') {
                if (content.length == 56) {
                    encoded = '0x' + contentHash.encode('onion3', content);
                }
            }
            else {
                console.warn('Unsupported protocol or invalid value', {
                    contentType: contentType,
                    text: text
                });
            }
        }
        catch (err) {
            console.warn('Error encoding content hash', { text: text, encoded: encoded });
            //throw 'Error encoding content hash'
        }
    }
    return encoded;
}
/**
 * Fetches and decodes the result of an ENS contenthash lookup on mainnet to a URI
 * @param ensName to resolve
 * @param provider provider to use to fetch the data
 */
function resolveENSContentHash(ensName, provider) {
    return __awaiter(this, void 0, void 0, function () {
        var hash, resolverAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hash = namehash$1(ensName);
                    return [4 /*yield*/, call(provider, REGISTRAR_ABI, [
                            REGISTRAR_ADDRESS,
                            'resolver',
                            [hash]
                        ])];
                case 1:
                    resolverAddress = _a.sent();
                    return [4 /*yield*/, call(provider, RESOLVER_ABI, [
                            resolverAddress,
                            'contenthash',
                            [hash]
                        ])];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function resolveContent(provider, name) {
    return __awaiter(this, void 0, void 0, function () {
        var contentHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, resolveENSContentHash(name, provider)];
                case 1:
                    contentHash = _a.sent();
                    return [2 /*return*/, decodeContenthash(contentHash)];
            }
        });
    });
}

var MULTICALL = {
    '1': '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    '3': '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
    '4': '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
    '5': '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
    '6': '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
    '17': '0xB9cb900E526e7Ad32A2f26f1fF6Dee63350fcDc5',
    '30': '0x4eeebb5580769ba6d26bfd07be636300076d1831',
    '31': '0x4eeebb5580769ba6d26bfd07be636300076d1831',
    '42': '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
    '56': '0x1ee38d535d541c55c9dae27b12edf090c608e6fb',
    '82': '0x579De77CAEd0614e3b158cb738fcD5131B9719Ae',
    '97': '0x8b54247c6BAe96A6ccAFa468ebae96c4D7445e46',
    '100': '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
    '128': '0x37ab26db3df780e7026f3e767f65efb739f48d8e',
    '137': '0xCBca837161be50EfA5925bB9Cc77406468e76751',
    '256': '0xC33994Eb943c61a8a59a918E2de65e03e4e385E0',
    '1287': '0xD7bA481DE7fB53A7a29641c43232B09e5D9CAe7b',
    '1337': '0x566131e85d46cc7BBd0ce5C6587E9912Dc27cDAc',
    '2109': '0x7E9985aE4C8248fdB07607648406a48C76e9e7eD',
    wanchain: '0xba5934ab3056fca1fa458d30fbb3810c3eb5145f',
    '250': '0x7f6A10218264a22B4309F3896745687E712962a0',
    '499': '0x7955FF653FfDBf13056FeAe227f655CfF5C194D5',
    '1666600000': '0x9c31392D2e0229dC4Aa250F043d46B9E82074BF8',
    '1666700000': '0x9923589503Fd205feE3d367DDFF2378f0F7dD2d4'
};
var SNAPSHOT_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot',
    '4': 'https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-rinkeby',
    '42': 'https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-kovan'
};
function call(provider, abi, call, options) {
    return __awaiter(this, void 0, void 0, function () {
        var contract, params, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contract = new Contract(call[0], abi, provider);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    params = call[2] || [];
                    return [4 /*yield*/, contract[call[1]].apply(contract, __spreadArrays(params, [options || {}]))];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, Promise.reject(e_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function multicall(network, provider, abi$1, calls, options) {
    return __awaiter(this, void 0, void 0, function () {
        var multi, itf, _a, res, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    multi = new Contract(MULTICALL[network], abi, provider);
                    itf = new Interface(abi$1);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, multi.aggregate(calls.map(function (call) { return [
                            call[0].toLowerCase(),
                            itf.encodeFunctionData(call[1], call[2])
                        ]; }), options || {})];
                case 2:
                    _a = _b.sent(), res = _a[1];
                    return [2 /*return*/, res.map(function (call, i) { return itf.decodeFunctionResult(calls[i][1], call); })];
                case 3:
                    e_2 = _b.sent();
                    return [2 /*return*/, Promise.reject(e_2)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function subgraphRequest(url, query, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: 'POST',
                        headers: __assign({ Accept: 'application/json', 'Content-Type': 'application/json' }, options === null || options === void 0 ? void 0 : options.headers),
                        body: JSON.stringify({ query: jsonToGraphQLQuery({ query: query }) })
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = (_a.sent()).data;
                    return [2 /*return*/, data || {}];
            }
        });
    });
}
function ipfsGet(gateway, ipfsHash, protocolType) {
    if (protocolType === void 0) { protocolType = 'ipfs'; }
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            url = "https://" + gateway + "/" + protocolType + "/" + ipfsHash;
            return [2 /*return*/, fetch(url).then(function (res) { return res.json(); })];
        });
    });
}
function sendTransaction(web3, contractAddress, abi, action, params, overrides) {
    if (overrides === void 0) { overrides = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var signer, contract, contractWithSigner;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signer = web3.getSigner();
                    contract = new Contract(contractAddress, abi, web3);
                    contractWithSigner = contract.connect(signer);
                    return [4 /*yield*/, contractWithSigner[action].apply(contractWithSigner, __spreadArrays(params, [overrides]))];
                case 1: 
                // overrides.gasLimit = 12e6;
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getScores$1(space, strategies$1, network, provider, addresses, snapshot) {
    if (snapshot === void 0) { snapshot = 'latest'; }
    return __awaiter(this, void 0, void 0, function () {
        var e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Promise.all(strategies$1.map(function (strategy) {
                            var _a, _b, _c;
                            return (snapshot !== 'latest' && ((_a = strategy.params) === null || _a === void 0 ? void 0 : _a.start) > snapshot) ||
                                (((_b = strategy.params) === null || _b === void 0 ? void 0 : _b.end) &&
                                    (snapshot === 'latest' || snapshot > ((_c = strategy.params) === null || _c === void 0 ? void 0 : _c.end))) ||
                                addresses.length === 0
                                ? {}
                                : strategies[strategy.name](space, network, provider, addresses, strategy.params, snapshot);
                        }))];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_3 = _a.sent();
                    return [2 /*return*/, Promise.reject(e_3)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function validateSchema(schema, data) {
    var ajv = new Ajv({ allErrors: true });
    // @ts-ignore
    addFormats(ajv);
    var validate = ajv.compile(schema);
    var valid = validate(data);
    return valid ? valid : validate.errors;
}
var utils = {
    call: call,
    multicall: multicall,
    subgraphRequest: subgraphRequest,
    ipfsGet: ipfsGet,
    sendTransaction: sendTransaction,
    getScores: getScores$1,
    validateSchema: validateSchema,
    getProvider: getProvider,
    decodeContenthash: decodeContenthash,
    validateContent: validateContent,
    isValidContenthash: isValidContenthash,
    encodeContenthash: encodeContenthash,
    resolveENSContentHash: resolveENSContentHash,
    resolveContent: resolveContent,
    signMessage: signMessage,
    getBlockNumber: getBlockNumber,
    Multicaller: Multicaller
};

var NO_TOKEN = "" + '0x'.padEnd(42, '0');
var ARAGON_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/aragon/aragon-govern-mainnet',
    '4': 'https://api.thegraph.com/subgraphs/name/aragon/aragon-govern-rinkeby'
};
var queueAbi = [
    {
        inputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: 'uint256',
                                name: 'nonce',
                                type: 'uint256'
                            },
                            {
                                internalType: 'uint256',
                                name: 'executionTime',
                                type: 'uint256'
                            },
                            {
                                internalType: 'address',
                                name: 'submitter',
                                type: 'address'
                            },
                            {
                                internalType: 'contract IERC3000Executor',
                                name: 'executor',
                                type: 'address'
                            },
                            {
                                components: [
                                    {
                                        internalType: 'address',
                                        name: 'to',
                                        type: 'address'
                                    },
                                    {
                                        internalType: 'uint256',
                                        name: 'value',
                                        type: 'uint256'
                                    },
                                    {
                                        internalType: 'bytes',
                                        name: 'data',
                                        type: 'bytes'
                                    }
                                ],
                                internalType: 'struct ERC3000Data.Action[]',
                                name: 'actions',
                                type: 'tuple[]'
                            },
                            {
                                internalType: 'bytes32',
                                name: 'allowFailuresMap',
                                type: 'bytes32'
                            },
                            {
                                internalType: 'bytes',
                                name: 'proof',
                                type: 'bytes'
                            }
                        ],
                        internalType: 'struct ERC3000Data.Payload',
                        name: 'payload',
                        type: 'tuple'
                    },
                    {
                        components: [
                            {
                                internalType: 'uint256',
                                name: 'executionDelay',
                                type: 'uint256'
                            },
                            {
                                components: [
                                    {
                                        internalType: 'address',
                                        name: 'token',
                                        type: 'address'
                                    },
                                    {
                                        internalType: 'uint256',
                                        name: 'amount',
                                        type: 'uint256'
                                    }
                                ],
                                internalType: 'struct ERC3000Data.Collateral',
                                name: 'scheduleDeposit',
                                type: 'tuple'
                            },
                            {
                                components: [
                                    {
                                        internalType: 'address',
                                        name: 'token',
                                        type: 'address'
                                    },
                                    {
                                        internalType: 'uint256',
                                        name: 'amount',
                                        type: 'uint256'
                                    }
                                ],
                                internalType: 'struct ERC3000Data.Collateral',
                                name: 'challengeDeposit',
                                type: 'tuple'
                            },
                            {
                                internalType: 'address',
                                name: 'resolver',
                                type: 'address'
                            },
                            {
                                internalType: 'bytes',
                                name: 'rules',
                                type: 'bytes'
                            }
                        ],
                        internalType: 'struct ERC3000Data.Config',
                        name: 'config',
                        type: 'tuple'
                    }
                ],
                internalType: 'struct ERC3000Data.Container',
                name: '_container',
                type: 'tuple'
            }
        ],
        name: 'schedule',
        outputs: [
            {
                internalType: 'bytes32',
                name: 'containerHash',
                type: 'bytes32'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'nonce',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
var ercAbi = [
    {
        constant: false,
        inputs: [
            {
                name: '_spender',
                type: 'address'
            },
            {
                name: '_value',
                type: 'uint256'
            }
        ],
        name: 'approve',
        outputs: [
            {
                name: '',
                type: 'bool'
            }
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                name: '_owner',
                type: 'address'
            },
            {
                name: '_spender',
                type: 'address'
            }
        ],
        name: 'allowance',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];
var GQL_QUERY = {
    registryEntry: {
        __args: {
            id: undefined
        },
        executor: {
            address: true
        },
        queue: {
            address: true,
            config: {
                executionDelay: true,
                scheduleDeposit: {
                    token: true,
                    amount: true
                },
                challengeDeposit: {
                    token: true,
                    amount: true
                },
                resolver: true,
                rules: true
            }
        }
    }
};
var FAILURE_MAP = '0x0000000000000000000000000000000000000000000000000000000000000000';
var EMPTY_BYTES = '0x00';
/**
 * scheduleAction schedules an action into a GovernQueue.
 * Instead of sending the action to a disputable delay from aragonOS, we directly call this
 * contract.
 * the actionsFromAragonPlugin is an array of objects with the form { to, value, data }
 */
function scheduleAction(network, web3, daoName, account, proof, actionsFromAragonPlugin) {
    return __awaiter(this, void 0, void 0, function () {
        var query, result, config, nonce, bnNonce, newNonce, currentDate, allowance, resetTx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = GQL_QUERY;
                    query.registryEntry.__args.id = daoName;
                    return [4 /*yield*/, subgraphRequest(ARAGON_SUBGRAPH_URL[network], query)];
                case 1:
                    result = _a.sent();
                    config = result.registryEntry.queue.config;
                    return [4 /*yield*/, call(web3, queueAbi, [
                            result.registryEntry.queue.address,
                            'nonce'
                        ])];
                case 2:
                    nonce = _a.sent();
                    bnNonce = BigNumber.from(nonce);
                    newNonce = bnNonce.add(BigNumber.from(1));
                    currentDate = Math.round(Date.now() / 1000) + Number(config.executionDelay) + 60;
                    return [4 /*yield*/, call(web3, ercAbi, [
                            config.scheduleDeposit.token,
                            'allowance',
                            [account, result.registryEntry.queue.address]
                        ])];
                case 3:
                    allowance = _a.sent();
                    if (!(allowance.lt(config.scheduleDeposit.amount) &&
                        config.scheduleDeposit.token !== NO_TOKEN)) return [3 /*break*/, 8];
                    if (!!allowance.isZero()) return [3 /*break*/, 6];
                    return [4 /*yield*/, sendTransaction(web3, config.scheduleDeposit.token, ercAbi, 'approve', [result.registryEntry.queue.address, '0'])];
                case 4:
                    resetTx = _a.sent();
                    return [4 /*yield*/, resetTx.wait(1)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [4 /*yield*/, sendTransaction(web3, config.scheduleDeposit.token, ercAbi, 'approve', [result.registryEntry.queue.address, config.scheduleDeposit.amount])];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [4 /*yield*/, sendTransaction(web3, result.registryEntry.queue.address, queueAbi, 'schedule', [
                        {
                            payload: {
                                nonce: newNonce.toString(),
                                executionTime: currentDate,
                                submitter: account,
                                executor: result.registryEntry.executor.address,
                                actions: actionsFromAragonPlugin,
                                allowFailuresMap: FAILURE_MAP,
                                // proof in snapshot's case, could be the proposal's IPFS CID
                                proof: proof ? toUtf8Bytes(proof) : EMPTY_BYTES
                            },
                            config: {
                                executionDelay: config.executionDelay,
                                scheduleDeposit: {
                                    token: config.scheduleDeposit.token,
                                    amount: config.scheduleDeposit.amount
                                },
                                challengeDeposit: {
                                    token: config.challengeDeposit.token,
                                    amount: config.challengeDeposit.amount
                                },
                                resolver: config.resolver,
                                rules: config.rules
                            }
                        }
                    ], {
                        // This can probably be optimized
                        gasLimit: 500000
                    })];
                case 9: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var Plugin = /** @class */ (function () {
    function Plugin() {
        this.author = 'Evalir';
        this.version = '0.1.3';
        this.name = 'Aragon Govern';
        this.website = 'https://aragon.org/blog/snapshot';
    }
    Plugin.prototype.action = function (network, web3, spaceOptions, proposalOptions, proposalId, winningChoice) {
        return __awaiter(this, void 0, void 0, function () {
            var account, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, web3.listAccounts()];
                    case 1:
                        account = (_a.sent())[0];
                        return [4 /*yield*/, scheduleAction(network, web3, spaceOptions.id, account, proposalId, proposalOptions["choice" + winningChoice].actions)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Plugin;
}());

var UNISWAP_V2_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
    '4': 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2-rinkeby',
    '100': 'https://api.thegraph.com/subgraphs/name/1hive/uniswap-v2'
};
var OMEN_SUBGRAPH_URL = {
    '1': 'https://api.thegraph.com/subgraphs/name/protofire/omen',
    '4': 'https://api.thegraph.com/subgraphs/name/protofire/omen-rinkeby',
    '100': 'https://api.thegraph.com/subgraphs/name/protofire/omen-xdai'
};
var WETH_ADDRESS = {
    '1': '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    '4': '0xc778417e063141139fce010982780140aa0cd5ab',
    '100': '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1'
};
var OMEN_GQL_QUERY = {
    condition: {
        __args: {
            id: undefined
        },
        id: true,
        fixedProductMarketMakers: {
            id: true,
            collateralToken: true,
            outcomeTokenAmounts: true,
            outcomeTokenMarginalPrices: true
        }
    }
};
var UNISWAP_V2_GQL_QUERY = {
    pairsTokens: {
        __aliasFor: 'pairs',
        __args: {
            where: {
                token0: true,
                token1: true
            }
        },
        token0Price: true
    },
    pairsTokensInverted: {
        __aliasFor: 'pairs',
        __args: {
            where: {
                token0: true,
                token1: true
            }
        },
        token1Price: true
    },
    pairsTokens0: {
        __aliasFor: 'pairs',
        __args: {
            where: {
                token0: true,
                token1: true
            }
        },
        token0Price: true
    },
    pairsTokens1: {
        __aliasFor: 'pairs',
        __args: {
            where: {
                token0: true,
                token1: true
            }
        },
        token0Price: true
    }
};
var erc20Abi$1 = [
    {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: '_upgradedAddress', type: 'address' }],
        name: 'deprecate',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            { name: '_spender', type: 'address' },
            { name: '_value', type: 'uint256' }
        ],
        name: 'approve',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'deprecated',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: '_evilUser', type: 'address' }],
        name: 'addBlackList',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            { name: '_from', type: 'address' },
            { name: '_to', type: 'address' },
            { name: '_value', type: 'uint256' }
        ],
        name: 'transferFrom',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'upgradedAddress',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{ name: '', type: 'address' }],
        name: 'balances',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'maximumFee',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: '_totalSupply',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [],
        name: 'unpause',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{ name: '_maker', type: 'address' }],
        name: 'getBlackListStatus',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            { name: '', type: 'address' },
            { name: '', type: 'address' }
        ],
        name: 'allowed',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'paused',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{ name: 'who', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [],
        name: 'pause',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getOwner',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            { name: '_to', type: 'address' },
            { name: '_value', type: 'uint256' }
        ],
        name: 'transfer',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            { name: 'newBasisPoints', type: 'uint256' },
            { name: 'newMaxFee', type: 'uint256' }
        ],
        name: 'setParams',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: 'amount', type: 'uint256' }],
        name: 'issue',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: 'amount', type: 'uint256' }],
        name: 'redeem',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            { name: '_owner', type: 'address' },
            { name: '_spender', type: 'address' }
        ],
        name: 'allowance',
        outputs: [{ name: 'remaining', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'basisPointsRate',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{ name: '', type: 'address' }],
        name: 'isBlackListed',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: '_clearedUser', type: 'address' }],
        name: 'removeBlackList',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'MAX_UINT',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: 'newOwner', type: 'address' }],
        name: 'transferOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{ name: '_blackListedUser', type: 'address' }],
        name: 'destroyBlackFunds',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { name: '_initialSupply', type: 'uint256' },
            { name: '_name', type: 'string' },
            { name: '_symbol', type: 'string' },
            { name: '_decimals', type: 'uint256' }
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, name: 'amount', type: 'uint256' }],
        name: 'Issue',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, name: 'amount', type: 'uint256' }],
        name: 'Redeem',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, name: 'newAddress', type: 'address' }],
        name: 'Deprecate',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, name: 'feeBasisPoints', type: 'uint256' },
            { indexed: false, name: 'maxFee', type: 'uint256' }
        ],
        name: 'Params',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, name: '_blackListedUser', type: 'address' },
            { indexed: false, name: '_balance', type: 'uint256' }
        ],
        name: 'DestroyedBlackFunds',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, name: '_user', type: 'address' }],
        name: 'AddedBlackList',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, name: '_user', type: 'address' }],
        name: 'RemovedBlackList',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'owner', type: 'address' },
            { indexed: true, name: 'spender', type: 'address' },
            { indexed: false, name: 'value', type: 'uint256' }
        ],
        name: 'Approval',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'from', type: 'address' },
            { indexed: true, name: 'to', type: 'address' },
            { indexed: false, name: 'value', type: 'uint256' }
        ],
        name: 'Transfer',
        type: 'event'
    },
    { anonymous: false, inputs: [], name: 'Pause', type: 'event' },
    { anonymous: false, inputs: [], name: 'Unpause', type: 'event' }
];
/**
 * Returns the token `name` and `symbol` from a given ERC-20 contract address
 * @param web3
 * @param tokenAddress
 * @param method
 */
var getTokenInfo = function (web3, tokenAddress) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, multicall(web3._network.chainId.toString(), web3, erc20Abi$1, [
                    [tokenAddress, 'name'],
                    [tokenAddress, 'symbol']
                ])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var Plugin$1 = /** @class */ (function () {
    function Plugin() {
        this.author = 'davidalbela';
        this.version = '0.0.1';
        this.name = 'Gnosis Impact';
        this.website = 'https://gnosis.io';
    }
    Plugin.prototype.getTokenInfo = function (web3, tokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenInfo, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, getTokenInfo(web3, tokenAddress)];
                    case 1:
                        tokenInfo = _a.sent();
                        return [2 /*return*/, {
                                address: tokenAddress,
                                checksumAddress: getAddress(tokenAddress),
                                name: tokenInfo[0][0],
                                symbol: tokenInfo[1][0]
                            }];
                    case 2:
                        e_1 = _a.sent();
                        throw new Error(e_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Plugin.prototype.getOmenCondition = function (network, conditionId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        query = OMEN_GQL_QUERY;
                        query.condition.__args.id = conditionId;
                        return [4 /*yield*/, subgraphRequest(OMEN_SUBGRAPH_URL[network], query)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Plugin.prototype.getUniswapPair = function (network, token0, token1) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        query = UNISWAP_V2_GQL_QUERY;
                        query.pairsTokens.__args.where = {
                            token0: token0.toLowerCase(),
                            token1: token1.toLowerCase()
                        };
                        query.pairsTokensInverted.__args.where = {
                            token0: token1.toLowerCase(),
                            token1: token0.toLowerCase()
                        };
                        query.pairsTokens0.__args.where = {
                            token0: token0.toLowerCase(),
                            token1: WETH_ADDRESS[network]
                        };
                        query.pairsTokens1.__args.where = {
                            token0: token1.toLowerCase(),
                            token1: WETH_ADDRESS[network]
                        };
                        return [4 /*yield*/, subgraphRequest(UNISWAP_V2_SUBGRAPH_URL[network], query)];
                    case 1:
                        result = _a.sent();
                        if (result.pairsTokens.length > 0) {
                            return [2 /*return*/, result.pairsTokens[0]];
                        }
                        else if (result.pairsTokensInverted.length > 0) {
                            return [2 /*return*/, {
                                    token0Price: result.pairsTokensInverted[0].token1Price
                                }];
                        }
                        else if (result.pairsTokens0.length > 0 &&
                            result.pairsTokens1.length > 0) {
                            return [2 /*return*/, {
                                    token0Price: (parseFloat(result.pairsTokens0[0].token0Price) /
                                        parseFloat(result.pairsTokens1[0].token0Price)).toString()
                                }];
                        }
                        throw new Error("Does not exist market pairs for " + token0 + " and " + token1 + ".");
                    case 2:
                        e_3 = _a.sent();
                        console.error(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Plugin;
}());

var EIP712_TYPES = {
    Transaction: [
        {
            name: 'to',
            type: 'address'
        },
        {
            name: 'value',
            type: 'uint256'
        },
        {
            name: 'data',
            type: 'bytes'
        },
        {
            name: 'operation',
            type: 'uint8'
        },
        {
            name: 'nonce',
            type: 'uint256'
        }
    ]
};
var ModuleAbi = [
    // Events
    'event ProposalQuestionCreated(bytes32 indexed questionId, string indexed proposalId)',
    // Read functions
    'function executor() view returns (address)',
    'function oracle() view returns (address)',
    'function questionCooldown() view returns (uint32)',
    'function buildQuestion(string proposalId, bytes32[] txHashes) view returns (string)',
    'function executedProposalTransactions(bytes32 questionHash, bytes32 txHash) view returns (bool)',
    'function questionIds(bytes32 questionHash) view returns (bytes32)',
    // Write functions
    'function addProposal(string proposalId, bytes32[] txHashes)',
    'function executeProposalWithIndex(string proposalId, bytes32[] txHashes, address to, uint256 value, bytes data, uint8 operation, uint256 txIndex)'
];
var OracleAbi = [
    // Read functions
    'function resultFor(bytes32 question_id) view returns (bytes32)',
    'function getFinalizeTS(bytes32 question_id) view returns (uint32)'
];
var buildQuestion = function (proposalId, txHashes) { return __awaiter(void 0, void 0, void 0, function () {
    var hashesHash;
    return __generator(this, function (_a) {
        hashesHash = keccak256(['bytes32[]'], [txHashes]).slice(2);
        return [2 /*return*/, proposalId + "\u241F" + hashesHash];
    });
}); };
var getProposalDetails = function (provider, network, moduleAddress, questionHash, txHashes) { return __awaiter(void 0, void 0, void 0, function () {
    var proposalInfo, questionId, nextIndexToExecute;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, multicall(network, provider, ModuleAbi, [[moduleAddress, 'questionIds', [questionHash]]].concat(txHashes.map(function (txHash) { return [
                    moduleAddress,
                    'executedProposalTransactions',
                    [questionHash, txHash]
                ]; })))];
            case 1:
                proposalInfo = (_a.sent()).map(function (res) { return res[0]; });
                questionId = proposalInfo[0];
                nextIndexToExecute = proposalInfo.indexOf(false, 1) - 1;
                return [2 /*return*/, {
                        questionId: questionId !== HashZero ? questionId : undefined,
                        nextTxIndex: nextIndexToExecute < 0 || nextIndexToExecute >= txHashes.length
                            ? undefined
                            : nextIndexToExecute
                    }];
        }
    });
}); };
var getModuleDetails = function (provider, network, moduleAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var moduleDetails;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, multicall(network, provider, ModuleAbi, [
                    [moduleAddress, 'executor'],
                    [moduleAddress, 'oracle'],
                    [moduleAddress, 'questionCooldown']
                ])];
            case 1:
                moduleDetails = _a.sent();
                return [2 /*return*/, {
                        dao: moduleDetails[0][0],
                        oracle: moduleDetails[1][0],
                        cooldown: moduleDetails[2][0]
                    }];
        }
    });
}); };
var checkPossibleExecution = function (provider, network, oracleAddress, questionId) { return __awaiter(void 0, void 0, void 0, function () {
    var result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!questionId) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, multicall(network, provider, OracleAbi, [
                        [oracleAddress, 'resultFor', [questionId]],
                        [oracleAddress, 'getFinalizeTS', [questionId]]
                    ])];
            case 2:
                result = _a.sent();
                return [2 /*return*/, {
                        executionApproved: BigNumber$1.from(result[0][0]).eq(BigNumber$1.from(1)),
                        finalizedAt: BigNumber$1.from(result[1][0]).toNumber()
                    }];
            case 3:
                e_1 = _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, {
                    executionApproved: false,
                    finalizedAt: undefined
                }];
        }
    });
}); };
var Plugin$2 = /** @class */ (function () {
    function Plugin() {
        this.author = 'Gnosis';
        this.version = '1.0.0';
        this.name = 'Dao Module';
        this.website = 'https://safe.gnosis.io';
    }
    Plugin.prototype.validateTransaction = function (transaction) {
        return (isBigNumberish(transaction.value) &&
            isAddress(transaction.to) &&
            (!transaction.data || isHexString(transaction.data)) &&
            transaction.operation in ['0', '1'] &&
            isBigNumberish(transaction.nonce));
    };
    Plugin.prototype.calcTransactionHash = function (network, moduleAddress, transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, domain;
            return __generator(this, function (_a) {
                provider = getProvider(network);
                domain = {
                    chainId: provider.network.chainId,
                    verifyingContract: moduleAddress
                };
                return [2 /*return*/, _TypedDataEncoder.hash(domain, EIP712_TYPES, transaction)];
            });
        });
    };
    Plugin.prototype.calcTransactionHashes = function (chainId, moduleAddress, transactions) {
        return __awaiter(this, void 0, void 0, function () {
            var domain;
            return __generator(this, function (_a) {
                domain = {
                    chainId: chainId,
                    verifyingContract: moduleAddress
                };
                return [2 /*return*/, transactions.map(function (tx) {
                        var txHash = _TypedDataEncoder.hash(domain, EIP712_TYPES, __assign({ 
                            // @ts-ignore
                            nonce: '0', 
                            // @ts-ignore
                            data: '0x' }, tx));
                        return txHash;
                    })];
            });
        });
    };
    Plugin.prototype.getExecutionDetails = function (network, moduleAddress, proposalId, transactions) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, txHashes, question, questionHash, proposalDetails, moduleDetails, questionState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = getProvider(network);
                        return [4 /*yield*/, this.calcTransactionHashes(provider.network.chainId, moduleAddress, transactions)];
                    case 1:
                        txHashes = _a.sent();
                        return [4 /*yield*/, buildQuestion(proposalId, txHashes)];
                    case 2:
                        question = _a.sent();
                        questionHash = keccak256(['string'], [question]);
                        return [4 /*yield*/, getProposalDetails(provider, network, moduleAddress, questionHash, txHashes)];
                    case 3:
                        proposalDetails = _a.sent();
                        return [4 /*yield*/, getModuleDetails(provider, network, moduleAddress)];
                    case 4:
                        moduleDetails = _a.sent();
                        return [4 /*yield*/, checkPossibleExecution(provider, network, moduleDetails.oracle, proposalDetails.questionId)];
                    case 5:
                        questionState = _a.sent();
                        try {
                            return [2 /*return*/, __assign(__assign(__assign(__assign(__assign({}, moduleDetails), { proposalId: proposalId }), questionState), proposalDetails), { transactions: transactions,
                                    txHashes: txHashes })];
                        }
                        catch (e) {
                            throw new Error(e);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Plugin.prototype.submitProposal = function (web3, moduleAddress, proposalId, transactions) {
        return __awaiter(this, void 0, void 0, function () {
            var txHashes, tx, receipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.calcTransactionHashes(web3.network.chainId, moduleAddress, transactions)];
                    case 1:
                        txHashes = _a.sent();
                        return [4 /*yield*/, sendTransaction(web3, moduleAddress, ModuleAbi, 'addProposal', [proposalId, txHashes])];
                    case 2:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.wait()];
                    case 3:
                        receipt = _a.sent();
                        console.log('[DAO module] submitted proposal:', receipt);
                        return [2 /*return*/];
                }
            });
        });
    };
    Plugin.prototype.executeProposal = function (web3, moduleAddress, proposalId, transactions, transactionIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var txHashes, moduleTx, tx, receipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.calcTransactionHashes(web3.network.chainId, moduleAddress, transactions)];
                    case 1:
                        txHashes = _a.sent();
                        moduleTx = transactions[transactionIndex];
                        return [4 /*yield*/, sendTransaction(web3, moduleAddress, ModuleAbi, 'executeProposalWithIndex', [
                                proposalId,
                                txHashes,
                                moduleTx.to,
                                moduleTx.value,
                                moduleTx.data || '0x',
                                moduleTx.operation,
                                transactionIndex
                            ])];
                    case 2:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.wait()];
                    case 3:
                        receipt = _a.sent();
                        console.log('[DAO module] executed proposal:', receipt);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Plugin;
}());

var Plugin$3 = /** @class */ (function () {
    function Plugin() {
        this.author = 'lbeder';
        this.version = '0.1.0';
        this.name = 'Quorum';
    }
    /**
     * Returns the total voting power at specific snapshot
     */
    Plugin.prototype.getTotalVotingPower = function (web3, quorumOptions, snapshot) {
        return __awaiter(this, void 0, void 0, function () {
            var strategy, _a, address, methodABI, decimals, blockTag, totalVotingPower, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        strategy = quorumOptions.strategy;
                        _a = strategy;
                        switch (_a) {
                            case 'static': return [3 /*break*/, 1];
                            case 'balance': return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        {
                            return [2 /*return*/, quorumOptions.total];
                        }
                    case 2:
                        address = quorumOptions.address, methodABI = quorumOptions.methodABI, decimals = quorumOptions.decimals;
                        blockTag = 
                        // @ts-ignore
                        snapshot === 'latest' ? snapshot : parseInt(snapshot);
                        return [4 /*yield*/, call(web3, [methodABI], [address, methodABI.name], { blockTag: blockTag })];
                    case 3:
                        totalVotingPower = _b.sent();
                        return [2 /*return*/, BigNumber.from(totalVotingPower)
                                .div(BigNumber.from(10).pow(decimals))
                                .toNumber()];
                    case 4: throw new Error("Unsupported quorum strategy: " + strategy);
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _b.sent();
                        throw new Error(e_1);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Plugin;
}());

var plugins = {
    aragon: Plugin,
    gnosis: Plugin$1,
    daoModule: Plugin$2,
    quorum: Plugin$3
};

var $schema = "http://json-schema.org/draft-07/schema#";
var $ref = "#/definitions/Space";
var definitions = {
	Space: {
		title: "Space",
		type: "object",
		properties: {
			name: {
				type: "string",
				title: "name",
				minLength: 1,
				maxLength: 32
			},
			"private": {
				type: "boolean"
			},
			about: {
				type: "string",
				title: "about",
				maxLength: 160
			},
			terms: {
				type: "string",
				title: "terms",
				format: "uri",
				maxLength: 128
			},
			location: {
				type: "string",
				title: "location",
				maxLength: 24
			},
			website: {
				type: "string",
				title: "website",
				format: "uri",
				maxLength: 128
			},
			twitter: {
				type: "string",
				title: "twitter",
				pattern: "^[A-Za-z0-9_]*$",
				maxLength: 15
			},
			github: {
				type: "string",
				title: "github",
				pattern: "^[A-Za-z0-9_-]*$",
				maxLength: 39
			},
			email: {
				type: "string",
				title: "email",
				maxLength: 32
			},
			network: {
				type: "string",
				title: "network",
				minLength: 1,
				maxLength: 32
			},
			symbol: {
				type: "string",
				title: "symbol",
				minLength: 1,
				maxLength: 12
			},
			skin: {
				type: "string",
				title: "skin",
				maxLength: 32
			},
			domain: {
				type: "string",
				title: "domain",
				maxLength: 64
			},
			strategies: {
				type: "array",
				minItems: 1,
				maxItems: 5,
				items: {
					type: "object",
					properties: {
						name: {
							type: "string",
							maxLength: 64,
							title: "name"
						},
						params: {
							type: "object",
							title: "params"
						}
					},
					required: [
						"name"
					],
					additionalProperties: false
				},
				title: "strategies"
			},
			members: {
				type: "array",
				items: {
					type: "string",
					pattern: "^[A-Za-z0-9]*$",
					minLength: 42,
					maxLength: 42
				},
				title: "members"
			},
			admins: {
				type: "array",
				items: {
					type: "string",
					pattern: "^[A-Za-z0-9]*$",
					minLength: 42,
					maxLength: 42
				},
				title: "admins"
			},
			filters: {
				type: "object",
				properties: {
					defaultTab: {
						type: "string"
					},
					minScore: {
						type: "number",
						minimum: 0
					},
					onlyMembers: {
						type: "boolean"
					},
					invalids: {
						type: "array",
						items: {
							type: "string",
							maxLength: 64
						},
						title: "invalids"
					}
				},
				additionalProperties: false
			},
			plugins: {
				type: "object"
			}
		},
		required: [
			"name",
			"network",
			"symbol",
			"strategies"
		],
		additionalProperties: false
	}
};
var space = {
	$schema: $schema,
	$ref: $ref,
	definitions: definitions
};

var schemas = {
    space: space.definitions.Space
};

var index = {
    Client: Client,
    plugins: plugins,
    strategies: strategies,
    schemas: schemas,
    utils: utils
};

export default index;
