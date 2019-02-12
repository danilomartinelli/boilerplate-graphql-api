import { IContext, UsersQueryArgs, UserQueryArgs } from "../../types";
import { getUserId } from "../../utils";
import { NotFoundError, ArgumentError } from "../../utils/errors";

export const currentUser = async (_: any, __: {}, ctx: IContext) => {
  const db = ctx.db;
  try {
    const userId = getUserId(ctx);
    const user = await db.User.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError("Este usuário não existe");
    }
    return user;
  } catch (err) {
    throw err;
  }
};

export const users = async (_: any, args: UsersQueryArgs, ctx: IContext) => {
  const db = ctx.db;

  try {
    const users = await db.User.findAll({
      offset: args.offset || undefined,
      limit: args.limit || undefined
    });

    return users;
  } catch (err) {
    throw err;
  }
};

export const user = async (_: any, args: UserQueryArgs, ctx: IContext) => {
  const db = ctx.db;

  const email = args.where.email;

  if (!email) {
    throw new ArgumentError("Insira pelo menos um filtro");
  }

  try {
    const user = await db.User.findOne({
      where: { email }
    });
    return user;
  } catch (err) {
    throw err;
  }
};
