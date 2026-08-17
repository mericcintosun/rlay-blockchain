// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {DeployRlay} from "../script/DeployRlay.s.sol";
import {RlayToken} from "../src/RlayToken.sol";
import {RlayClaim} from "../src/RlayClaim.sol";

/// @dev Base Sepolia fork'unda deploy script'inin baştan sona doğru çalıştığını
///      ve bakiye dağılımının beklenen şekilde oluştuğunu doğrular.
contract DeployRlayTest is Test {
    function setUp() public {
        string memory rpc = vm.envOr("BASE_SEPOLIA_RPC", string("https://sepolia.base.org"));
        vm.createSelectFork(rpc);
    }

    function test_DeployScriptDistributesBalancesCorrectly() public {
        DeployRlay deployScript = new DeployRlay();
        (RlayToken token, RlayClaim claimContract) = deployScript.run();

        address realOwner = deployScript.REAL_OWNER();

        assertEq(token.totalSupply(), deployScript.MAX_SUPPLY());
        assertEq(token.balanceOf(address(claimContract)), deployScript.CLAIM_POOL());
        assertEq(token.balanceOf(realOwner), deployScript.TREASURY_REMAINDER());
        assertEq(claimContract.CLAIM_AMOUNT(), deployScript.CLAIM_AMOUNT());
        assertEq(claimContract.remainingPool(), deployScript.CLAIM_POOL());
        assertEq(claimContract.pendingOwner(), realOwner);
    }
}
