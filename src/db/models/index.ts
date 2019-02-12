import * as Sequelize from "sequelize";
import { userFactory } from "./user";
import { userAddressFactory } from "./userAddress";
import { config } from "../config";
import { statementFactory } from "./statement";

type NodeEnv = "production" | "development";

const env: NodeEnv = (process.env.NODE_ENV as NodeEnv) || "development";

const sequelize = new Sequelize(config[env].url!, config[env]);

const database = {
  sequelize,
  Sequelize,
  User: userFactory(sequelize),
  UserAddress: userAddressFactory(sequelize),
  Statement: statementFactory(sequelize)
};

Object.values(database).forEach((model: any) => {
  if (model.associate) {
    model.associate(database);
  }
});

export const db = database;
