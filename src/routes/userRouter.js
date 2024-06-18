import express from 'express'
import { addOrder } from '../controllers/userController.js';





const userRouter = express.Router();


userRouter.post('/order', addOrder);




export default userRouter