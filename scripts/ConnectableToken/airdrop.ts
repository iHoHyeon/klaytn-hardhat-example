import getConnectableTokenMethods from './methods';

export default async function airdrop(mintInfoList: Array<{ address: string; tokenURI: string }>) {
  const contractAddress = '0xc4af4db082fa1f47757c08c40db9620ce83df40a';

  const { safeMint } = getConnectableTokenMethods(contractAddress);

  for await (const { address, tokenURI } of mintInfoList) {
    const tx = await safeMint(address, tokenURI);
    console.log(tx);
  }
  // why 병렬처리는 안 되는가? -> Nonce 관해서 더 알아보기

  // const txList = await Promise.all(RECEIVERS.map((address, idx) => safeMint(address, TOKEN_URI, { nonce: caver.utils.toHex(idx + 200) })));
  // console.log(txList);
}
