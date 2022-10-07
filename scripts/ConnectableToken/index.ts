import Caver, { AbiItem, TransactionReceipt } from 'caver-js';
import { config } from 'hardhat';
import { HttpNetworkUserConfig } from 'hardhat/types';
import { ConnectableTokenInterface } from '../../typechain/ConnectableToken';
import { abi } from './artifacts';

// mainnet : 0x2bD57f9573eDEbB132C7C20d6481627b611CBc05

async function main() {
  const network = config.networks[process.env.HARDHAT_NETWORK as string] as HttpNetworkUserConfig;
  const contractAddress = '0xc4af4db082fa1f47757c08c40db9620ce83df40a';

  const caver = new Caver(
    new Caver.providers.HttpProvider(network.url!, {
      headers: [
        { name: 'Authorization', value: 'Basic ' + Buffer.from(process.env.ACCESS_KEY_ID + ':' + process.env.SECRET_ACCESS_KEY).toString('base64') },
        { name: 'x-chain-id', value: network.chainId!.toString() },
      ],
    })
  );

  const deployerKeyring = caver.wallet.keyring.createFromPrivateKey(process.env.DEPLOYER_KEY!);

  caver.wallet.add(deployerKeyring);

  const connectableTokenContract = new caver.contract(abi as AbiItem[], contractAddress, { gasPrice: '25000000000', gas: 5000000 });

  const methods = connectableTokenContract.methods as Record<keyof ConnectableTokenInterface['functions'], Function>;

  const safeMint = async (to: string, tokenURI: string) => {
    return methods['safeMint(address,string)'](to, tokenURI).send({ from: deployerKeyring.address, gas: 5000000 });
  };

  const safeTransferFrom = async (from: string, to: string, tokenId: number) => {
    return methods['safeTransferFrom(address,address,uint256)'](from, to, tokenId).send({ from: deployerKeyring.address, gas: 5000000 });
  };

  const tx: TransactionReceipt = await safeMint(deployerKeyring.address, 'connectable forever');
  // const tx: TransactionReceipt = await safeTransferFrom(deployerKeyring.address, deployerKeyring.address, 1);

  // console.log(tx);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
