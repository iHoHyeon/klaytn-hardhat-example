// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@klaytn/contracts/KIP/token/KIP17/KIP17.sol';
import '@klaytn/contracts/KIP/token/KIP17/extensions/KIP17MetadataMintable.sol';
import '@klaytn/contracts/security/Pausable.sol';
import '@klaytn/contracts/access/Ownable.sol';
import '@klaytn/contracts/KIP/token/KIP17/extensions/KIP17Burnable.sol';
import '@klaytn/contracts/utils/Counters.sol';

contract ConnectableToken is KIP17, KIP17MetadataMintable, Pausable, Ownable, KIP17Burnable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;

  constructor(string memory _name, string memory _symbol) KIP17(_name, _symbol) {
    _tokenIdCounter.increment();
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  function safeMint(address to, string memory uri) public onlyOwner {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(KIP17, KIP17MetadataMintable, KIP17Burnable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override whenNotPaused onlyOwner {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  // The following functions are overrides required by Solidity.

  function _burn(uint256 tokenId) internal override(KIP17, KIP17URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId) public view override(KIP17, KIP17URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }
}
