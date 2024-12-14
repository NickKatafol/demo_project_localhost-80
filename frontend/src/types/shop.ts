export interface Product {
  "shelf": string,
  "_id": string,
  "name": string,
  "description": string,
  "price": number,
  "img": string,
  "starsCount": number,
  "manufactureNotes": ManufactureNotes,
  "specification": Specification,
  "additionalInformation": AdditionalInformation
}

interface ManufactureNotes {
  "sectionName": string,
  "_id": string,
  "country": string,
  "release": string,
  "warranty": string,
}

interface Specification {
  "sectionName": string,
  "_id": string,
  "color": string,
  "mass"?: string,
  "processor"?: string,
  "screenSize"?: string,
}

interface AdditionalInformation {
  "sectionName": string,
  "_id": string,
  "delay": string
}

export interface Shelf {
  shelf: string,
  shelfName: string
}

export interface ProductsPoolForShelf {
  shelf: string,
  products: Product[]
}

export interface ShopState {
  laptops: Product[],
  mouses: Product[],
  accessories: Product[],
}

