import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
    console.log(decoded)
    const userid = decoded.user.id
    console.log(userid)
    next()
  } catch (error) {
    res.status(401)
  }
}

export default verifyAuthToken
