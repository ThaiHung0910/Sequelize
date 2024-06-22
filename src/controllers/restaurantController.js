import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import {
  checkNumber,
  getLike,
  getLikes,
  getRate,
  getRates,
  processLikes,
  processRates,
} from "../utils/index.js";

let model = initModels(sequelize);

const messageError = (res, err) => {
  return responseSend(res, "", err.message, 500);
}

const like = async (req, res) => {
  const { user_id, res_id } = req.body;
  try {
    const userLike = await model.like_res.findOne({
      where: { user_id, res_id },
    });
    if (!userLike) {
      await model.like_res.create({ user_id, res_id, date_like: new Date() });
      responseSend(res, "", "Liked the restaurant!", 200);
    } else {
      responseSend(res, "", "Already liked this restaurant", 403);
    }
  } catch (err) {
    messageError(res, err)
  }
};

const unlike = async (req, res) => {
  const { user_id, res_id } = req.body;
  try {
    const userLike = await model.like_res.findOne({
      where: { user_id, res_id },
    });
    if (userLike) {
      await userLike.destroy();
      responseSend(res, "", "Unliked the restaurant!", 200);
    } else {
      responseSend(res, "", "Not found!", 404);
    }
  } catch (err) {
    messageError(res, err)
  }
};

const getListUserLike = async (req, res) => {
  try {
    const likes = await getLikes();

    console.log(JSON.stringify(likes, null, 2));

    let result = processLikes(likes, "user");
    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    messageError(res, err)
  }
};

const getUserLike = async (req, res) => {
  const { user_id } = req.params;
  try {
    const likes = await getLikes({ user_id });

    console.log(JSON.stringify(likes, null, 2));

    let result = getLike(likes, "user");
    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    messageError(res, err)
  }
};

const getListRestaurantLike = async (req, res) => {
  try {
    let likes = await getLikes();

    let result = processLikes(likes, "restaurant");

    responseSend(res, result, "Successfully", 200);
  } catch (err) {
    messageError(res, err)
  }
};

const getRestaurantLike = async (req, res) => {
  const { res_id } = req.params;

  try {
    const likes = await getLikes({ res_id });

    let result = getLike(likes, "restaurant");
    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    messageError(res, err)
  }
};

const addRateRestaurant = async (req, res) => {
  const { user_id, res_id, amount } = req.body;
  try {
    const user = await model.rate_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });

    if (user) {
      return responseSend(res, "", "Already rate this restaurant!", 403);
    }

    const isNumber = checkNumber(amount) && amount >= 0 && amount <= 5;

    if (isNumber) {
      await model.rate_res.create({
        user_id,
        res_id,
        amount,
        date_rate: new Date(),
      });

      responseSend(res, "", "Successfully created rating!", 200);
    } else {
      responseSend(res, "", "Invalid value!", 403);
    }
  } catch (err) {
    messageError(res, err)
  }
};

const getListRateRestaurant = async (req, res) => {
  try {
    const rates = await getRates();

    console.log(JSON.stringify(rates, null, 2));

    let result = processRates(rates, "restaurant");
    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    messageError(res, err)
  }
};

const getRateRestaurant = async (req, res) => {
  const { res_id } = req.params;
  try {
    const ratings = await getRates({ res_id });
    console.log(JSON.stringify(ratings, null, 2));

    let result = getRate(ratings, "restaurant");

    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    messageError(res, err)
  }
};

const getListRateUser = async (req, res) => {
  try {
    const rates = await getRates();

    console.log(JSON.stringify(rates, null, 2));

    let result = processRates(rates, "user");
    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    messageError(res, err)
  }
};

const getRateUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const ratings = await getRates({ user_id });

    console.log(JSON.stringify(ratings, null, 2));

    let result = getRate(ratings, "user");

    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    messageError(res, err)
  }
};

export {
  like,
  unlike,
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
