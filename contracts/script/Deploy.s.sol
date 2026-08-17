// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {SirinceDefteri} from "../src/SirinceDefteri.sol";
import {SirinceToken} from "../src/SirinceToken.sol";

/// @notice Usage:
///   forge script script/Deploy.s.sol --rpc-url base_sepolia --broadcast --verify
contract Deploy is Script {
    function run() external {
        vm.startBroadcast();

        SirinceDefteri defter = new SirinceDefteri();
        console.log("SirinceDefteri:", address(defter));

        SirinceToken token = new SirinceToken("Sirince", "SRC", 1_000_000e18);
        console.log("SirinceToken:", address(token));

        vm.stopBroadcast();
    }
}
