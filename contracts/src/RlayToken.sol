// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC20} from "openzeppelin-contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "openzeppelin-contracts/token/ERC20/extensions/ERC20Permit.sol";

/// @title RlayToken
/// @notice RlayHub kampının resmi ERC-20 token'ı.
/// @dev Kasıtlı olarak saf tutuldu: mint() fonksiyonu yok. Tüm arz (MAX_SUPPLY)
///      deploy anında constructor içinde tek seferde basılır, ardından arzı
///      artıracak hiçbir yol yoktur. Dağıtım kuralları (claim mantığı) bu
///      kontrata gömülmez, ayrı RlayClaim kontratında yaşar.
contract RlayToken is ERC20, ERC20Permit {
    /// @notice Toplam arz tavanı: 21.000.000 RLAY (18 ondalık).
    uint256 public constant MAX_SUPPLY = 21_000_000 * 10 ** 18;

    /// @notice Sıfır adrese basım denemesi.
    error ZeroAddress();

    /// @param initialHolder Tüm arzın (MAX_SUPPLY) basılacağı adres.
    constructor(address initialHolder) ERC20("RlayHub", "RLAY") ERC20Permit("RlayHub") {
        if (initialHolder == address(0)) revert ZeroAddress();
        _mint(initialHolder, MAX_SUPPLY);
    }
}
