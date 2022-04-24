import { ProductModel, ProductSKU } from 'types'
import PricingRule from './pricingRule'

interface DealPricingRuleProps {
  productSKU: ProductSKU
  requiredQty: number
  freeQtyPerDeal: number
}

export default class DealPricingRule extends PricingRule {
  private requiredQty: number
  private freeQtyPerDeal: number

  constructor({
    productSKU,
    requiredQty,
    freeQtyPerDeal = 1,
  }: DealPricingRuleProps) {
    super(productSKU)
    this.requiredQty = requiredQty
    this.freeQtyPerDeal = freeQtyPerDeal
  }

  calculatePrice(products: ProductModel[], productCount: number): number {
    const product = products.find((product) => product.sku === this.productSKU)

    if (!product) {
      throw new Error('No product found for this pricing rule.')
    }

    const isQualified = productCount >= this.requiredQty

    if (isQualified) {
      const freeQty =
        Math.floor(productCount / this.requiredQty) * this.freeQtyPerDeal

      return (productCount - freeQty) * product.price
    }

    return productCount * product.price
  }
}
