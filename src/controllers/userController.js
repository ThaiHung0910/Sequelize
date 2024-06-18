import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";

let model = initModels(sequelize);

const addOrder = async (req, res) => {
  const { user_id, food_id, amount } = req.body;

  try {
    const orderCount = await model.order.count();
    const newOrderNumber = orderCount + 1;
    const newOrderCode = `ORD${newOrderNumber.toString().padStart(3, "0")}`;

    await model.order.create({
      user_id,
      food_id,
      amount,
      code: newOrderCode,
    });

    responseSend(res, "", "Successfully!", 200);
  } catch (err) {
    responseSend(res, "", err.message, 500);
  }
};

export { addOrder };
