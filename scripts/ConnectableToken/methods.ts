import * as dotenv from 'dotenv';
import { abi } from './artifacts';
import { AbiItem } from 'caver-js';
import { ConnectableTokenInterface } from '../../typechain/ConnectableToken';
import { getCaverWithDeployerKeyring, getDeployerKeyring } from '../caver';

dotenv.config();

export default function getConnectableTokenMethods(contractAddress: string) {
  const caver = getCaverWithDeployerKeyring();
  const deployerKeyring = getDeployerKeyring();

  const connectableTokenContract = new caver.contract(abi as AbiItem[], contractAddress, { gasPrice: '25000000000', gas: 5000000 });

  const methods = connectableTokenContract.methods as Record<keyof ConnectableTokenInterface['functions'], Function>;

  const safeMint = async (to: string, tokenURI: string, options?: any) => {
    return methods['safeMint(address,string)'](to, tokenURI).send({
      from: deployerKeyring.address,
      gas: 5000000,
      ...options,
    });
  };

  const safeTransferFrom = async (from: string, to: string, tokenId: number) => {
    return methods['safeTransferFrom(address,address,uint256)'](from, to, tokenId).send({ from: deployerKeyring.address, gas: 5000000 });
  };
  return { safeMint, safeTransferFrom };
}
