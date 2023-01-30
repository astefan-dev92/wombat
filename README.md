# Example basic Auth service

---

- The logged in status is synchronized between browser windows/tabs using **`useUser`** hook and the [`swr`](https://swr.vercel.app/).
- The layout is based on the user's logged-in/out status.
- The session data is signed and encrypted in a cookie (this is done automatically by `iron-session`).

[`iron-session`](https://github.com/vvo/iron-session) also provides:

- An Express middleware, which can be used in any Node.js HTTP framework.
- Multiple encryption keys (passwords) to allow for seamless updates or just password rotation.
- Full TypeScript support, including session data.
