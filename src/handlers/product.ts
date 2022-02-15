import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import verifyAuthToken from '../middleware/verifyAuthToken'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id))
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      pro_name: req.body.pro_name,
      price: req.body.price
    }
    const newProduct = await store.create(product)
    res.json(newProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const productRoutes = (app: express.Application) => {
  app.get('/product', index)
  app.get('/product/:id', show)
  app.post('/product', verifyAuthToken, create)
}

export default productRoutes
