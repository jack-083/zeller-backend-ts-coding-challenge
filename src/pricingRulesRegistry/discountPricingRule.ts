import { ProductModel, ProductSKU } from 'types'
import PricingRuleCreator from './pricingRule'

interface DiscountPricingRuleProps {
  productSKU: ProductSKU
  requiredQty: number
  discountPrice: number
}

export default class DiscountPricingRule extends PricingRuleCreator {
  private discountPrice: number
  private requiredQty: number

  constructor({
    productSKU,
    discountPrice,
    requiredQty,
  }: DiscountPricingRuleProps) {
    super(productSKU)
    this.discountPrice = discountPrice
    this.requiredQty = requiredQty
  }

  calculatePrice(products: ProductModel[], productCount: number): number {
    const product = products.find((product) => product.sku === this.productSKU)

    if (!product) {
      throw new Error('No product found for this pricing rule.')
    }

    const isQualified = productCount >= this.requiredQty

    if (isQualified) {
      return productCount * this.discountPrice
    }

    return productCount * product.price
  }
}
