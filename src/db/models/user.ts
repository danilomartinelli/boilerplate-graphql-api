import * as Sequelize from "sequelize";
import {
  SequelizeAttributes,
  SequelizeSetAssociation,
  SequelizeGetAssociation,
  SequelizeGetManyAssociation,
  SequelizeAddAssociation
} from "../types";
import {
  UserAddressModel,
  UserAddressInstance,
  UserAddressAttributes
} from "./userAddress";
import { Gender } from "../../types";
import {
  StatementModel,
  StatementInstance,
  StatementAttributes
} from "./statement";

export interface UserAttributes {
  id?: string;

  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: Gender;

  createdAt?: Date;
  updatedAt?: Date;
}

interface UserAssociates {
  setUserAddress: SequelizeSetAssociation<UserAddressInstance, UserInstance>;
  getUserAddress: SequelizeGetAssociation<
    UserAddressAttributes,
    UserAddressInstance
  >;
  addStatement: SequelizeAddAssociation<StatementInstance>;
  getStatements: SequelizeGetManyAssociation<
    StatementAttributes,
    StatementInstance
  >;
}

export type UserInstance = Sequelize.Instance<UserAttributes> &
  UserAttributes &
  UserAssociates;

export type UserModel = Sequelize.Model<UserInstance, UserAttributes>;

export const userFactory = (sequalize: Sequelize.Sequelize): UserModel => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    birthday: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: { isDate: true }
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    }
  };

  const User = sequalize.define<UserInstance, UserAttributes>(
    "User",
    attributes,
    {
      indexes: [{ unique: true, fields: ["id", "email"] }]
    }
  );

  User.associate = ({
    UserAddress,
    Statement
  }: {
    UserAddress: UserAddressModel;
    Statement: StatementModel;
  }) => {
    User.hasOne(UserAddress, { foreignKey: "userId", onDelete: "CASCADE" });
    User.hasMany(Statement, { foreignKey: "userId", onDelete: "CASCADE" });
  };

  return User;
};
