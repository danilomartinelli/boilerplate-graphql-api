import { db } from "./";

db.sequelize
  .sync({ force: process.env.WARNING_FORCE === "true" })
  .then(async () => {
    console.log("sucess");
    process.exit(0);
  })
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });
