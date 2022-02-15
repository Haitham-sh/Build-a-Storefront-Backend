import bcrypt from 'bcrypt'
import Client from '../database'

export type User = {
  id?: number
  first_name: string
  last_name: string
  password: string
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect()
      const sql =
        'INSERT INTO users (first_name,last_name, password) VALUES($1, $2, $3) RETURNING *'
      const hash = bcrypt.hashSync(u.password + process.env.pepper, Number(process.env.saltRounds))
      const result = await conn.query(sql, [u.first_name, u.last_name, hash])
      const user = result.rows[0]
      conn.release()
      return user
    } catch (err) {
      throw new Error(`unable create user (${u.first_name} ${u.last_name}): ${err}`)
    }
  }
}
