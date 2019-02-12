import { PubSub } from "apollo-server";
import { ScalarTypes } from "./scalarTypes";
import { login, signUp /* createStatement */ } from "./mutation";
import {
  currentUser,
  users,
  user,
  userAddressMapByUser
  // statementsMapByUser
} from "./query";
import { enums } from "./enums";

export const pubSub = new PubSub();

export const resolvers = {
  // Scalar Types
  ...ScalarTypes,

  // Enums
  ...enums,

  // Mutations
  Mutation: { login, signUp /* createStatement */ } as any,

  // Queries
  Query: {
    currentUser,
    users,
    user
  } as any,

  // Map To Query
  User: {
    address: userAddressMapByUser
    // statements: statementsMapByUser
  }
};
