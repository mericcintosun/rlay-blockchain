// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {RlayToken} from "../src/RlayToken.sol";

contract RlayTokenTest is Test {
    bytes32 internal constant PERMIT_TYPEHASH =
        keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");

    RlayToken internal token;
    address internal owner = makeAddr("owner");
    address internal alice = makeAddr("alice");
    address internal bob = makeAddr("bob");

    uint256 internal constant MAX_SUPPLY = 21_000_000e18;

    function setUp() public {
        token = new RlayToken(owner);
    }

    // --- Constructor / supply ---

    function test_ConstructorMintsFullSupplyToInitialHolder() public view {
        assertEq(token.totalSupply(), MAX_SUPPLY);
        assertEq(token.balanceOf(owner), MAX_SUPPLY);
    }

    function test_RevertWhen_InitialHolderIsZeroAddress() public {
        vm.expectRevert(RlayToken.ZeroAddress.selector);
        new RlayToken(address(0));
    }

    // --- Metadata ---

    function test_Metadata() public view {
        assertEq(token.name(), "RlayHub");
        assertEq(token.symbol(), "RLAY");
        assertEq(token.decimals(), 18);
        assertEq(token.MAX_SUPPLY(), MAX_SUPPLY);
    }

    // --- Transfer / transferFrom ---

    function test_TransferUpdatesBalances() public {
        vm.prank(owner);
        token.transfer(alice, 100e18);

        assertEq(token.balanceOf(alice), 100e18);
        assertEq(token.balanceOf(owner), MAX_SUPPLY - 100e18);
    }

    function test_TransferFromUpdatesBalancesAndAllowance() public {
        vm.prank(owner);
        token.approve(alice, 100e18);

        vm.prank(alice);
        token.transferFrom(owner, bob, 60e18);

        assertEq(token.balanceOf(bob), 60e18);
        assertEq(token.balanceOf(owner), MAX_SUPPLY - 60e18);
        assertEq(token.allowance(owner, alice), 40e18);
    }

    function test_RevertWhen_TransferExceedsBalance() public {
        vm.prank(alice);
        vm.expectRevert();
        token.transfer(bob, 1);
    }

    function test_RevertWhen_TransferToZeroAddress() public {
        vm.prank(owner);
        vm.expectRevert();
        token.transfer(address(0), 1);
    }

    // --- Permit (EIP-2612) ---

    function test_PermitAllowsGaslessApproval() public {
        (address permitOwner, uint256 permitKey) = makeAddrAndKey("permitOwner");
        uint256 deadline = block.timestamp + 1 hours;
        uint256 nonce = token.nonces(permitOwner);

        bytes32 digest = _permitDigest(permitOwner, alice, 100e18, nonce, deadline);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(permitKey, digest);

        token.permit(permitOwner, alice, 100e18, deadline, v, r, s);

        assertEq(token.allowance(permitOwner, alice), 100e18);
        assertEq(token.nonces(permitOwner), nonce + 1);
    }

    function test_RevertWhen_PermitDeadlineExpired() public {
        (address permitOwner, uint256 permitKey) = makeAddrAndKey("permitOwnerExpired");
        uint256 deadline = block.timestamp;
        uint256 nonce = token.nonces(permitOwner);

        bytes32 digest = _permitDigest(permitOwner, alice, 100e18, nonce, deadline);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(permitKey, digest);

        vm.warp(deadline + 1);
        vm.expectRevert();
        token.permit(permitOwner, alice, 100e18, deadline, v, r, s);
    }

    function test_RevertWhen_PermitNonceReused() public {
        (address permitOwner, uint256 permitKey) = makeAddrAndKey("permitOwnerReuse");
        uint256 deadline = block.timestamp + 1 hours;
        uint256 nonce = token.nonces(permitOwner);

        bytes32 digest = _permitDigest(permitOwner, alice, 100e18, nonce, deadline);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(permitKey, digest);

        token.permit(permitOwner, alice, 100e18, deadline, v, r, s);

        // Same signature again: nonce already consumed, digest no longer matches.
        vm.expectRevert();
        token.permit(permitOwner, alice, 100e18, deadline, v, r, s);
    }

    function _permitDigest(address permitOwner, address spender, uint256 value, uint256 nonce, uint256 deadline)
        internal
        view
        returns (bytes32)
    {
        bytes32 structHash = keccak256(abi.encode(PERMIT_TYPEHASH, permitOwner, spender, value, nonce, deadline));
        return keccak256(abi.encodePacked("\x19\x01", token.DOMAIN_SEPARATOR(), structHash));
    }

    // --- "Sonradan mint edilemez" kanıtı ---

    /// @dev RlayToken'da mint(address,uint256) fonksiyonu hiç tanımlı değil.
    ///      Düşük seviye call ile selector'ü doğrudan çağırıp başarısız olduğunu kanıtlıyoruz.
    function test_RevertWhen_MintSelectorDoesNotExist() public {
        (bool success,) = address(token).call(abi.encodeWithSignature("mint(address,uint256)", alice, 1e18));
        assertFalse(success);
    }
}
