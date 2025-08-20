import crypto from "node:crypto";

export default defineEventHandler(async (event) => {
  const requestURL = getRequestURL(event);
  if (
    requestURL.pathname.startsWith("/api") &&
    requestURL.pathname !== "/api/auth/login"
  ) {
    const { secretKey } = useRuntimeConfig();
    const password = crypto
      .createHash("md5")
      .update(String(secretKey))
      .digest("hex");

    const session = await getSession<UserData>(event, {
      name: "session",
      password,
    });

    if (!session.data.name) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
      });
    }
  }
});
