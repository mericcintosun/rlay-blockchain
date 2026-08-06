// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {SirinceToken} from "../src/SirinceToken.sol";

contract SirinceTokenTest is Test {
    SirinceToken internal token;
    address internal ogrenci = address(0xBEEF);

    function setUp() public {
        token = new SirinceToken("Sirince", "SRC", 1_000_000e18);
    }

    function test_OwnerCanMint() public {
        token.mint(ogrenci, 100e18);
        assertEq(token.balanceOf(ogrenci), 100e18);
    }

    function test_StudentCannotMint() public {
        vm.prank(ogrenci);
        vm.expectRevert();
        token.mint(ogrenci, 100e18);
    }

    function test_CapCannotBeExceeded() public {
        token.mint(ogrenci, 1_000_000e18);

        vm.expectRevert();
        token.mint(ogrenci, 1);
    }

    /// @dev The computer tries 256 random amounts. None may break the cap.
    function testFuzz_SupplyNeverExceedsCap(uint256 amount) public {
        amount = bound(amount, 0, type(uint128).max);

        if (amount > token.maxSupply()) {
            vm.expectRevert();
            token.mint(ogrenci, amount);
        } else {
            token.mint(ogrenci, amount);
            assertLe(token.totalSupply(), token.maxSupply());
        }
    }
}
