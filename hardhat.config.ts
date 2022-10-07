import * as dotenv from 'dotenv';

import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    cypress: {
      url: process.env.CYPRESS_URL,
      httpHeaders: {
        Authorization: 'Basic ' + Buffer.from(process.env.ACCESS_KEY_ID + ':' + process.env.SECRET_ACCESS_KEY).toString('base64'),
        'x-chain-id': '8217',
      },
      accounts: [process.env.DEPLOYER_KEY || ''],
      chainId: 8217,
      gas: 8500000,
      gasPrice: 250000000000,
    },
    baobab: {
      url: process.env.BAOBAB_URL,
      httpHeaders: {
        Authorization: 'Basic ' + Buffer.from(process.env.ACCESS_KEY_ID + ':' + process.env.SECRET_ACCESS_KEY).toString('base64'),
        'x-chain-id': '1001',
      },
      accounts: [process.env.DEPLOYER_KEY || ''],
      chainId: 1001,
      gas: 8500000,
      gasPrice: 250000000000,
    },
  },
};

export default config;
