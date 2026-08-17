// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {ERC20} from "openzeppelin-contracts/token/ERC20/ERC20.sol";
import {Pausable} from "openzeppelin-contracts/utils/Pausable.sol";
import {RlayToken} from "../src/RlayToken.sol";
import {RlayClaim} from "../src/RlayClaim.sol";

/// @dev rescueToken() testleri için RLAY olmayan, "yanlışlıkla gönderilmiş" bir token taklidi.
contract MockERC20 is ERC20 {
    constructor() ERC20("Mock", "MOCK") {
        _mint(msg.sender, 1_000e18);
    }
}

contract RlayClaimTest is Test {
    RlayToken internal token;
    RlayClaim internal claimContract;

    address internal owner = makeAddr("owner");

    uint256 internal constant CLAIM_AMOUNT = 1_000_000e18;
    uint256 internal constant POOL = 20_000_000e18; // 20 slot

    event Claimed(address indexed claimant, uint256 amount);

    function setUp() public {
        token = new RlayToken(owner);
        claimContract = new RlayClaim(address(token), CLAIM_AMOUNT, owner);

        vm.prank(owner);
        token.transfer(address(claimContract), POOL);
    }

    // --- Constructor ---

    function test_RevertWhen_TokenIsZeroAddress() public {
        vm.expectRevert(RlayClaim.ZeroAddress.selector);
        new RlayClaim(address(0), CLAIM_AMOUNT, owner);
    }

    function test_RevertWhen_OwnerIsZeroAddress() public {
        vm.expectRevert();
        new RlayClaim(address(token), CLAIM_AMOUNT, address(0));
    }

    // --- claim() ---

    function test_ClaimTransfersExactAmount() public {
        address claimant = makeAddr("claimant");

        vm.prank(claimant);
        claimContract.claim();

        assertEq(token.balanceOf(claimant), CLAIM_AMOUNT);
        assertTrue(claimContract.hasClaimed(claimant));
        assertEq(claimContract.claimedCount(), 1);
    }

    function test_ClaimedEventEmitsCorrectParams() public {
        address claimant = makeAddr("claimant");

        vm.expectEmit(true, false, false, true, address(claimContract));
        emit Claimed(claimant, CLAIM_AMOUNT);

        vm.prank(claimant);
        claimContract.claim();
    }

    function test_RevertWhen_ClaimedTwice() public {
        address claimant = makeAddr("claimant");

        vm.prank(claimant);
        claimContract.claim();

        vm.prank(claimant);
        vm.expectRevert(abi.encodeWithSelector(RlayClaim.AlreadyClaimed.selector, claimant));
        claimContract.claim();
    }

    function test_RevertWhen_ClaimAfterDeadline() public {
        address claimant = makeAddr("claimant");

        vm.warp(claimContract.claimDeadline() + 1);

        vm.prank(claimant);
        vm.expectRevert(RlayClaim.ClaimPeriodOver.selector);
        claimContract.claim();
    }

    function test_RevertWhen_PoolExhausted() public {
        for (uint160 i = 1; i <= 20; i++) {
            address claimant = address(i);
            vm.prank(claimant);
            claimContract.claim();
        }

        assertEq(claimContract.remainingPool(), 0);

        address lateClaimant = address(21);
        vm.prank(lateClaimant);
        vm.expectRevert(RlayClaim.PoolExhausted.selector);
        claimContract.claim();
    }

    function test_RevertWhen_ClaimWhilePaused() public {
        vm.prank(owner);
        claimContract.pause();

        address claimant = makeAddr("claimant");
        vm.prank(claimant);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        claimContract.claim();
    }

    // --- pause() / unpause() ---

    function test_OwnerCanPauseAndUnpause() public {
        vm.prank(owner);
        claimContract.pause();
        assertTrue(claimContract.paused());

        vm.prank(owner);
        claimContract.unpause();
        assertFalse(claimContract.paused());

        address claimant = makeAddr("claimant");
        vm.prank(claimant);
        claimContract.claim();
        assertEq(token.balanceOf(claimant), CLAIM_AMOUNT);
    }

    function test_RevertWhen_NonOwnerPauses() public {
        vm.prank(makeAddr("stranger"));
        vm.expectRevert();
        claimContract.pause();
    }

    function test_RevertWhen_NonOwnerUnpauses() public {
        vm.prank(owner);
        claimContract.pause();

        vm.prank(makeAddr("stranger"));
        vm.expectRevert();
        claimContract.unpause();
    }

    // --- sweep() ---

    function test_RevertWhen_SweepCalledBeforeDeadline() public {
        vm.prank(owner);
        vm.expectRevert(RlayClaim.ClaimPeriodNotOver.selector);
        claimContract.sweep();
    }

    function test_RevertWhen_SweepCalledByNonOwner() public {
        vm.warp(claimContract.claimDeadline() + 1);

        vm.prank(makeAddr("stranger"));
        vm.expectRevert();
        claimContract.sweep();
    }

    function test_SweepAfterDeadlineTransfersRemainingToOwner() public {
        address claimant = makeAddr("claimant");
        vm.prank(claimant);
        claimContract.claim();

        uint256 remaining = claimContract.remainingPool();
        uint256 ownerBalanceBefore = token.balanceOf(owner);

        vm.warp(claimContract.claimDeadline() + 1);
        vm.prank(owner);
        claimContract.sweep();

        assertEq(claimContract.remainingPool(), 0);
        assertEq(token.balanceOf(owner), ownerBalanceBefore + remaining);
    }

    // --- rescueToken() ---

    function test_RescueTokenSendsForeignTokenToRecipient() public {
        MockERC20 foreign = new MockERC20();
        foreign.transfer(address(claimContract), 500e18);

        vm.prank(owner);
        claimContract.rescueToken(address(foreign), owner);

        assertEq(foreign.balanceOf(owner), 500e18);
    }

    function test_RevertWhen_RescuingClaimToken() public {
        vm.prank(owner);
        vm.expectRevert(RlayClaim.CannotRescueClaimToken.selector);
        claimContract.rescueToken(address(token), owner);
    }

    function test_RevertWhen_RescueCalledByNonOwner() public {
        MockERC20 foreign = new MockERC20();
        foreign.transfer(address(claimContract), 500e18);

        vm.prank(makeAddr("stranger"));
        vm.expectRevert();
        claimContract.rescueToken(address(foreign), owner);
    }

    // --- Ownable2Step ---

    function test_OldOwnerStaysAuthorizedUntilAccepted() public {
        address newOwner = makeAddr("newOwner");

        vm.prank(owner);
        claimContract.transferOwnership(newOwner);

        assertEq(claimContract.owner(), owner);

        vm.prank(owner);
        claimContract.pause();
        assertTrue(claimContract.paused());
    }

    function test_NewOwnerGainsControlOnlyAfterAccepting() public {
        address newOwner = makeAddr("newOwner");

        vm.prank(owner);
        claimContract.transferOwnership(newOwner);

        vm.prank(newOwner);
        claimContract.acceptOwnership();

        assertEq(claimContract.owner(), newOwner);

        vm.prank(owner);
        vm.expectRevert();
        claimContract.pause();

        vm.prank(newOwner);
        claimContract.pause();
        assertTrue(claimContract.paused());
    }
}
