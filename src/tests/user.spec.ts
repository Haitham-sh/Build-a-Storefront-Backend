import { UserStore } from '../models/user'

const store = new UserStore()

describe('User Model', () => {
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

  it('create method should add a user', async () => {
    const result = await store.create({
      first_name: 'lolo',
      last_name: 'pri',
      password: '123456789'
    })
    expect(result.id).toEqual(2)
    expect(result.first_name).toEqual('lolo')
    expect(result.last_name).toEqual('pri')
    expect(result.password).toBeDefined()
  })

  it('index method should return a list of users', async () => {
    const result = await store.index()
    expect(result).toHaveSize(2)
  })

  it('show method should return the correct user', async () => {
    const result = await store.show(2)
    expect(result.id).toEqual(2)
    expect(result.first_name).toEqual('lolo')
    expect(result.last_name).toEqual('pri')
    expect(result.password).toBeDefined()
  })
})
