import crypto from "node:crypto";

export default defineEventHandler(async (event) => {
  const { secretKey } = useRuntimeConfig();
  const password = crypto
    .createHash("md5")
    .update(String(secretKey))
    .digest("hex");

  const session = await getSession<UserData>(event, {
    name: "session",
    password,
  });

  return session.data || false;
});
