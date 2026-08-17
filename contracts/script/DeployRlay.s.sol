// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {RlayToken} from "../src/RlayToken.sol";
import {RlayClaim} from "../src/RlayClaim.sol";

/// @notice RLAY token'ını ve dağıtım kontratını Base Sepolia'ya deploy eder.
/// @dev Deploy eden cüzdan (PRIVATE_KEY, gaz için sadece geçici/burner bir cüzdan
///      olabilir) ile nihai sahip (REAL_OWNER) kasıtlı olarak ayrı tutuldu:
///        1. RlayToken deploy - tüm arz (21M) geçici olarak deployer'a basılır.
///        2. RlayClaim deploy - deployer geçici owner.
///        3. Claim kontratına 20M RLAY transfer edilir (havuz).
///        4. Kalan 1M RLAY REAL_OWNER'a transfer edilir.
///        5. RlayClaim'in sahipliği REAL_OWNER'a devredilmeye başlanır
///           (Ownable2Step - REAL_OWNER'ın kendi cüzdanından acceptOwnership()
///           çağırması gerekir, bu adım script içinde tamamlanamaz).
///
/// Usage:
///   forge script script/DeployRlay.s.sol --rpc-url base_sepolia --private-key $PRIVATE_KEY --broadcast --verify
contract DeployRlay is Script {
    /// @notice Dağıtımın ve kontrat sahipliğinin nihai olarak devredileceği adres.
    address public constant REAL_OWNER = 0x5033f39F7E33Ce520a155dC8305e89fC925dad58;

    uint256 public constant CLAIM_AMOUNT = 1_000_000e18;
    uint256 public constant CLAIM_POOL = 20_000_000e18;
    uint256 public constant MAX_SUPPLY = 21_000_000e18;
    uint256 public constant TREASURY_REMAINDER = MAX_SUPPLY - CLAIM_POOL;

    function run() external returns (RlayToken token, RlayClaim claimContract) {
        address deployer = vm.addr(vm.envUint("PRIVATE_KEY"));
        vm.startBroadcast(deployer);

        token = new RlayToken(deployer);
        console.log("RlayToken:", address(token));

        claimContract = new RlayClaim(address(token), CLAIM_AMOUNT, deployer);
        console.log("RlayClaim:", address(claimContract));

        token.transfer(address(claimContract), CLAIM_POOL);
        token.transfer(REAL_OWNER, TREASURY_REMAINDER);
        claimContract.transferOwnership(REAL_OWNER);

        vm.stopBroadcast();

        require(token.balanceOf(address(claimContract)) == CLAIM_POOL, "claim pool balance mismatch");
        require(token.balanceOf(REAL_OWNER) == TREASURY_REMAINDER, "real owner balance mismatch");
        require(token.balanceOf(deployer) == 0, "deployer should hold no RLAY after handoff");
        require(claimContract.pendingOwner() == REAL_OWNER, "ownership transfer not started");

        console.log("Dagitim dogrulandi: claim kontrati 20.000.000 RLAY, REAL_OWNER 1.000.000 RLAY");
        console.log(
            "REAL_OWNER'in kontrolu tamamlamasi icin kendi cuzdanindan RlayClaim.acceptOwnership() cagirmasi gerekiyor."
        );
    }
}
