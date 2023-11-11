import { remultSveltekit } from "remult/remult-sveltekit";
import { Message } from "../shared/Message";
import { User } from "../shared/User";
import { MessageController } from "../shared/MessageController";

export const handleRemult = remultSveltekit({
  getUser: async (event) => {
    const s = await event?.locals?.getSession();

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
  entities: [Message, User],
  controllers: [MessageController],
});
