const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });

console.log("Database Config:");
console.log("HOST:", process.env.DATABASE_HOST);
console.log("PORT:", process.env.DATABASE_PORT);
console.log("USERNAME:", process.env.DATABASE_USERNAME);
console.log("PASSWORD:", process.env.DATABASE_PASSWORD);
console.log("NAME:", process.env.DATABASE_NAME);
