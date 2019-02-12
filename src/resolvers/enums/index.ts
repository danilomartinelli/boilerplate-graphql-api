import { Gender } from "../../types";

type TGender = { [P in Gender]: string };

interface IEnums {
  GENDER: TGender;
}

export const enums: IEnums = {
  GENDER: {
    MALE: "M",
    FEMALE: "F",
    OTHER: "I"
  }
};
