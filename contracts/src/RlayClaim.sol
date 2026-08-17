// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IERC20} from "openzeppelin-contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "openzeppelin-contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "openzeppelin-contracts/access/Ownable.sol";
import {Ownable2Step} from "openzeppelin-contracts/access/Ownable2Step.sol";
import {Pausable} from "openzeppelin-contracts/utils/Pausable.sol";

/// @title RlayClaim
/// @notice RLAY token'ının kamp katılımcılarına açık dağıtım kontratı.
/// @dev Dağıtım mantığı kasıtlı olarak RlayToken'dan ayrı tutuldu.
contract RlayClaim is Ownable2Step, Pausable {
    using SafeERC20 for IERC20;

    /// @notice Dağıtılan RLAY kontratı.
    IERC20 public immutable TOKEN;

    /// @notice Her cüzdanın alacağı sabit miktar.
    uint256 public immutable CLAIM_AMOUNT;

    /// @notice Claim penceresinin kapanış zamanı. claimDeadline() ile okunur.
    uint256 private immutable DEADLINE;

    /// @notice Cüzdan başına claim durumu. hasClaimed(address) ile okunur.
    mapping(address => bool) private _hasClaimed;

    /// @notice Şimdiye kadar yapılan toplam claim sayısı. claimedCount() ile okunur.
    uint256 private _claimedCount;

    /// @notice Bir cüzdan başarıyla claim ettiğinde yayılır.
    event Claimed(address indexed claimant, uint256 amount);

    error ZeroAddress();
    error AlreadyClaimed(address account);
    error ClaimPeriodOver();
    error ClaimPeriodNotOver();
    error PoolExhausted();
    error CannotRescueClaimToken();

    /// @param token_ Dağıtılacak RLAY kontratının adresi.
    /// @param claimAmount_ Her cüzdanın alacağı sabit miktar.
    /// @param owner_ Kontratın sahibi: pause/unpause/sweep/rescueToken yetkisi burada.
    constructor(address token_, uint256 claimAmount_, address owner_) Ownable(owner_) {
        if (token_ == address(0)) revert ZeroAddress();
        TOKEN = IERC20(token_);
        CLAIM_AMOUNT = claimAmount_;
        DEADLINE = block.timestamp + 7 days;
    }

    /// @notice Çağıran cüzdana, süre dolmamışsa, havuzda yer varsa ve daha önce
    ///         claim etmediyse CLAIM_AMOUNT kadar RLAY gönderir. Cüzdan başına tek seferlik.
    /// @dev CEI sırası: önce state güncellenir, sonra event yayılır, en son transfer yapılır.
    function claim() external whenNotPaused {
        if (block.timestamp > DEADLINE) revert ClaimPeriodOver();
        if (_hasClaimed[msg.sender]) revert AlreadyClaimed(msg.sender);
        if (TOKEN.balanceOf(address(this)) < CLAIM_AMOUNT) revert PoolExhausted();

        // Effects
        _hasClaimed[msg.sender] = true;
        _claimedCount += 1;

        // Event
        emit Claimed(msg.sender, CLAIM_AMOUNT);

        // Interaction
        TOKEN.safeTransfer(msg.sender, CLAIM_AMOUNT);
    }

    /// @notice Deadline sonrası kontratta kalan tüm RLAY bakiyesini owner'a çeker.
    /// @dev Deadline'dan önce çağrılırsa revert eder.
    function sweep() external onlyOwner {
        if (block.timestamp < DEADLINE) revert ClaimPeriodNotOver();

        uint256 remaining = TOKEN.balanceOf(address(this));
        TOKEN.safeTransfer(owner(), remaining);
    }

    /// @notice Yanlışlıkla bu kontrata gönderilen başka bir ERC20'yi owner'a kurtarır.
    /// @dev RLAY'in kendisi kurtarılamaz — sweep mekanizmasını delmemek için.
    function rescueToken(address token, address to) external onlyOwner {
        if (token == address(TOKEN)) revert CannotRescueClaimToken();

        uint256 amount = IERC20(token).balanceOf(address(this));
        IERC20(token).safeTransfer(to, amount);
    }

    /// @notice Acil durumda claim() fonksiyonunu durdurur.
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice claim() fonksiyonunu yeniden açar.
    function unpause() external onlyOwner {
        _unpause();
    }

    /// @notice Verilen cüzdan daha önce claim etti mi?
    function hasClaimed(address account) external view returns (bool) {
        return _hasClaimed[account];
    }

    /// @notice Kontratta kalan, henüz dağıtılmamış RLAY miktarı.
    function remainingPool() external view returns (uint256) {
        return TOKEN.balanceOf(address(this));
    }

    /// @notice Şimdiye kadar yapılan toplam claim sayısı.
    function claimedCount() external view returns (uint256) {
        return _claimedCount;
    }

    /// @notice Claim penceresinin kapanış zamanı (unix timestamp).
    function claimDeadline() external view returns (uint256) {
        return DEADLINE;
    }
}
