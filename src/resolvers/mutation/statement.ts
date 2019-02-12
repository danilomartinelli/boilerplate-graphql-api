import { CreateStatementMutationArgs, IContext } from "../../types";
import { ArgumentError, getUserId, AuthError } from "../../utils";

export const createStatement = async (
  _: any,
  args: CreateStatementMutationArgs,
  ctx: IContext
) => {
  const db = ctx.db;
  const userId = getUserId(ctx);

  const { text } = args;

  if (text.length === 0) {
    throw new ArgumentError("O tamanho do texto não pode ser 0");
  }

  const transaction = await db.sequelize.transaction();
  try {
    const user = await db.User.findOne({
      where: { id: userId },
      transaction
    });

    if (!user) throw new AuthError();

    const statement = await db.Statement.create({ text }, { transaction });

    await user.addStatement(statement, { transaction });
    transaction.commit();
    return statement;
  } catch (err) {
    transaction.rollback();
    throw err;
  }
};
