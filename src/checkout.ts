import { PricingRule } from 'pricingRulesRegistry'
import { ProductSKU, ProductModel } from 'types'
import { products } from 'repositories/products'

export default class Checkout {
  pricingRules: PricingRule[]
  checkoutOrder: ProductSKU[] = []
  checkoutProducts: Partial<Record<ProductSKU, number>> = {}

  constructor(pricingRules: PricingRule[] = []) {
    this.pricingRules = pricingRules
  }

  private fetchProducts(): ProductModel[] {
    return products
  }

  scan(productSKU: ProductSKU) {
    const productCount = this.checkoutProducts[productSKU]

    this.checkoutOrder.push(productSKU)
    this.checkoutProducts = {
      ...this.checkoutProducts,
      ...{ [productSKU]: productCount ? productCount + 1 : 1 },
    }
  }

  total(): number {
    const products = this.fetchProducts()

    console.log(`SKUs Scanned: ${this.checkoutOrder.join(', ')}`)

    const total = Object.entries(this.checkoutProducts)
      .map(([productSKU, productCount]) => {
        const pricingRule = this.pricingRules.find(
          (pricingRule) => pricingRule.productSKU === productSKU
        )

        if (pricingRule) {
          return pricingRule.calculatePrice(products, productCount)
        }

        const product = products.find((product) => product.sku === productSKU)

        return product!.price * productCount
      })
      .reduce(
        (currentTotal, nextProductAmount) => currentTotal + nextProductAmount,
        0
      )

    console.log(
      `Total expected: $${Number.parseFloat((total / 100).toString()).toFixed(
        2
      )}`
    )

    return total
  }
}
