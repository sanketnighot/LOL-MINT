// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract VIP is ERC721, ERC721URIStorage {
    address owner;
    uint256 tokenId = 1;
    uint256 limit;
    bool paused = false;
    string tokenMetadata =
        "ipfs://QmZvNzH5CmTLjHZvhBP1vWmEEBgfnvpfYm2Qu49HJBMrgk";
    uint256 price = 0.0001 ether;

    constructor(uint256 _limit)
        ERC721("Lords Of The Lands VIP Pass", "LOLVIP")
    {
        owner = msg.sender;
        limit = _limit;
    }

    receive() external payable {}

    function mintPass() public payable {
        require(paused == false, "Contract is paused");
        require(tokenId <= limit, "Limit exceeded");
        require(msg.value == price, "Insufficient amount");
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenMetadata);
        tokenId++;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage, ERC721)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function updateTokenURI(uint256 tokenId, string memory _newURI) public {
        require(msg.sender == owner, "not allowed");
        _setTokenURI(tokenId, _newURI);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721URIStorage, ERC721)
    {
        require(msg.sender == owner);
        super._burn(tokenId);
    }

    function resetLimit(uint256 newLimit) public {
        require(msg.sender == owner, "Admin func");
        tokenId = limit + 1;
        limit = limit + newLimit;
    }

    function setPausibility(bool value) public {
        require(msg.sender == owner);
        paused = value;
    }

    function updatePrice(uint256 newPrice) public {
        require(msg.sender == owner);
        price = newPrice;
    }

    function getContractBalance() public view returns (uint256) {
        require(msg.sender == owner, "can't show balance");
        return address(this).balance;
    }

    function withdrawAmount() public payable {
        require(msg.sender == owner);
        address payable payOwner = payable(owner);
        (bool sent, bytes memory data) = payOwner.call{
            value: address(this).balance
        }("");
        require(sent, "Failed to send ether");
    }

    function updateOwner(address newOwner) public {
        require(msg.sender == owner);
        owner = newOwner;
    }
}

// Deploy GAS = 3,117,899
// mint gas 1st time  = 154,438
// mint gas 2nd time  = 137,338
// 137,338