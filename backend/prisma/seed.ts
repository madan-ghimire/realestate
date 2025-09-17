import { db } from "./db";
import { addUsers } from "./seeds";

async function main() {
  await addUsers(db);
}

main()
  .then(async () => {
    await db.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
