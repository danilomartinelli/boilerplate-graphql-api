import {
  IContext,
  SignUpMutationArgs,
  LoginMutationArgs,
  ErrorType
} from "../../types";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import {
  isValidEmail,
  ArgumentError,
  CustomError,
  UniqueFieldError
} from "../../utils";
import { UserInstance } from "../../db/models/user";

export const login = async (_: any, args: LoginMutationArgs, ctx: IContext) => {
  const db = ctx.db;

  const { email, password } = args;

  if (!isValidEmail(email)) {
    throw new ArgumentError("Email inválido");
  }

  const user = await db.User.findOne({
    where: { email }
  });

  if (!user)
    throw new CustomError(
      ErrorType.InvalidCredentials,
      "Usuário não cadastrado"
    );

  const isValid = await bcrypt.compare(password, user.password);

  if (isValid) {
    const token = jwt.sign(
      { id: user!.id!, date: new Date() },
      process.env.APP_SECRET!
    );

    return { user: user!.get(), token };
  } else {
    throw new CustomError(ErrorType.InvalidCredentials, `Senha incorreta.`);
  }
};

export const signUp = async (
  _: any,
  args: SignUpMutationArgs,
  ctx: IContext
) => {
  const db = ctx.db;
  const { data } = args;

  if (!isValidEmail(data.email)) {
    throw new ArgumentError("Email inválido");
  }

  const cryptPassword = await bcrypt.hash(data.password, 10);

  const transaction = await db.sequelize.transaction();

  try {
    const user = await db.User.findOne({
      where: {
        email: data.email
      },
      transaction
    });

    if (user && user.email === data.email) {
      throw new UniqueFieldError("Email já cadastrado");
    }

    let newUser: UserInstance;
    newUser = await db.User.create(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        password: cryptPassword,
        birthday: data.birthday,
        gender: data.gender,
        email: data.email
      },
      { transaction }
    );

    const newAddress = await db.UserAddress.create(
      {
        neighborhood: data.address.neighborhood,
        street: data.address.street,
        number: data.address.number,
        zipCode: data.address.zipCode.replace(/\D*/g, ""),
        city: data.address.city,
        state: data.address.state,
        country: data.address.country
      },
      { transaction }
    );

    await newUser.setUserAddress(newAddress, { transaction });

    await transaction.commit();

    const token = jwt.sign(newUser.id!, process.env.APP_SECRET!);
    return { user: newUser, token };
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};
