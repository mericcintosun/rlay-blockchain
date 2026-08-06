# Çözüm — ders bittikten sonra açılır

## Bug

`transferFrom` fonksiyonu allowance'ı kontrol ediyor ama **düşürmüyor**.

```solidity
if (allowance[from][msg.sender] < amount) revert InsufficientAllowance();
// ...
// allowance[from][msg.sender] -= amount;   <-- eksik satır
```

## Sonuç

Ayşe, Mehmet'e bir kerelik 30 token izni verdi.
Mehmet bu izni sınırsız kez kullanabilir — Ayşe'nin bakiyesi bitene kadar.

Gerçek dünyada bu, bir DEX'e verdiğin tek seferlik onayın cüzdanını boşaltması demek.

## Bug'ı yakalayan test

```solidity
function test_ApprovalCanBeUsedOnlyOnce() public {
    vm.prank(ayse);
    token.approve(mehmet, 30e18);

    vm.startPrank(mehmet);
    token.transferFrom(ayse, mehmet, 30e18);

    // İkinci kullanım revert etmeli. Etmiyor.
    vm.expectRevert(BuggyToken.InsufficientAllowance.selector);
    token.transferFrom(ayse, mehmet, 30e18);
    vm.stopPrank();
}
```

## Düzeltme

```solidity
allowance[from][msg.sender] -= amount;
```

Effects (bakiye ve allowance güncellemesi) event'ten ve dış çağrıdan önce yapılır.

## Asıl ders

Bu kontrat derleniyordu. İki test geçiyordu. Kod okunaklıydı.
Yine de bir cüzdanı boşaltabilirdi.

Testlerin geçmesi kodun doğru olduğunu değil, **henüz doğru testi yazmadığını** gösterir.

Ve bu yüzden ERC-20'yi sıfırdan yazmıyoruz. OpenZeppelin'in versiyonu yıllardır
milyonlarca gözle denetlendi.
