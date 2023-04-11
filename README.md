This is a fork of the original [upstash-redis](https://github.com/nextauthjs/adapters/tree/main/packages/upstash-redis)

## Overview

This is a Redis (ioredis) adapter for [`next-auth`](https://next-auth.js.org).

## Getting Started

1. Install `next-auth` and `adapter-redis` (TODO, just copy the file directly into your project for now) as well as `ioredis` via NPM.

```js
npm install next-auth ioredis adapter-redis
```

2. Add the follwing code to your `pages/api/[...nextauth].js` next-auth configuration object.

```js
import NextAuth from "next-auth"
import { RedisAdapter } from "adapter-redis"
import Redis from "ioredis"

const client = new Redis(process.env.REDIS_URL)

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  ...
  adapter: RedisAdapter(client)
  ...
})
```

## Using Multiple Apps with a Single Redis Instance

If you have multiple Next-Auth connected apps using this instance, you need different key prefixes for every app.

You can change the prefixes by passing an `options` object as the second argument to the adapter factory function.

The default values for this object are:

```js
const defaultOptions = {
  baseKeyPrefix: "",
  accountKeyPrefix: "user:account:",
  accountByUserIdPrefix: "user:account:by-user-id:",
  emailKeyPrefix: "user:email:",
  sessionKeyPrefix: "user:session:",
  sessionByUserIdKeyPrefix: "user:session:by-user-id:",
  userKeyPrefix: "user:",
  verificationTokenKeyPrefix: "user:token:",
};
```

Usually changing the `baseKeyPrefix` should be enough for this scenario, but for more custom setups, you can also change the prefixes of every single key.

Example:

```js
export default NextAuth({
  ...
  adapter: RedisAdapter(redis, {baseKeyPrefix: "app2:"})
  ...
})
```

## Testing

A docker-compose file is provided to run a redis instance for testing purposes.

```
docker-compose up
npm run test
```

## License

ISC
