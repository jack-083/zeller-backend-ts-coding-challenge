import Checkout from 'checkout'
import { pricingRules } from 'repositories/pricingRules'
import { ProductSKU } from 'types'

const checkout1 = new Checkout(pricingRules)
checkout1.scan(ProductSKU.Atv)
checkout1.scan(ProductSKU.Atv)
checkout1.scan(ProductSKU.Atv)
checkout1.scan(ProductSKU.Vga)

checkout1.total()

const checkout2 = new Checkout(pricingRules)
checkout2.scan(ProductSKU.Atv)
checkout2.scan(ProductSKU.Ipad)
checkout2.scan(ProductSKU.Ipad)
checkout2.scan(ProductSKU.Atv)
checkout2.scan(ProductSKU.Ipad)
checkout2.scan(ProductSKU.Ipad)
checkout2.scan(ProductSKU.Ipad)

checkout2.total()
