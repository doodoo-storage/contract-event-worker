import { AbiItem, Contract } from 'caver-js';
import env from 'env-var';

import abi from './abi.json';

import { getCaver } from '../../../util';

const KIP_FACTORY_ADDRESS = env.get('KIP_FACTORY_ADDRESS').required().asString();

let contract: Contract;

export const kipFactoryContract = () => contract ? contract : createContract();

const createContract = () => {
  const caver = getCaver();
  return new caver.contract(abi as AbiItem[], KIP_FACTORY_ADDRESS);
}