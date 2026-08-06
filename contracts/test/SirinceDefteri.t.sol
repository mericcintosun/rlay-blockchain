// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {SirinceDefteri} from "../src/SirinceDefteri.sol";

contract SirinceDefteriTest is Test {
    SirinceDefteri internal defter;
    address internal ogrenci = address(0xBEEF);

    function setUp() public {
        defter = new SirinceDefteri();
    }

    function test_AnyoneCanWrite() public {
        vm.prank(ogrenci);
        defter.write("merhaba Sirince");

        assertEq(defter.lastMessage(), "merhaba Sirince");
        assertEq(defter.messageCount(), 1);
    }

    function test_EmptyMessageIsRejected() public {
        vm.expectRevert(SirinceDefteri.EmptyMessage.selector);
        defter.write("");
    }

    function test_OnlyOwnerCanClear() public {
        defter.write("silinecek");

        vm.prank(ogrenci);
        vm.expectRevert(SirinceDefteri.NotOwner.selector);
        defter.clear();

        defter.clear();
        assertEq(defter.lastMessage(), "");
    }
}
