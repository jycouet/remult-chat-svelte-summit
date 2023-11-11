import Credentials from "@auth/core/providers/credentials";
import { SvelteKitAuth } from "@auth/sveltekit";
import { Remult, remult, type UserInfo } from "remult";

import { User } from "../shared/User";
import { handleRemult } from "./handleRemult";
import type { Handle } from "@sveltejs/kit";
import {
  AUTH_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from "$env/static/private";
import GitHub from "@auth/core/providers/github";

//Based on article at https://authjs.dev/reference/sveltekit
export const handleAuth: Handle = (event) => {
  return SvelteKitAuth({
    secret: AUTH_SECRET ?? "my-tmp-auth-secret-please-change-it",
    trustHost: true,
    providers: [
      GitHub({
        clientId: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        profile: async (profile) => {
          return await handleRemult.withRemult(event.event, async () => {
            let user = await remult
              .repo(User)
              .findFirst({ github_id: [profile.id] });

            if (!user) {
              user = await remult.repo(User).insert({
                github_id: profile.id,
                name: profile.name ?? profile.login,
                avatar_url: profile.avatar_url,
              });
            }

            return {
              id: user.id,
              name: user.name,
              avatar_url: user.avatar_url,
            };
          });
        },
      }),
    ],
  })(event);
};
