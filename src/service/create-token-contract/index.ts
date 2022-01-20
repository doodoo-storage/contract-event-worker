import { getRepository } from 'typeorm'
import { NftTokenContract } from '../../entity';

type CreateTokenContractParam = {
  chain: 'KLAYTN' | 'ETHEREUM';
  type: string;
  address: string;
  transactionHash: string;
  name?: string;
  symbol?: string;
}

export const createTokenContract = async (param: CreateTokenContractParam) => {
  const klaytnTokenContract = await getRepository(NftTokenContract).find({ 
    select: ['transactionHash'],
    where: { chain: param.chain }
  });

  const isExistTracsaction = klaytnTokenContract.map(contract => contract.transactionHash).includes(param.transactionHash);
  if (!isExistTracsaction) await getRepository(NftTokenContract).save(param);
}