import { env } from "../config";

export default function (url?: string) {
  return require("mongoose")
    .connect(url || env.db.uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .catch((err: any) => {
      console.error("DB ERROR: " + err.message);
      process.exit(1);
    });
}
