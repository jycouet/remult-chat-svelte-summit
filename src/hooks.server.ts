import { sequence } from "@sveltejs/kit/hooks";
import { handleRemult } from "./hooks/handleRemult";
import { handleAuth } from "./hooks/handleAuth";

export const handle = sequence(handleAuth, handleRemult);
