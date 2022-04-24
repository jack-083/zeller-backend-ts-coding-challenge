import { ProductSKU } from 'types'
import { DiscountPricingRule } from 'pricingRulesRegistry'
import { mockProducts } from '../mockProducts'

describe(`
  DiscountPricingRule is initialzed with the rule: 
  $499.99 each on iPad, if buys more than 4
  `, () => {
  let discountPricingRule: DiscountPricingRule

  beforeEach(() => {
    discountPricingRule = new DiscountPricingRule({
      productSKU: ProductSKU.Ipad,
      discountPrice: 49999,
      requiredQty: 5,
    })
  })

  test(`
    Given the count of iPad is 4
    When calculatePrice is called
    Then no iPad discount is applied to total
    `, () => {
    const price = discountPricingRule.calculatePrice(mockProducts, 4)

    expect(price).toEqual(54999 * 4)
  })

  test(`
    Given the count of iPad is 5
    When calculatePrice is called
    Then iPad discount is applied to total
    `, () => {
    const price = discountPricingRule.calculatePrice(mockProducts, 5)

    expect(price).toEqual(49999 * 5)
  })
})
