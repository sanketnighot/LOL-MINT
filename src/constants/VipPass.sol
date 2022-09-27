// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract VipPass is ERC721 {
    string public uriPrefix =
        "ipfs://QmZvNzH5CmTLjHZvhBP1vWmEEBgfnvpfYm2Qu49HJBMrgk";
    uint256 public tokenId;
    uint256 public price = 0.0001 ether;
    uint256 public maxSupply = 10000;
    bool paused;
    address owner;

    constructor() ERC721("VIPTEST", "V") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "NOT OWNER");
        _;
    }

    function mint() public payable {
        require(msg.sender == tx.origin, "NOT EOA");
        require(tokenId < maxSupply, "MAX_SUPPLY_EXCEEDED");
        require(msg.value >= price, "INSUFFICIENT_FUND");
        ++tokenId;
        _mint(msg.sender, tokenId);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return uriPrefix;
    }

    // onlyOwner Functions

    function totalSupply() public view returns (uint256) {
        return tokenId;
    }

    function updateMaxSupply(uint256 _newSupply) public onlyOwner {
        require(_newSupply > totalSupply(), "WRONG SUPPLY");
        maxSupply = _newSupply;
    }

    function setPause(bool _pause) public onlyOwner {
        paused = _pause;
    }

    function setUriPrefix(string memory _uriPrefix) public onlyOwner {
        uriPrefix = _uriPrefix;
    }

    function updateMintingprice(uint256 _price) public onlyOwner {
        price = _price;
    }

    function setOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function withdraw() public onlyOwner {
        (bool hs, ) = payable(owner).call{value: address(this).balance}("");
        require(hs, "WITHDRAW_ERROR");
    }
}

// Deployment Cost - 2,891,978
// mint cost 1st time - 95,057
// mint cost 2nd time - 60,857
// 60,857
