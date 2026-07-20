import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "./db";

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
  trustedOrigins: ["http://localhost:3000"],
  advanced: {
    cookiePrefix: "taka-gelo-koi",
    crossSubdomainActivated: false,
  },
});
