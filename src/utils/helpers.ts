import { IContext } from "../types";
import * as jwt from "jsonwebtoken";
import { AuthError } from "./";
import * as moment from "moment";
import { TerminateSession } from "./errors";

export const getUserId = (ctx: IContext) => {
  const token = ctx.token;

  try {
    if (token) {
      const { id, date } = jwt.verify(token, process.env.APP_SECRET!) as {
        id: string;
        date: Date;
      };

      const currentDate = moment();
      const oldDate = moment(date);

      const duration = moment.duration(currentDate.diff(oldDate));
      const hours = duration.asHours();

      if (hours >= 1) {
        throw new TerminateSession();
      }

      return id;
    } else {
      throw new AuthError();
    }
  } catch (err) {
    throw err;
  }
};
