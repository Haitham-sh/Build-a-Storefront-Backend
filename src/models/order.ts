import Client from '../database'

export type Order = {
  id?: number
  status: string
  user_id: number
}

export type OrderProduct = {
  id?: number
  quantity: number
  order_id: number
  product_id: number
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
      const conn = await Client.connect()
      const result = await conn.query(sql, [o.status, o.user_id])
      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      throw new Error(`Could not add new order for user id: ${o.user_id}. Error: ${err}`)
    }
  }

  async addProduct(op: OrderProduct): Promise<OrderProduct> {
    // get order to see if it is active
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(ordersql, [op.order_id])
      const order = result.rows[0]
      if (order.status !== 'active') {
        throw new Error(
          `Could not add product ${op.product_id} to order ${op.order_id} because order status is ${order.status}`
        )
      }
      conn.release()
    } catch (err) {
      throw new Error(`${err}`)
    }
    try {
      const sql =
        'INSERT INTO orders_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      const conn = await Client.connect()
      const result = await conn.query(sql, [op.quantity, op.order_id, op.product_id])
      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      throw new Error(`Could not add product ${op.product_id} to order ${op.order_id}: ${err}`)
    }
  }
}
