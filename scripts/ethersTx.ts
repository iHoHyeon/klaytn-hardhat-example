import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import { BytesLike } from 'ethers/lib/utils';

dotenv.config();

async function main() {
  const account = '0xba4A3E33D36B84794ea5F72c1e5A35051A186b49';
  const contractAddress = '0x70BFD689CbD6251B1cf79A43Bd9B49D0cA0466D5';
  const url = process.env.KLAYTN_URL;
  // @ts-ignore
  const priv: BytesLike = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(url);
  const wallet = new ethers.Wallet(priv, provider);

  const tx = await wallet.sendTransaction({
    to: account,
    value: '1000000000000000000', // 1 KLAY
    gasPrice: 250000000000, // klaytn 고정 가스 수수료
    gasLimit: 21000,
  });

  const receipt = await tx.wait();
  console.log(receipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
