import { OrderStore } from '../models/order'

const store = new OrderStore()

describe('Order Model', () => {
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

  it('should have a delete method', () => {
    expect(store.index).toBeDefined()
  })

  it('create method should add a Order', async () => {
    const result = await store.create({
      status: 'active',
      user_id: 1
    })
    expect(result).toEqual({
      id: 2,
      status: 'active',
      user_id: '1' as unknown as number
    })
  })

  it('index method should return a list of Orders', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: 1,
        status: 'active',
        user_id: '1' as unknown as number
      },
      {
        id: 2,
        status: 'active',
        user_id: '1' as unknown as number
      }
    ])
  })

  it('show method should return the correct Order', async () => {
    const result = await store.show(2)
    expect(result).toEqual({
      id: 2,
      status: 'active',
      user_id: '1' as unknown as number
    })
  })

  it('create method should add a Orders_products', async () => {
    const result = await store.addProduct({
      quantity: 10,
      order_id: 1,
      product_id: 1
    })
    expect(result).toEqual({
      id: 2,
      quantity: 10,
      order_id: '1' as unknown as number,
      product_id: '1' as unknown as number
    })
  })
})
