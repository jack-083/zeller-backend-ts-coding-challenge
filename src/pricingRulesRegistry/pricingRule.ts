import { ProductSKU, ProductModel } from 'types'

export default abstract class PricingRule {
  productSKU: ProductSKU

  constructor(productSKU: ProductSKU) {
    this.productSKU = productSKU
  }

  abstract calculatePrice(
    products: ProductModel[],
    productCount: number
  ): number
}
