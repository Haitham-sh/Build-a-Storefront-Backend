import Client from '../database'

export type Product = {
  id?: number
  pro_name: string
  price: number
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  async create(b: Product): Promise<Product> {
    try {
      const sql = 'INSERT INTO products (pro_name, price) VALUES($1, $2) RETURNING *'
      const conn = await Client.connect()
      const result = await conn.query(sql, [b.pro_name, b.price])
      const product = result.rows[0]
      conn.release()
      return product
    } catch (err) {
      throw new Error(`Could not add new product ${b.pro_name}. Error: ${err}`)
    }
  }
}
