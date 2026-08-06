// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title BahsisKutusu - a tip jar
/// @notice Day 4 project starting point. Follows Checks-Effects-Interactions.
contract BahsisKutusu {
    address public immutable owner;

    /// @notice Total amount each address has ever tipped.
    mapping(address => uint256) public tippedBy;

    event Tipped(address indexed from, uint256 amount, string note);
    event Withdrawn(address indexed to, uint256 amount);

    error NotOwner();
    error NothingToWithdraw();
    error TransferFailed();

    constructor() {
        owner = msg.sender;
    }

    /// @notice Send a tip with an optional note.
    function tip(string calldata note) external payable {
        tippedBy[msg.sender] += msg.value;
        emit Tipped(msg.sender, msg.value, note);
    }

    /// @notice Withdraw the whole balance. Owner only.
    function withdraw() external {
        if (msg.sender != owner) revert NotOwner();

        // Checks
        uint256 amount = address(this).balance;
        if (amount == 0) revert NothingToWithdraw();

        // Effects happen before the external call - nothing to zero here,
        // but the ordering habit is the point.
        emit Withdrawn(owner, amount);

        // Interaction
        (bool ok, ) = owner.call{value: amount}("");
        if (!ok) revert TransferFailed();
    }
}
