import { ethers } from 'hardhat';

async function main() {
  const ConnectableToken = await ethers.getContractFactory('ConnectableToken');
  console.log('Deploying ConnectableToken KIP17 token...');
  const token = await ConnectableToken.deploy('ConnectableToken', 'CNT');

  await token.deployed();
  console.log('ConnectableToken deployed to:', token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
