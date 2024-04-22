## Coupon Shuffle

We aim to identify every conceivable combination of coupons, but there's a catch: each coupon is associated with multiple types (array of strings, termed `blockedTypes`) and if a coupon contains a specific type, no other coupon with the same type can be included in the combination.

Your task is to compile a complete list of distinct possible combinations from a given list of coupons, ensuring there's no interference between them. Moreover, when one combination is a subset of another, prioritize the superset (the longest combination). For instance, if `[A, B]` is a combination, it would exclude `[A]` or `[B]` as individual entities.

### Example

A short example showing how coupons would be combined

**Coupons**

- Long term 5% (blocked types: `longterm` and `discount`)
- Long term 10% (blocked types: `longterm` and `discount`)
- Long term 15% (blocked types: `longterm` and `discount`)
- WinterPromo (blocked types: `winter`)
- Winterspecial 30d (blocked types: `longterm` and `winter`)
- Winterspecial 60d (blocked types: `longterm` and `winter`)
- Gift voucher (no blocked types)

**Possible Combinations**

- Long term 5% & WinterPromo & gift voucher
- Long term 10% & WinterPromo & gift voucher
- Long term 15% & WinterPromo & gift voucher
- Winterspecial 30d & gift voucher
- Winterspecial 60d & gift voucher