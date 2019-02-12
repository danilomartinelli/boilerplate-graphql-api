export interface UserWhereInput {
  email?: string | null;
}

export interface UserSignUpInput {
  email: string;

  password: string;

  firstName: string;

  lastName: string;

  birthday: Date;

  gender: Gender;

  address: UserAddressSignUpInput;
}

export interface UserAddressSignUpInput {
  country: CountryAbbreviation;

  state: Uf;

  city: string;

  neighborhood: string;

  street: string;

  zipCode: string;

  number: string;
}

export enum Gender {
  Male = "MALE",
  Female = "FEMALE",
  Other = "OTHER"
}

export enum CountryAbbreviation {
  Br = "BR"
}

export enum Uf {
  Ac = "AC",
  Al = "AL",
  Ap = "AP",
  Am = "AM",
  Ba = "BA",
  Ce = "CE",
  Df = "DF",
  Es = "ES",
  Go = "GO",
  Ma = "MA",
  Mt = "MT",
  Ms = "MS",
  Mg = "MG",
  Pa = "PA",
  Pb = "PB",
  Pr = "PR",
  Pe = "PE",
  Pi = "PI",
  Rj = "RJ",
  Rn = "RN",
  Rs = "RS",
  Ro = "RO",
  Rr = "RR",
  Sc = "SC",
  Sp = "SP",
  Se = "SE",
  To = "TO"
}

export type Date = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  users: (User | null)[];

  user?: User | null;

  currentUser: User;
}

export interface User {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  birthday: Date;

  gender: Gender;

  address: Address;

  statements: Statement[];

  createdAt: Date;

  updatedAt: Date;
}

export interface Address {
  country: CountryAbbreviation;

  state: Uf;

  city: string;

  neighborhood: string;

  street: string;

  zipCode: string;

  number: string;

  createdAt: Date;

  updatedAt: Date;
}

export interface Statement {
  id: string;

  text: string;

  createdAt: Date;

  updatedAt: Date;
}

export interface Mutation {
  signUp: PayloadAuth;

  login: PayloadAuth;

  createStatement: Statement;
}

export interface PayloadAuth {
  token: string;

  user: User;
}

// ====================================================
// Arguments
// ====================================================

export interface UsersQueryArgs {
  limit?: number | null;

  offset?: number | null;
}
export interface UserQueryArgs {
  where: UserWhereInput;
}
export interface StatementsUserArgs {
  limit?: number | null;

  offset?: number | null;
}
export interface SignUpMutationArgs {
  data: UserSignUpInput;
}
export interface LoginMutationArgs {
  email: string;

  password: string;
}
export interface CreateStatementMutationArgs {
  text: string;
}
