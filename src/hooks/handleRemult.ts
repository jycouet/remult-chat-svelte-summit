import { remultSveltekit } from "remult/remult-sveltekit";
import { Message } from "../shared/Message";
import { User } from "../shared/User";
import { MessageController } from "../shared/MessageController";
import { DATABASE_URL } from "$env/static/private";
import { createPostgresDataProvider } from "remult/postgres";
import { remult } from "remult";

export const handleRemult = remultSveltekit({
  // @ts-ignore TODO
  getUser: async (event) => {
    const s = await event?.locals?.getSession();

    // console.log(`s`, s);
    if (s && s.user) {
      return {
        id: s.user?.id,
        name: s.user?.name,
        // @ts-ignore
        avatar_url: s.user?.image,
      };
    }

    return undefined;
  },
  initRequest: async (event) => {
    const s = await event?.locals?.getSession();

    if (s && s.user) {
      remult.user = {
        id: s.user?.id,
        name: s.user?.name!,
        // @ts-ignore
        avatar_url: s.user?.image,
      };
    }
  },
  dataProvider: createPostgresDataProvider({ connectionString: DATABASE_URL }),
  entities: [Message, User],
  controllers: [MessageController],
});
