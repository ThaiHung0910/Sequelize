import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import { changeFormatDate, getLikes, getRates } from "../ultils/index.js";

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

    const listUserLikeRes = {};

    likes.forEach((like) => {
      const userId = like.user_id;
      const userName = like.user.full_name;
      const userEmail = like.user.email;
      const restaurantName = like.re.res_name;
      const date = changeFormatDate(like.date_like);

      if (!listUserLikeRes[userId]) {
        listUserLikeRes[userId] = {
          name: userName,
          email: userEmail,
          listResLike: [],
        };
      }

      listUserLikeRes[userId].listResLike.push({
        resName: restaurantName,
        date,
      });
    });

    const result = Object.keys(listUserLikeRes).map((userId) => {
      return {
        id: parseInt(userId),
        ...listUserLikeRes[userId],
      };
    });
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

    if (!likes.length) {
      return responseSend(
        res,
        "",
        "User not found or no likes for this user!",
        404
      );
    }

    const userName = likes[0].user.full_name;
    const userEmail = likes[0].user.email;
    const listLike = likes.map((like) => ({
      name: like.re.res_name,
      dateLike: changeFormatDate(like.date_like),
    }));

    const result = {
      name: userName,
      email: userEmail,
      listLike,
    };

    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    responseSend(res, "", err.message, 500);
  }
};

const getListRestaurantLike = async (req, res) => {
  try {
    let likes = await getLikes();

    let listRestaurantsLike = [];

    likes.forEach((like) => {
      const resId = like.res_id;
      const userId = like.user_id;
      const userName = like.user.full_name;
      const email = like.user.email;
      const restaurantName = like.re.res_name;

      if (!listRestaurantsLike[resId]) {
        listRestaurantsLike[resId] = {
          name: restaurantName,
          listUserLike: [],
        };
      }

      const infoUser = {
        userId,
        userName,
        email,
        dateLike: changeFormatDate(like.date_like),
      };

      listRestaurantsLike[resId].listUserLike.push(infoUser);
    });

    let result = Object.keys(listRestaurantsLike).map((resId) => ({
      id: parseInt(resId),
      ...listRestaurantsLike[resId],
    }));

    responseSend(res, result, "Successfully", 200);
  } catch (err) {
    responseSend(res, "", err.message, 500);
  }
};

const getRestaurantLike = async (req, res) => {
  const { res_id } = req.params;

  try {
    const likes = await getLikes({ res_id });

    if (!likes.length) {
      return responseSend(
        res,
        "",
        "Restaurant not found or no likes for this restaurant!",
        404
      );
    }
    console.log(JSON.stringify(likes, null, 2));
    const restaurantName = likes[0].re.res_name;
    const listUserLike = likes.map((like) => ({
      userId: like.user_id,
      userName: like.user.full_name,
      dateLike: changeFormatDate(like.date_like),
    }));

    const result = {
      name: restaurantName,
      listUserLike,
    };
    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    responseSend(res, "", err.message, 500);
  }
};

const addRateRestaurant = async (req, res) => {
  const { user_id, res_id, amount } = req.body;
  try {
    const rate = await model.rate_res.create({
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

    const listRateRes = {};

    rates.forEach((rate) => {
      const resId = rate.res_id;
      const userId = rate.user_id;
      const userName = rate.user.full_name;
      const restaurantName = rate.re.res_name;
      const amount = rate.amount;

      if (!listRateRes[resId]) {
        listRateRes[resId] = {
          name: restaurantName,
          listUserRate: [],
        };
      }
      const userRate = listRateRes[resId].listUserRate.find(
        (user) => user.userId === userId
      );
      if (userRate) {
        userRate.amount += amount;
      } else {
        listRateRes[resId].listUserRate.push({
          userId,
          userName,
          amount,
          dateRate: changeFormatDate(rate.date_rate),
        });
      }
    });

    const result = Object.keys(listRateRes).map((resId) => ({
      id: parseInt(resId),
      ...listRateRes[resId],
    }));
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

    if (!ratings.length) {
      return responseSend(
        res,
        "",
        "Restaurant not found or no ratings for this restaurant!",
        404
      );
    }

    const restaurantName = ratings[0].re.res_name;

    const listUserRate = ratings.map((rating) => ({
      userId: rating.user_id,
      name: rating.user.full_name,
      email: rating.user.email,
      dateRate: changeFormatDate(rating.date_rate),
    }));

    const result = {
      name: restaurantName,
      listUserRate,
    };

    responseSend(res, result, "Successfully!", 200);
  } catch (err) {
    responseSend(res, "", err.message, 500);
  }
};

const getListRateUser = async (req, res) => {
  try {
    const rates = await getRates();

    console.log(JSON.stringify(rates, null, 2));

    const listRateUser = {};

    rates.forEach((rate) => {
      const resId = rate.res_id;
      const userId = rate.user_id;
      const userName = rate.user.full_name;
      const restaurantName = rate.re.res_name;
      const amount = rate.amount;

      if (!listRateUser[userId]) {
        listRateUser[userId] = {
          name: userName,
          listResRate: [],
        };
      }
      const resRate = listRateUser[userId].listResRate.find(
        (res) => res.resId === resId
      );
      if (resRate) {
        resRate.amount += amount;
      } else {
        listRateUser[userId].listResRate.push({
          resId,
          restaurantName,
          amount,
          dateRate: changeFormatDate(rate.date_rate)
        });
      }
    });

    const result = Object.keys(listRateUser).map((userId) => ({
      id: parseInt(userId),
      ...listRateUser[userId],
    }));
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

    if (!ratings.length) {
      return responseSend(
        res,
        "",
        "User not found or no ratings for this user!",
        404
      );
    }

    const name = ratings[0].user.full_name;
    const email = ratings[0].user.email;
    let total = 0;
    const listResRate = {};
    ratings.map((rating) => {
      const resId = rating.res_id;

      if (!listResRate[resId]) {
        listResRate[resId] = {
          resName: rating.re.res_name,
          dateRate: changeFormatDate(rating.date_rate),
          amount: (total += rating.amount),
        };
      }
    });

    const listRate = Object.keys(listResRate).map((resId) => ({
      resId: parseInt(resId),
      ...listResRate[resId],
    }));
    const result = {
      name,
      email,
      listRate,
    };

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
