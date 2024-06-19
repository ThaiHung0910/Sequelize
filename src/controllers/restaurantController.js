import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import { getLike, getLikes, getRate, getRates, processLikes, processRates } from "../utils/index.js";

let model = initModels(sequelize);

const toggleLike = async (req, res) => {
  const { user_id, res_id } = req.body;
  try {
    const like = await model.like_res.findOne({ where: { user_id, res_id } });
    if (like) {
      await like.destroy();
      responseSend(res, "", "Unliked the restaurant!", 200);
    } else {
      await model.like_res.create({ user_id, res_id, date_like: new Date() });
      responseSend(res, "", "Liked the restaurant!", 200);
    }
  } catch (error) {
    responseSend(res, "", error.message, 500);
  }
};

const getListUserLike = async (req, res) => {
  try {
    const likes = await getLikes();

    console.log(JSON.stringify(likes, null, 2));

    let result = processLikes(likes, 'user')
    responseSend(res, result, "Successfully!", 200);
  } catch (error) {
    responseSend(res, "", error.message, 500);
  }
};

const getUserLike = async (req, res) => {
  const { user_id } = req.params;
  try {
    const likes = await getLikes({ user_id });

    console.log(JSON.stringify(likes, null, 2));

    let result = getLike(likes, "user")
    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    responseSend(res, "", err.message, 500);
  }
};

const getListRestaurantLike = async (req, res) => {
  try {
    let likes = await getLikes();

    let result = processLikes(likes, 'restaurant')

    responseSend(res, result, "Successfully", 200);
  } catch (err) {
    responseSend(res, "", err.message, 500);
  }
};

const getRestaurantLike = async (req, res) => {
  const { res_id } = req.params;

  try {
    const likes = await getLikes({ res_id });

    let result = getLike(likes, "restaurant")
    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    responseSend(res, "", err.message, 500);
  }
};

const addRateRestaurant = async (req, res) => {
  const { user_id, res_id, amount } = req.body;
  try {
    await model.rate_res.create({
      user_id,
      res_id,
      amount,
      date_rate: new Date(),
    });

    responseSend(res, "", "Successfully created rating!", 200);
  } catch (error) {
    responseSend(res, "", "Error occurred while processing the rating!", 500);
  }
};

const getListRateRestaurant = async (req, res) => {
  try {
    const rates = await getRates();

    console.log(JSON.stringify(rates, null, 2));

    let result = processRates(rates, "restaurant")
    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    responseSend(res, "", err.message, 500);
  }
};

const getRateRestaurant = async (req, res) => {
  const { res_id } = req.params;
  try {
    const ratings = await getRates({ res_id });
    console.log(JSON.stringify(ratings, null, 2));

    let result = getRate(ratings, "restaurant")

    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    responseSend(res, "", err.message, 500);
  }
};

const getListRateUser = async (req, res) => {
  try {
    const rates = await getRates();

    console.log(JSON.stringify(rates, null, 2));

    let result = processRates(rates, "user")
    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    responseSend(res, "", err.message, 500);
  }
};

const getRateUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const ratings = await getRates({ user_id });

    console.log(JSON.stringify(ratings, null, 2));

    let result = getRate(ratings, "user")

    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    responseSend(res, "", err.message, 500);
  }
};

export {
  toggleLike,
  getListUserLike,
  getUserLike,
  getListRestaurantLike,
  getRestaurantLike,
  addRateRestaurant,
  getListRateRestaurant,
  getRateRestaurant,
  getListRateUser,
  getRateUser,
};
