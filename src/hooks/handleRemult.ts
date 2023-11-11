import { remultSveltekit } from "remult/remult-sveltekit";
import { Message } from "../shared/Message";

export const handleRemult = remultSveltekit({
  entities: [Message],
});
