import crypto from "node:crypto";

export default defineEventHandler(async (event) => {
  try {
    const { secretKey } = useRuntimeConfig();
    const password = crypto
      .createHash("md5")
      .update(String(secretKey))
      .digest("hex");

    const session = await useSession<UserData>(event, {
      name: "session",
      password,
    });

    session.clear();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
});
