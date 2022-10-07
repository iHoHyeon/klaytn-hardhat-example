import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import { config } from 'hardhat';
import { HttpNetworkUserConfig } from 'hardhat/src/types/config';
import Caver, { AbiItem } from 'caver-js';
import { abi, bytecode } from './artifacts';

async function main() {
  const network = config.networks[process.env.HARDHAT_NETWORK as string] as HttpNetworkUserConfig;

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

  let connectableTokenContract = new caver.contract(abi as AbiItem[], undefined, { gasPrice: '25000000000' });

  console.log('Deploying contracts with the account:', deployerKeyring.address);

  connectableTokenContract = await connectableTokenContract.deploy(
    {
      from: deployerKeyring.address,
      gas: 8000000,
      // feeDelegation: true,
      // feePayer: deployerKeyring.address,
    },
    bytecode,
    'ConnectableToken',
    'CNT'
  );

  console.log('Contracts deployed to:', connectableTokenContract._address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
