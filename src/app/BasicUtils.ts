export function getAllPossibleCouponCombinations<
  T extends { blockedTypes: Array<string> }
>(coupons: Array<T>): Array<Array<T>> {
  const combinations: Array<Array<T>> = [[]]

  for (const coupon of coupons) {
    const newCombinations: Array<Array<T>> = []

    if (coupon.blockedTypes.length === 0) {
      newCombinations.push([coupon])
    }

    for (const combination of combinations) {
      const isBlocked = combination.some((c) =>
        c.blockedTypes.some((bt) => coupon.blockedTypes.includes(bt)),
      )

      if (!isBlocked) {
        newCombinations.push([...combination, coupon])
      }
    }

    combinations.push(...newCombinations)
  }

  return combinations
    .filter((combination) => {
      const noBlockedTypesCoupons = combination.filter(
        (coupon) => coupon.blockedTypes.length === 0,
      )
      return noBlockedTypesCoupons.length <= 1
    })
    .filter((combination) => combination.length > 0)
}
