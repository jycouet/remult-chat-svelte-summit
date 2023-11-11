import { remultSveltekit } from "remult/remult-sveltekit";
import { Message } from "../shared/Message";
import { User } from "../shared/User";
import { MessageController } from "../shared/MessageController";
import { DATABASE_URL } from "$env/static/private";
import { createPostgresDataProvider } from "remult/postgres";
import { remult } from "remult";

export const handleRemult = remultSveltekit({
  getUser: async (event) => {
    if (DATABASE_URL) {
      const s = await event?.locals?.getSession();

      if (s && s.user) {
        // TODO find my ID!
        const uDb = await remult
          .repo(User)
          .findFirst({ name: [s?.user?.name!] });
        if (uDb) {
          return {
            id: uDb.id,
            name: uDb.name,
            avatar_url: uDb.avatar_url,
          };
        }
      }

      return undefined;
    } else {
      const uDb = await remult.repo(User).findFirst({ name: ["JYC"] });
      return { id: uDb.id, name: uDb.name, avatar_url: uDb.avatar_url };
    }
  },
  dataProvider: DATABASE_URL
    ? createPostgresDataProvider({ connectionString: DATABASE_URL })
    : undefined,
  entities: [Message, User],
  controllers: [MessageController],
});
