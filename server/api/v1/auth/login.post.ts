import { dbAdmin } from "../../../utils/firebase-admin";
import crypto from "node:crypto";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const snapshot = await dbAdmin
      .collection("users")
      .where("username", "==", body.username)
      .where("password", "==", body.password)
      .limit(1)
      .get();
    if (!snapshot.empty) {
      const data: UserData[] = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const { secretKey } = useRuntimeConfig();
      const password = crypto
        .createHash("md5")
        .update(String(secretKey))
        .digest("hex");
      const session = await useSession<UserData>(event, {
        name: "session",
        password,
        cookie: {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        },
        maxAge: 60 * 60 * 16, // in seconds
      });

      await session.update({
        name: data[0].name,
        username: String(data[0].username).toLowerCase(),
      });

      return session.data;
    }
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw createError({ statusCode: 500, statusMessage: message });
  }
});
