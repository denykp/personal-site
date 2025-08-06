import { dbAdmin } from "../../utils/firebase-admin";

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody(event);
    const snapshot = await dbAdmin
      .collection("users")
      .where("username", "==", username)
      .limit(1)
      .get();
    if (!snapshot.empty) {
      const data: User[] = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const session = await useSession<User>(event, {
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
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw createError({ statusCode: 500, statusMessage: message });
  }
});
