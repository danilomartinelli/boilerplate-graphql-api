import { UserAttributes } from "../../db/models/user";
import { IContext } from "../../types";

export const userAddressMapByUser = async (
  user: UserAttributes,
  _: {},
  ctx: IContext
) => {
  const db = ctx.db;

  try {
    const userAddress = await db.UserAddress.findOne({
      where: { userId: user.id }
    });
    return userAddress;
  } catch (err) {
    throw err;
  }
};
