import crypto from "node:crypto";

export default defineEventHandler(async (event) => {
  const requestURL = getRequestURL(event);
  if (
    requestURL.pathname.startsWith("/api/v1") &&
    requestURL.pathname !== "/api/v1/auth/login" &&
    requestURL.pathname !== "/api/v1/auth/logout"
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
