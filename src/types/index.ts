enum ProductSKU {
  Ipad = 'ipd',
  Mbp = 'mbp',
  Atv = 'atv',
  Vga = 'vga',
}

enum ProductName {
  Ipad = 'Super iPad',
  Mbp = 'Macbook Pro',
  Atv = 'Apple TV',
  Vga = 'VGA adapter',
}

interface ProductModel {
  sku: ProductSKU
  name: ProductName
  price: number
}

export { ProductSKU, ProductName, ProductModel }
