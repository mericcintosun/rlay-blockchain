// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title SirinceDefteri - the village guestbook
/// @notice Day 2 teaching contract. Anyone can leave a message; only the
///         owner can clear the board. Deliberately small: state, function, event.
contract SirinceDefteri {
    /// @notice Address that deployed the contract.
    address public immutable owner;

    /// @notice The most recent message written to the board.
    string public lastMessage;

    /// @notice How many messages have been written since deployment.
    uint256 public messageCount;

    event MessageWritten(address indexed author, string message);
    event BoardCleared(address indexed by);

    error NotOwner();
    error EmptyMessage();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice Write a message to the board.
    function write(string calldata message) external {
        if (bytes(message).length == 0) revert EmptyMessage();

        lastMessage = message;
        messageCount += 1;

        emit MessageWritten(msg.sender, message);
    }

    /// @notice Clear the board. Owner only.
    function clear() external onlyOwner {
        lastMessage = "";
        emit BoardCleared(msg.sender);
    }
}
