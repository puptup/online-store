export enum Colors {
  Red = 'red',
  White = 'white',
  Black = 'black',
}

export type Product = {
  id: number
  brand: string
  name: string
  memory: string
  rating: number
  color: Colors
  image: string
  year: number
  count: number
  price: number

  isShown: boolean
}
