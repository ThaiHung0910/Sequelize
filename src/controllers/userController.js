import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseSend } from "../config/response.js";
import { checkNumber } from "../utils/index.js";

let model = initModels(sequelize);

const addOrder = async (req, res) => {
  const { user_id, food_id, amount, arr_sub_id } = req.body;

  try {
    const orderCount = await model.order.count();
    const newOrderNumber = orderCount + 1;
    const newOrderCode = `ORD${newOrderNumber.toString().padStart(3, "0")}`;

    const isNumber =  checkNumber(amount) && checkNumber(arr_sub_id);

    if (isNumber) {
      await model.order.create({
        user_id,
        food_id,
        amount,
        code: newOrderCode,
        arr_sub_id,
      });
      responseSend(res, "", "Successfully!", 200);
    } else {
      responseSend(res, "", "Invalid value!", 403);
    }
  } catch (err) {
    responseSend(res, "", err.message, 500);
  }
};

export { addOrder };
