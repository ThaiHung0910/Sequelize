import express from 'express'
import restaurantRouter from './restaurantRouter.js'
import userRouter from './userRouter.js'


const rootRouter = express.Router()


rootRouter.use('/res', restaurantRouter)
rootRouter.use('/user', userRouter)

export default rootRouter

