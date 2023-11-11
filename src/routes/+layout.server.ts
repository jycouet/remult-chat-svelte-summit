import { redirect } from "@sveltejs/kit";
import { remult } from "remult";

export const load = async () => {
  return {
    user: remult.user,
  };
};
