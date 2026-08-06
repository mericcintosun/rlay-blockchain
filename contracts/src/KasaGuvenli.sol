// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title KasaGuvenli - the patched vault
/// @notice Written together with the class AFTER the live drain of Kasa.sol.
///         Only one thing changed: the balance is zeroed before the transfer.
contract KasaGuvenli {
    mapping(address => uint256) public balances;

    error NoBalance();
    error TransferFailed();

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        // Checks
        uint256 amount = balances[msg.sender];
        if (amount == 0) revert NoBalance();

        // Effects - BEFORE the external call
        balances[msg.sender] = 0;

        // Interaction
        (bool ok, ) = msg.sender.call{value: amount}("");
        if (!ok) revert TransferFailed();
    }

    function totalBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
