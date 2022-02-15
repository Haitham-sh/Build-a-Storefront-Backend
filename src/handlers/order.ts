import express, { Request, Response } from 'express'
import { Order, OrderProduct, OrderStore } from '../models/order'
import verifyAuthToken from '../middleware/verifyAuthToken'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index()
    res.json(orders)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(parseInt(req.params.id))
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id
    }
    const newOrder = await store.create(order)
    res.json(newOrder)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const addProduct = async (_req: Request, res: Response) => {
  const order_id: number = parseInt(_req.params.id)
  const { product_id } = _req.body
  const quantity: number = parseInt(_req.body.quantity)
  const orderProduct: OrderProduct = { quantity, order_id, product_id }
  try {
    const newOrderProduct = await store.addProduct(orderProduct)
    res.json(newOrderProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const orderRoutes = (app: express.Application) => {
  app.get('/order', verifyAuthToken, index)
  app.get('/order/:id', verifyAuthToken, show)
  app.post('/order', verifyAuthToken, create)
  app.post('/orders/:id/products', verifyAuthToken, addProduct)
}

export default orderRoutes
