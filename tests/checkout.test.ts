import Checkout from 'checkout'
import { mockProducts } from './mockProducts'
import { ProductSKU } from 'types'
import { DealPricingRule, DiscountPricingRule } from 'pricingRulesRegistry'

describe('Checkout is initialzed with no pricing rule', () => {
  let checkout: Checkout

  beforeEach(() => {
    checkout = new Checkout()

    jest
      // private methods are compiled to normal JavaScript prototype methods
      // so any type is used to let the spy creation pass through the TypeScript type checking.
      .spyOn(checkout as any, 'fetchProducts')
      .mockImplementation(() => mockProducts)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test(`
    Given no item is scanned
    When total is called
    Then total should be 0
    `, () => {
    const total = checkout.total()

    expect(total).toEqual(0)
  })

  test(`
    Given an Ipad is scanned
    When total is called
    Then total should be calculate correctly
    `, () => {
    checkout.scan(ProductSKU.Ipad)

    const total = checkout.total()

    expect(total).toEqual(54999)
  })

  test(`
    Given multiple items are scanned
    When total is called
    Then total should be calculate correctly
    `, () => {
    checkout.scan(ProductSKU.Mbp)
    checkout.scan(ProductSKU.Mbp)
    checkout.scan(ProductSKU.Ipad)
    checkout.scan(ProductSKU.Atv)

    const total = checkout.total()

    expect(total).toEqual(345947)
  })
})

describe(`
  Checkout is initialzed with pricing rules: 
  1. 3 for 2 deal on Apple TVs,
  2. Bulk discounted on iPad when buy more than 4
  `, () => {
  let checkout: Checkout

  beforeEach(() => {
    checkout = new Checkout([
      new DealPricingRule({
        productSKU: ProductSKU.Atv,
        requiredQty: 3,
        freeQtyPerDeal: 1,
      }),
      new DiscountPricingRule({
        productSKU: ProductSKU.Ipad,
        requiredQty: 5,
        discountPrice: 49999,
      }),
    ])

    jest
      .spyOn(checkout as any, 'fetchProducts')
      .mockImplementation(() => mockProducts)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test(`
    Given three Apple Tvs are scanned
    When total is called
    Then total is two Apple TV's price
    `, () => {
    checkout.scan(ProductSKU.Atv)
    checkout.scan(ProductSKU.Atv)
    checkout.scan(ProductSKU.Atv)

    const total = checkout.total()

    expect(total).toEqual(10950 * 2)
  })

  test(`
    Given four Apple Tvs are scanned
    When total is called
    Then total is three Apple TV's price
    `, () => {
    checkout.scan(ProductSKU.Atv)
    checkout.scan(ProductSKU.Atv)
    checkout.scan(ProductSKU.Atv)
    checkout.scan(ProductSKU.Atv)

    const total = checkout.total()

    expect(total).toEqual(10950 * 3)
  })

  test(`
    Given five iPads are scanned
    When total is called
    Then discounted price is applied to total
    `, () => {
    checkout.scan(ProductSKU.Ipad)
    checkout.scan(ProductSKU.Ipad)
    checkout.scan(ProductSKU.Ipad)
    checkout.scan(ProductSKU.Ipad)
    checkout.scan(ProductSKU.Ipad)

    const total = checkout.total()

    expect(total).toEqual(49999 * 5)
  })

  test(`
    Given four iPads are scanned
    When total is called
    Then no discounted price on iPad is applied to total
    `, () => {
    checkout.scan(ProductSKU.Ipad)
    checkout.scan(ProductSKU.Ipad)
    checkout.scan(ProductSKU.Ipad)
    checkout.scan(ProductSKU.Ipad)

    const total = checkout.total()

    expect(total).toEqual(54999 * 4)
  })
})
