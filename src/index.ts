import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import productRoutes from './handlers/product'
import userRoutes from './handlers/user'
import orderRoutes from './handlers/order'

dotenv.config()

const PORT = process.env.PORT || 3000

// create an instance server
const app: Application = express()

// HTTP request logger middleware
app.use(morgan('short'))

app.use(bodyParser.json())

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World '
  })
})

productRoutes(app)
userRoutes(app)
orderRoutes(app)

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app
