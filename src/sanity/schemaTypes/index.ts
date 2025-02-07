import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import customer from './customer'
import order from './order'
import user from './user'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,customer,order,user],
}
