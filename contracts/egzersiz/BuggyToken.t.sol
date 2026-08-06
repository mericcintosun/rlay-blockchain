// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {BuggyToken} from "./BuggyToken.sol";

/// @notice Starting point for the Day 3 exercise.
///         The two tests below PASS. That is the trap - passing tests do not
///         mean correct code, they mean you have not written the right test yet.
///
///         Your job: add a test that FAILS because of the bug.
///         Hint: think about what an approval is supposed to guarantee.
contract BuggyTokenTest is Test {
    BuggyToken internal token;

    address internal ayse = address(0xA1);
    address internal mehmet = address(0xB2);

    function setUp() public {
        token = new BuggyToken(1000e18);
        token.transfer(ayse, 100e18);
    }

    function test_TransferWorks() public {
        vm.prank(ayse);
        token.transfer(mehmet, 10e18);

        assertEq(token.balanceOf(mehmet), 10e18);
    }

    function test_ApproveThenTransferFromWorks() public {
        vm.prank(ayse);
        token.approve(mehmet, 30e18);

        vm.prank(mehmet);
        token.transferFrom(ayse, mehmet, 30e18);

        assertEq(token.balanceOf(mehmet), 30e18);
    }

    // TODO: write the test that exposes the bug.
    // Ayşe approved Mehmet for a certain amount, once.
    // What should Mehmet be unable to do afterwards?
}
