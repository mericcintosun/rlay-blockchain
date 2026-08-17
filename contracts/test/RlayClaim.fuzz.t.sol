// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {RlayToken} from "../src/RlayToken.sol";
import {RlayClaim} from "../src/RlayClaim.sol";

contract RlayClaimFuzzTest is Test {
    RlayToken internal token;
    RlayClaim internal claimContract;

    address internal owner = makeAddr("owner");

    uint256 internal constant CLAIM_AMOUNT = 1_000_000e18;
    uint256 internal constant POOL = 20_000_000e18;
    uint256 internal constant TOKEN_MAX_SUPPLY = 21_000_000e18;

    function setUp() public {
        token = new RlayToken(owner);
        claimContract = new RlayClaim(address(token), CLAIM_AMOUNT, owner);

        vm.prank(owner);
        token.transfer(address(claimContract), POOL);
    }

    function testFuzz_ClaimTransfersExactAmountToAnyWallet(address claimant) public {
        vm.assume(claimant != address(0));
        vm.assume(claimant.code.length == 0);
        // owner keeps the 1,000,000 RLAY remainder from setUp (21M - 20M pool) - excluding
        // it keeps this test about the claim payout, not about owner's unrelated balance.
        vm.assume(claimant != owner);

        vm.prank(claimant);
        claimContract.claim();

        assertEq(token.balanceOf(claimant), CLAIM_AMOUNT);
        assertTrue(claimContract.hasClaimed(claimant));
    }

    function testFuzz_RevertWhen_SameWalletClaimsTwice(address claimant) public {
        vm.assume(claimant != address(0));
        vm.assume(claimant.code.length == 0);

        vm.prank(claimant);
        claimContract.claim();

        vm.prank(claimant);
        vm.expectRevert(abi.encodeWithSelector(RlayClaim.AlreadyClaimed.selector, claimant));
        claimContract.claim();
    }

    function testFuzz_RevertWhen_ClaimingAtAnyTimestampAfterDeadline(uint256 secondsAfterDeadline) public {
        secondsAfterDeadline = bound(secondsAfterDeadline, 1, 100 * 365 days);
        vm.warp(claimContract.claimDeadline() + secondsAfterDeadline);

        address claimant = makeAddr("fuzzedClaimant");
        vm.prank(claimant);
        vm.expectRevert(RlayClaim.ClaimPeriodOver.selector);
        claimContract.claim();
    }

    /// @dev Farklı CLAIM_AMOUNT ve havuz büyüklükleriyle deploy edilse bile: havuz tam
    ///      tükeninceye kadar her claim başarılı olur, sonraki claim PoolExhausted ile reddedilir.
    function testFuzz_PoolExhaustsExactlyAtFundedSlotCount(uint256 claimAmount, uint8 slotSeed) public {
        uint256 slots = bound(slotSeed, 1, 30);
        // Owner only ever holds RlayToken.MAX_SUPPLY - keep the funded pool within that.
        claimAmount = bound(claimAmount, 1e18, TOKEN_MAX_SUPPLY / slots);
        uint256 fundedPool = claimAmount * slots;

        RlayToken freshToken = new RlayToken(owner);
        RlayClaim freshClaim = new RlayClaim(address(freshToken), claimAmount, owner);

        vm.prank(owner);
        freshToken.transfer(address(freshClaim), fundedPool);

        for (uint256 i = 0; i < slots; i++) {
            address claimant = address(uint160(i + 1000));
            vm.prank(claimant);
            freshClaim.claim();
        }

        assertEq(freshClaim.remainingPool(), 0);

        address extraClaimant = address(uint160(9999));
        vm.prank(extraClaimant);
        vm.expectRevert(RlayClaim.PoolExhausted.selector);
        freshClaim.claim();
    }
}
