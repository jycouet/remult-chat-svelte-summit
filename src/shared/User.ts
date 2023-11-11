import { Entity, Fields } from "remult";

@Entity("users", {
  allowApiRead: true,
})
export class User {
  @Fields.cuid({ includeInApi: false })
  id = "";

  @Fields.string()
  name = "";

  @Fields.number({ includeInApi: false })
  github_id = 0;

  @Fields.string()
  avatar_url = "";
}
