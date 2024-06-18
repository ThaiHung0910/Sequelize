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

export { getLikes, getRates };

export const changeFormatDate = (value) => {
  const date = new Date(value);

  const pad = (num) => String(num).padStart(2, "0");

  const formattedDate = `${date.getUTCFullYear()}-${pad(
    date.getUTCMonth() + 1
  )}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(
    date.getUTCMinutes()
  )}:${pad(date.getUTCSeconds())}`;

  return formattedDate;
};
