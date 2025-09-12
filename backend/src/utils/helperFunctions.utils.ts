import { db } from "../../prisma/db";

const getUserRole = async (id: string) => {
  try {
    const user = await db.user.findFirst({ where: { id } });
    if (!user) {
      throw Error("User does not exist");
    }
    return user.role;
  } catch (error) {
    console.error(error);
  }
};

export { getUserRole };
