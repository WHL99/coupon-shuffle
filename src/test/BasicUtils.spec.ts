import { getAllPossibleCouponCombinations } from '../app/BasicUtils'

describe('basics', () => {
  it(`blocks blocked types`, () => {
    const coupon1 = { blockedTypes: ['1'] }
    const coupon2 = { blockedTypes: ['1'] }
    const ret = getAllPossibleCouponCombinations([coupon1, coupon2])
    expect(ret).toHaveLength(2)
    expect(ret).toContainEqual([coupon1])
    expect(ret).toContainEqual([coupon2])
  })
  it(`combines coupons`, () => {
    const coupon1 = { blockedTypes: [] }
    const coupon2 = { blockedTypes: [] }
    const ret = getAllPossibleCouponCombinations([coupon1, coupon2])
    expect(ret).toHaveLength(1)
    expect(ret).toContainEqual(expect.arrayContaining([coupon1, coupon2]))
  })
  it(`blocks multiple types`, () => {
    const coupon1 = { blockedTypes: ['1', '2'] }
    const coupon2 = { blockedTypes: ['1'] }
    const coupon3 = { blockedTypes: ['2'] }
    const ret = getAllPossibleCouponCombinations([coupon1, coupon2, coupon3])
    expect(ret).toHaveLength(2)
    expect(ret).toContainEqual([coupon1])
    expect(ret).toContainEqual(expect.arrayContaining([coupon2, coupon3]))
  })
})

describe('complex', () => {
  it(`l, r      l, r      l, r       f      f, l        f, l         
    longterm1 longterm2 longterm3 coupon earlybird earlybird2, test
    
    * longterm1, coupon, test
    * longterm2, coupon, test
    * longterm3, coupon, test
    * earlybird1, test
    * earlybird2, test`, () => {
    const coupons = [
      { blockedTypes: ['l', 'r'] },
      { blockedTypes: ['l', 'r'] },
      { blockedTypes: ['l', 'r'] },
      { blockedTypes: ['f'] },
      { blockedTypes: ['l', 'f'] },
      { blockedTypes: ['l', 'f'] },
      { blockedTypes: [] },
    ]
    const ret = getAllPossibleCouponCombinations(coupons)
    expect(ret).toHaveLength(5)
    const groups = [
      [0, 3, 6],
      [1, 3, 6],
      [2, 3, 6],
      [4, 6],
      [5, 6],
    ]
    for (const group of groups) {
      const groupCoupons = group.map((idx) => coupons[idx])
      expect(ret).toContainEqual(expect.arrayContaining(groupCoupons))
    }
  })
  it(`l, r      l, r      l, r       f      f, l        f, l       r  
    longterm1 longterm2 longterm3 coupon earlybird1 earlybird2, test
    
    * longterm1, coupon
    * longterm2, coupon
    * longterm3, coupon
    * coupon, test
    * earlybird1, test
    * earlybird2, test`, () => {
    const coupons = [
      { blockedTypes: ['l', 'r'] },
      { blockedTypes: ['l', 'r'] },
      { blockedTypes: ['l', 'r'] },
      { blockedTypes: ['f'] },
      { blockedTypes: ['l', 'f'] },
      { blockedTypes: ['l', 'f'] },
      { blockedTypes: ['r'] },
    ]
    const ret = getAllPossibleCouponCombinations(coupons)
    expect(ret).toHaveLength(6)
    const groups = [
      [0, 3],
      [1, 3],
      [2, 3],
      [3, 6],
      [4, 6],
      [5, 6],
    ]
    for (const group of groups) {
      const groupCoupons = group.map((idx) => coupons[idx])
      expect(ret).toContainEqual(expect.arrayContaining(groupCoupons))
    }
  })
  it(`l, r      l, r      l, r       f      f, l        f, l       f  
    longterm1 longterm2 longterm3 coupon earlybird1 earlybird2, test
    
    * longterm1, coupon
    * longterm1, test
    * longterm2, coupon
    * longterm2, test
    * longterm3, coupon
    * longterm3, test
    * earlybird1
    * earlybird2`, () => {
    const coupons = [
      { blockedTypes: ['l', 'r'] },
      { blockedTypes: ['l', 'r'] },
      { blockedTypes: ['l', 'r'] },
      { blockedTypes: ['f'] },
      { blockedTypes: ['l', 'f'] },
      { blockedTypes: ['l', 'f'] },
      { blockedTypes: ['f'] },
    ]
    const ret = getAllPossibleCouponCombinations(coupons)
    expect(ret).toHaveLength(8)
    const groups = [[0, 3], [0, 6], [1, 3], [1, 6], [2, 3], [2, 6], [4], [5]]
    for (const group of groups) {
      const groupCoupons = group.map((idx) => coupons[idx])
      expect(ret).toContainEqual(expect.arrayContaining(groupCoupons))
    }
  })
  it(`l, r      l, r      l, r       f      f       f, l        f, l         
    longterm1 longterm2 longterm3 coupon coupon2 earlybird1 earlybird2, test
    
    * longterm1, coupon, test
    * longterm1, coupon2, test
    * longterm2, coupon, test
    * longterm2, coupon2, test
    * longterm3, coupon, test
    * longterm3, coupon2, test
    * earlybird1, test
    * earlybird2, test`, () => {
    const coupons = [
      { blockedTypes: ['l', 'r'] },
      { blockedTypes: ['l', 'r'] },
      { blockedTypes: ['l', 'r'] },
      { blockedTypes: ['f'] },
      { blockedTypes: ['f'] },
      { blockedTypes: ['l', 'f'] },
      { blockedTypes: ['l', 'f'] },
      { blockedTypes: [] },
    ]
    const ret = getAllPossibleCouponCombinations(coupons)
    expect(ret).toHaveLength(8)
    const groups = [
      [0, 3, 7],
      [0, 4, 7],
      [1, 3, 7],
      [1, 4, 7],
      [2, 3, 7],
      [2, 4, 7],
      [5, 7],
      [6, 7],
    ]
    for (const group of groups) {
      const groupCoupons = group.map((idx) => coupons[idx])
      expect(ret).toContainEqual(expect.arrayContaining(groupCoupons))
    }
  })
})
