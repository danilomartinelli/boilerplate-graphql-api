import { UserInstance } from "../../db/models/user";
import { IContext } from "../../types";

export const userAddressMapByUser = async (user: UserInstance, _: {}) => {
  try {
    const userAddress = await user.getUserAddress();
    return userAddress;
  } catch (err) {
    throw err;
  }
};
