import { UserInstance } from "../../db/models/user";
import { IContext, StatementsUserArgs } from "../../types";

export const statementsMapByUser = async (
  user: UserInstance,
  args: StatementsUserArgs
) => {
  try {
    const statements = await user.getStatements({
      limit: args.limit || undefined,
      offset: args.offset || undefined
    });
    return statements;
  } catch (err) {
    throw err;
  }
};
