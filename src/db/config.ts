export const config = {
  development: {
    url: process.env.DATABASE_CONNECTION_URI,
    dialect: "postgres",
    operatorsAliases: false
  },
  production: {
    url: process.env.DATABASE_CONNECTION_URI,
    dialect: "postgres",
    operatorsAliases: false
  }
};
