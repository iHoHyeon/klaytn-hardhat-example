const { expect } = require('chai');

describe('ConnectableToken contract', function () {
  let ConnectableToken;
  let token17;
  let _name = 'ConnectableToken';
  let _symbol = 'Badge';
  let account1, otheraccounts;

  beforeEach(async function () {
    ConnectableToken = await ethers.getContractFactory('ConnectableToken');
    [owner, account1, ...otheraccounts] = await ethers.getSigners();

    token17 = await ConnectableToken.deploy(_name, _symbol);
  });

  // You can nest describe calls to create subsections.
  describe('Deployment', function () {
    it('Should has the correct name and symbol ', async function () {
      expect(await token17.name()).to.equal(_name);
      expect(await token17.symbol()).to.equal(_symbol);
    });

    it('Should mint a token with token ID 1 & 2 to account1', async function () {
      const address1 = account1.address;
      await token17.mintTo(address1);
      expect(await token17.ownerOf(1)).to.equal(address1);

      await token17.mintTo(address1);
      expect(await token17.ownerOf(2)).to.equal(address1);

      expect(await token17.balanceOf(address1)).to.equal(2);
    });
  });
});
