import { ProductSKU } from 'types'
import {
  DealPricingRule,
  DiscountPricingRule,
  PricingRule,
} from 'pricingRulesRegistry'

export const pricingRules: PricingRule[] = [
  new DealPricingRule({
    productSKU: ProductSKU.Atv,
    requiredQty: 3,
    freeQtyPerDeal: 1,
  }),
  new DiscountPricingRule({
    productSKU: ProductSKU.Ipad,
    requiredQty: 4,
    discountPrice: 49999,
  }),
]
