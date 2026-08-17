// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {RlayToken} from "../../src/RlayToken.sol";
import {RlayClaim} from "../../src/RlayClaim.sol";

/// @dev Invariant fuzzer'ın rastgele çağıracağı, sabit sayıda aktörle claim() deneyen sarmalayıcı.
///      Beklenen revert'leri (AlreadyClaimed, PoolExhausted) yutar ki fuzzer normal akışa devam etsin.
contract RlayClaimHandler is Test {
    RlayToken public token;
    RlayClaim public claimContract;

    address[] public actors;

    constructor(RlayToken token_, RlayClaim claimContract_) {
        token = token_;
        claimContract = claimContract_;

        for (uint256 i = 0; i < 30; i++) {
            actors.push(address(uint160(0x1000 + i)));
        }
    }

    function claimAsActor(uint256 actorSeed) external {
        address actor = actors[actorSeed % actors.length];
        vm.prank(actor);
        try claimContract.claim() {} catch {}
    }

    function actorsCount() external view returns (uint256) {
        return actors.length;
    }

    function actorAt(uint256 i) external view returns (address) {
        return actors[i];
    }
}

contract RlayInvariantTest is Test {
    RlayToken internal token;
    RlayClaim internal claimContract;
    RlayClaimHandler internal handler;

    address internal owner = makeAddr("owner");

    uint256 internal constant CLAIM_AMOUNT = 1_000_000e18;
    uint256 internal constant POOL = 20_000_000e18;
    uint256 internal constant MAX_SUPPLY = 21_000_000e18;

    function setUp() public {
        token = new RlayToken(owner);
        claimContract = new RlayClaim(address(token), CLAIM_AMOUNT, owner);

        vm.prank(owner);
        token.transfer(address(claimContract), POOL);

        handler = new RlayClaimHandler(token, claimContract);

        // Fuzzer sadece handler üzerinden çağrı yapsın; token/claim'e doğrudan
        // rastgele çağrı, kurulumu bozan anlamsız senaryolar üretir.
        targetContract(address(handler));
    }

    /// @notice Toplam arz hiçbir zaman değişmez, her zaman tam 21.000.000 RLAY'dir.
    function invariant_TotalSupplyNeverChanges() public view {
        assertEq(token.totalSupply(), MAX_SUPPLY);
    }

    /// @notice Bütün olası sahiplerin (owner + claim kontratı + aktörler) bakiye toplamı
    ///         her zaman toplam arza eşittir. Token, kayıp/yaratım olmadan sadece el değiştirir.
    function invariant_SumOfBalancesEqualsTotalSupply() public view {
        uint256 sum = token.balanceOf(owner) + token.balanceOf(address(claimContract));

        uint256 actorCount = handler.actorsCount();
        for (uint256 i = 0; i < actorCount; i++) {
            sum += token.balanceOf(handler.actorAt(i));
        }

        assertEq(sum, token.totalSupply());
    }

    /// @notice Claim kontratının bakiyesi her zaman "havuz - dağıtılan" ile tutarlıdır;
    ///         hiçbir zaman beklenenden az ya da negatife düşmez (uint256 zaten alt taşmayı reddeder,
    ///         burada asıl kanıtlanan muhasebenin her adımda tutarlı kalmasıdır).
    function invariant_ClaimContractBalanceMatchesRemainingSlots() public view {
        uint256 expected = POOL - (claimContract.claimedCount() * CLAIM_AMOUNT);

        assertEq(token.balanceOf(address(claimContract)), expected);
        assertEq(claimContract.remainingPool(), expected);
    }
}
