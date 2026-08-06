// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title Kasa - INTENTIONALLY VULNERABLE
/// @notice DO NOT FIX THIS FILE. It exists so the instructor can drain it live
///         in front of the class on Day 3, then patch it together with them.
///         The bug: withdraw() sends funds BEFORE zeroing the balance,
///         so a contract with a receive() hook can re-enter and drain the vault.
/// @dev Never deploy anything shaped like this to a real network.
contract Kasa {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "no balance");

        // BUG: interaction happens before the effect.
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "transfer failed");

        balances[msg.sender] = 0;
    }

    function totalBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
