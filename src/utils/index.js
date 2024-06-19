import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

let model = initModels(sequelize);

const getLikes = async (conditions = {}) => {
  return await model.like_res.findAll({
    where: conditions,
    include: [
      {
        model: model.restaurant,
        as: "re",
        attributes: ["res_name"],
      },
      {
        model: model.user,
        as: "user",
        attributes: ["full_name", "email"],
      },
    ],
  });
};

const getRates = async (conditions = {}) => {
  return await model.rate_res.findAll({
    where: conditions,
    include: [
      {
        model: model.restaurant,
        as: "re",
        attributes: ["res_name"],
      },
      {
        model: model.user,
        as: "user",
        attributes: ["full_name", "email"],
      },
    ],
  });
};

const objectToArray = (obj) => {
  return Object.keys(obj).map((key) => ({
    id: parseInt(key),
    ...obj[key],
  }));
};

const processLikes = (likes, type) => {
  const object = {};

  likes.forEach((like) => {
    const resId = like.res_id;
    const userId = like.user_id;
    const userName = like.user.full_name;
    const email = like.user.email;
    const restaurantName = like.re.res_name;
    const date = changeFormatDate(like.date_like);

    switch (type) {
      case "user":
        if (!object[userId]) {
          object[userId] = {
            name: userName,
            email,
            listResLike: [],
          };
        }

        object[userId].listResLike.push({
          resName: restaurantName,
          date,
        });
        break;
      default:
        if (!object[resId]) {
          object[resId] = {
            name: restaurantName,
            listUserLike: [],
          };
        }

        const infoUser = {
          userId,
          userName,
          email,
          dateLike: date,
        };

        object[resId].listUserLike.push(infoUser);
    }
  });

  return objectToArray(object);
};

const getLike = (likes, type) => {
  if (!likes.length) {
    return res
      .status(400)
      .send(`${type} not found or no likes for this ${type}!`);
  }

  let result = {};
  switch (type) {
    case "user":
      const userName = likes[0].user.full_name;
      const email = likes[0].user.email;
      const listLike = likes.map((like) => ({
        name: like.re.res_name,
        dateLike: changeFormatDate(like.date_like),
      }));

      result = {
        name: userName,
        email: email,
        listLike,
      };
      break;
    default:
      const restaurantName = likes[0].re.res_name;
      const listUserLike = likes.map((like) => ({
        userId: like.user_id,
        userName: like.user.full_name,
        email: like.user.email,
        dateLike: changeFormatDate(like.date_like),
      }));

      result = {
        name: restaurantName,
        listUserLike,
      };
  }
  return result;
};

const processRates = (rates, type) => {
  const object = {};

  rates.forEach((rate) => {
    const resId = rate.res_id;
    const userId = rate.user_id;
    const userName = rate.user.full_name;
    const email = rate.user.email;
    const restaurantName = rate.re.res_name;
    const amount = rate.amount;
    const date = changeFormatDate(rate.date_rate);

    switch (type) {
      case "restaurant":
        if (!object[resId]) {
          object[resId] = {
            name: restaurantName,
            listUserRate: [],
          };
        }

        object[resId].listUserRate.push({
          userId,
          userName,
          email,
          amount,
          dateRate: date,
        });
        break;
      default:
        if (!object[userId]) {
          object[userId] = {
            name: userName,
            email,
            listResRate: [],
          };
        }

        object[userId].listResRate.push({
          resId,
          restaurantName,
          amount,
          dateRate: date,
        });
    }
  });

  return objectToArray(object);
};

const getRate = (ratings, type) => {
  if (!ratings.length) {
    return res
      .status(400)
      .send(`${type} not found or no ratings for this ${type}!`);
  }
  let result = {};
  let list = [];
  const name = ratings[0].user.full_name;
  const email = ratings[0].user.email;
  const restaurantName = ratings[0].re.res_name;
  ratings.forEach((rating) => {
    const amount = rating.amount;
    const date = changeFormatDate(rating.date_rate);
    switch (type) {
      case "user":
        const resId = rating.res_id;
        
        list.push({
          resId,
          resName: rating.re.res_name,
          amount,
          dateRate: date,
        });

        result = {
          name,
          email,
          listRestaurantRate: list,
        };
        break;
      default:
        const userId = rating.user_id;
        
        list.push({
          userId,
          name: rating.user.full_name,
          email: rating.user.email,
          amount,
          dateRate: date,
        });

        result = {
          name: restaurantName,
          listUserRate: list,
        };
    }
  });

  return result;
};

const changeFormatDate = (value) => {
  const date = new Date(value);

  const pad = (num) => String(num).padStart(2, "0");

  const formattedDate = `${date.getUTCFullYear()}-${pad(
    date.getUTCMonth() + 1
  )}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(
    date.getUTCMinutes()
  )}:${pad(date.getUTCSeconds())}`;

  return formattedDate;
};

const checkNumber = (value) => {
  value = JSON.parse(value);
  return Number.isInteger(value);
};

export {
  getLikes,
  getRates,
  changeFormatDate,
  processLikes,
  processRates,
  getLike,
  getRate,
  checkNumber,
};
