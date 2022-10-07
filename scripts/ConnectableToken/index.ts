import airdrop from './airdrop';

// mainnet : 0x2bD57f9573eDEbB132C7C20d6481627b611CBc05

const TEST_ADDRESS = '0xba4a3e33d36b84794ea5f72c1e5a35051a186b49';

const TOKEN_URI = 'https://connectable-events.s3.ap-northeast-2.amazonaws.com/welcome-ticket/welcome-tokenuri.json';

async function main() {
  await airdrop(new Array(3).fill({ address: TEST_ADDRESS, tokenURI: TOKEN_URI }));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
