import { Entity, Fields } from "remult";

@Entity("users", {})
export class User {
  @Fields.cuid()
  id = "";

  @Fields.string()
  name = "";

  @Fields.number()
  github_id = 0;

  @Fields.string()
  avatar_url = "";
}
