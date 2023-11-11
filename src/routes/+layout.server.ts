import { redirect } from "@sveltejs/kit";
import { remult } from "remult";

// will protect every route in the app
export const load = async () => {
  return {
    user: remult.user,
  };
};
