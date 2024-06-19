import express from 'express'
import { addRateRestaurant, getRestaurantLike, getUserLike, like, unlike ,getRateRestaurant, getRateUser, getListUserLike, getListRestaurantLike, getListRateRestaurant, getListRateUser } from '../controllers/restaurantController.js';


const restaurantRouter = express.Router();


restaurantRouter.post('/like', like)
restaurantRouter.delete('/unlike', unlike)

restaurantRouter.get('/likes-user', getListUserLike)
restaurantRouter.get('/likes-user/:user_id', getUserLike)

restaurantRouter.get('/likes-res', getListRestaurantLike)
restaurantRouter.get('/likes-res/:res_id', getRestaurantLike)


restaurantRouter.post('/rate', addRateRestaurant)


restaurantRouter.get('/ratings-res', getListRateRestaurant)
restaurantRouter.get('/ratings-res/:res_id', getRateRestaurant)

restaurantRouter.get('/ratings-user', getListRateUser)
restaurantRouter.get('/ratings-user/:user_id', getRateUser)





export default restaurantRouter