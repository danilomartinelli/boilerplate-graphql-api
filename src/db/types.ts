import {
  DataTypeAbstract,
  DefineAttributeColumnOptions,
  CreateOptions,
  FindOptions
} from "sequelize";

type SequelizeAttribute =
  | string
  | DataTypeAbstract
  | DefineAttributeColumnOptions;

export type SequelizeAttributes<T extends { [key: string]: any }> = {
  [P in keyof T]: SequelizeAttribute
};

export type SequelizeSetAssociation<T, S> = (
  instance: T | null,
  options?: CreateOptions
) => Promise<S>;

export type SequelizeSetManyAssociation<T> = (
  instance: T[] | null,
  options?: CreateOptions
) => Promise<T[]>;

export type SequelizeGetAssociation<T, S> = (
  options?: FindOptions<T>
) => Promise<S>;

export type SequelizeGetManyAssociation<T, S> = (
  options?: FindOptions<T>
) => Promise<S[]>;

export type SequelizeAddAssociation<T> = (
  instance: T,
  options?: CreateOptions
) => Promise<void>;
