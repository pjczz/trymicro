export interface catagoryDataType {
  categories: Array<catagoryType>
  products?: Array<productType>
}
export type catagoryType = {
  categoryId: string
  name: string | productType
  parentId: string
  products: Array<string>
  productsList: Array<productType>
}
export type productType = {
  productId: string
  name: string
  link: string
  pinyin: string
  keywords: Array<string>
  tag: string
  docId: string
  pipId: string
  inNav: boolean
}
//
