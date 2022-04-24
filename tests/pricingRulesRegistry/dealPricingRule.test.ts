import { ProductSKU } from 'types'
import { DealPricingRule } from 'pricingRulesRegistry'
import { mockProducts } from '../mockProducts'

describe(`
  DealPricingRule is initialzed with the rule: 
  3 for 2 deal on Apple TVs
  `, () => {
  let dealPricingRule: DealPricingRule

  beforeEach(() => {
    dealPricingRule = new DealPricingRule({
      productSKU: ProductSKU.Atv,
      requiredQty: 3,
      freeQtyPerDeal: 1,
    })
  })

  test(`
    Given the count of Apple TVs is three
    When calculatePrice is called
    Then the price is two Apple TVs
    `, () => {
    const price = dealPricingRule.calculatePrice(mockProducts, 3)

    expect(price).toEqual(10950 * 2)
  })

  test(`
    Given the count of Apple TVs is five
    When calculatePrice is called
    Then the price is four Apple TVs
  `, () => {
    const price = dealPricingRule.calculatePrice(mockProducts, 5)

    expect(price).toEqual(10950 * 4)
  })

  test(`
    Given the count of Apple TVs is six
    When calculatePrice is called
    Then the price is four Apple TVs
    `, () => {
    const price = dealPricingRule.calculatePrice(mockProducts, 6)

    expect(price).toEqual(10950 * 4)
  })
})
