import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/user'
import verifyAuthToken from '../middleware/verifyAuthToken'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index()
    res.json(users)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id))
    res.json(user)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password
  }
  try {
    const newUser = await store.create(user)
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string)
    res.json(token)
  } catch (err) {
    res.status(400)
    const error = err as string
    res.json(error + user)
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', create)
}

export default userRoutes
