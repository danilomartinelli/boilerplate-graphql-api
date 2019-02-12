import * as Sequelize from "sequelize";
import { SequelizeAttributes } from "../types";

export interface StatementAttributes {
  id?: string;

  text: string;

  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
}

export type StatementInstance = Sequelize.Instance<StatementAttributes> &
  StatementAttributes;

export type StatementModel = Sequelize.Model<
  StatementInstance,
  StatementAttributes
>;

export const statementFactory = (
  sequalize: Sequelize.Sequelize
): StatementModel => {
  const attributes: SequelizeAttributes<StatementAttributes> = {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: false
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    }
  };

  const Statement = sequalize.define<StatementInstance, StatementAttributes>(
    "Statement",
    attributes,
    {
      indexes: [{ unique: true, fields: ["id", "userId"] }]
    }
  );

  return Statement;
};
