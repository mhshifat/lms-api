import "dotenv/config";
const env = process.env;

export default {
  port: env.PORT || "5000",
  apiPrefix: env.API_PREFIX || "/",
  inProd: env.NODE_ENV === "production",
  db: {
    uri: env.MONGODB_URI || "",
  },
  jwt: {
    secret: env.JWT_SECRET || "my-super-secret",
  },
};
