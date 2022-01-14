import { AbiItem } from 'caver-js';
import { flattenDeep } from 'lodash';

import kip17Abi from './kip17-abi.json';
import kip37Abi from './kip37-abi.json';

import { getCaver } from '../../../util';

type CreateContractParam = {
  type: string;
  addresses: string[];
};

export const createContract = (params: CreateContractParam[]) => {
  const caver = getCaver();
  
  const contracts = params.map(param => {
    const abi = (param.type === 'KIP17' ? kip17Abi : kip37Abi) as AbiItem[];    
    return param.addresses.map(address => new caver.contract(abi, address))
  });

  return flattenDeep(contracts);
}
