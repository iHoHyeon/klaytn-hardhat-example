import getConnectableTokenMethods from './methods';
import caver from 'caver-js';

const TEST_ADDRESS = '0xba4a3e33d36b84794ea5f72c1e5a35051a186b49';

const RECEIVERS: Array<string> = new Array(3).fill(TEST_ADDRESS);

const TOKEN_URI = 'https://connectable-events.s3.ap-northeast-2.amazonaws.com/welcome-ticket/welcome-tokenuri.json';

async function main() {
  const { safeMint } = getConnectableTokenMethods();

  for await (const address of RECEIVERS) {
    const tx = await safeMint(address, TOKEN_URI);
    console.log(tx);
  }
  // why 병렬처리는 안 되는가? -> Nonce 관해서 더 알아보기

  // const txList = await Promise.all(RECEIVERS.map((address, idx) => safeMint(address, TOKEN_URI, { nonce: caver.utils.toHex(idx + 200) })));
  // console.log(txList);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
