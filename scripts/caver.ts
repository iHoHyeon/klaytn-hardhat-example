import Caver from 'caver-js';
import { config } from 'hardhat';
import { HttpNetworkUserConfig } from 'hardhat/types';

export const getCaver = () => {
  const network = config.networks[process.env.HARDHAT_NETWORK as string] as HttpNetworkUserConfig;

  const caver = new Caver(
    new Caver.providers.HttpProvider(network.url!, {
      headers: [
        { name: 'Authorization', value: 'Basic ' + Buffer.from(process.env.ACCESS_KEY_ID + ':' + process.env.SECRET_ACCESS_KEY).toString('base64') },
        { name: 'x-chain-id', value: network.chainId!.toString() },
      ],
    })
  );

  return caver;
};

export const getDeployerKeyring = () => {
  const caver = getCaver();
  return caver.wallet.keyring.createFromPrivateKey(process.env.DEPLOYER_KEY!);
};

export const getCaverWithDeployerKeyring = () => {
  const caver = getCaver();
  const deployerKeyring = getDeployerKeyring();

  caver.wallet.add(deployerKeyring);

  return caver;
};
