import { ProductStore } from '../models/product'

const store = new ProductStore()

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a update method', () => {
    expect(store.index).toBeDefined()
  })

  it('create method should add a product', async () => {
    const result = await store.create({
      pro_name: 'thing',
      price: 100
    })
    expect(result).toEqual({
      id: 2,
      pro_name: 'thing',
      price: 100
    })
  })

  it('index method should return a list of products', async () => {
    const result = await store.index()
    expect(result[1]).toEqual({
      id: 2,
      pro_name: 'thing',
      price: 100
    })
  })

  it('show method should return the correct product', async () => {
    const result = await store.show(2)
    expect(result).toEqual({
      id: 2,
      pro_name: 'thing',
      price: 100
    })
  })
})
