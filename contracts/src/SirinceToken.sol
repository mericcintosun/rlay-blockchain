s// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC20} from "openzeppelin-contracts/token/ERC20/ERC20.sol";
import {Ownable} from "openzeppelin-contracts/access/Ownable.sol";

/// @title SirinceToken - the camp currency
/// @notice Day 2 teaching contract. Built on OpenZeppelin on purpose:
///         using an audited library is a security decision, not laziness.
contract SirinceToken is ERC20, Ownable {
    /// @notice Hard cap on total supply. Cannot be raised after deployment.
    uint256 public immutable maxSupply;

    error CapExceeded(uint256 requested, uint256 remaining);

    constructor(string memory name_, string memory symbol_, uint256 maxSupply_)
        ERC20(name_, symbol_)
        Ownable(msg.sender)
    {
        maxSupply = maxSupply_;
    }

    /// @notice Mint new tokens. Owner only, and never past the cap.
    function mint(address to, uint256 amount) external onlyOwner {
        uint256 remaining = maxSupply - totalSupply();
        if (amount > remaining) revert CapExceeded(amount, remaining);

        _mint(to, amount);
    }
}
