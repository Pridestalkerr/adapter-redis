import { Redis } from "ioredis";
import { runBasicTests } from "./basic-tests";
import { reviveFromJson, RedisAdapter } from "../src";
import "dotenv/config";

const client = new Redis(process.env.REDIS_URL as string);

runBasicTests({
  adapter: RedisAdapter(client, { baseKeyPrefix: "testApp:" }),
  db: {
    async user(id: string) {
      const data = await client.get(`testApp:user:${id}`);
      return reviveFromJson(data as string);
    },
    async account({ provider, providerAccountId }) {
      const data = await client.get(
        `testApp:user:account:${provider}:${providerAccountId}`
      );
      return reviveFromJson(data as string);
    },
    async session(sessionToken) {
      const data = await client.get(`testApp:user:session:${sessionToken}`);
      return reviveFromJson(data as string);
    },
    async verificationToken(where) {
      const data = await client.get(
        `testApp:user:token:${where.identifier}:${where.token}`
      );
      return reviveFromJson(data as string);
    },
  },
});
