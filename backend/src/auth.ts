import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "./db.js";

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    process.env.FRONTEND_URL || "https://taka-gelo-koi.vercel.app"
  ],
  advanced: {
    cookiePrefix: "taka-gelo-koi",
    crossSubdomainActivated: false,
  },
});
