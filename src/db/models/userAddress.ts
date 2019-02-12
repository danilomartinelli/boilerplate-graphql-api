import * as Sequelize from "sequelize";
import { SequelizeAttributes } from "../types";
import { CountryAbbreviation, Uf } from "../../types";

export interface UserAddressAttributes {
  country: CountryAbbreviation;
  state: Uf;
  city: string;
  neighborhood: string;
  street: string;
  zipCode: string;
  number: string;

  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
}

export type UserAddressInstance = Sequelize.Instance<UserAddressAttributes> &
  UserAddressAttributes;

export type UserAddressModel = Sequelize.Model<
  UserAddressInstance,
  UserAddressAttributes
>;

export const userAddressFactory = (
  sequalize: Sequelize.Sequelize
): UserAddressModel => {
  const attributes: SequelizeAttributes<UserAddressAttributes> = {
    country: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    neighborhood: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    zipCode: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    }
  };

  const UserAddress = sequalize.define<
    UserAddressInstance,
    UserAddressAttributes
  >("UserAddress", attributes, {
    indexes: [{ unique: true, fields: ["userId"] }]
  });

  return UserAddress;
};
