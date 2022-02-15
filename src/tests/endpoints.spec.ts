import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../index'

// create a request object
const request = supertest(app)

describe('Test endpoint server response', () => {
  it('test hello world endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})

let token: string

describe('Test endpoints user response', () => {
  it('test user create endpoint', async () => {
    await request
      .post('/users')
      .send({
        first_name: 'smsm',
        last_name: 'pri',
        password: '987654321'
      })
      .expect(200)
      .then((res) => {
        token = res.body
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
        const userid = decoded.user.id
      })
  })

  it('test users index endpoint', async () => {
    const response = await request.get('/users').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test show user have id=1 endpoint', async () => {
    const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })
})

describe('Test endpoints product response', () => {
  it('test create product endpoint', async () => {
    const response = await request
      .post('/product')
      .send({
        pro_name: 'protest',
        price: 150
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test products index endpoint', async () => {
    const response = await request.get('/product')
    expect(response.status).toBe(200)
  })

  it('test show product have id=1 endpoint', async () => {
    const response = await request.get('/product/1')
    expect(response.status).toBe(200)
  })
})

describe('Test endpoints order response', () => {
  it('test order create endpoint', async () => {
    const response = await request
      .post('/order')
      .send({
        status: 'active',
        user_id: 1
      })
      .set('authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test orders index endpoint', async () => {
    const response = await request.get('/order').set('authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test show order have id=1 endpoint', async () => {
    const response = await request.get('/order/1').set('authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test add order products endpoint', async () => {
    const response = await request
      .post('/orders/1/products')
      .send({
        quantity: 10,
        product_id: 1
      })
      .set('authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })
})
