import { Allow, Entity, Fields, Relations } from "remult";
import { User } from "./User";

@Entity<Message>("messages", {
  // allowApiCrud: true,
  allowApiInsert: Allow.authenticated,
  allowApiRead: Allow.everyone,
  allowApiUpdate: false,
  allowApiDelete: false,
  defaultOrderBy: {
    createdAt: "desc",
  },
})
export class Message {
  @Fields.cuid()
  id!: string;

  @Fields.string()
  whoId: string = "";

  @Relations.toOne(() => User, { field: "whoId" })
  who: string = "";

  @Fields.string<Message>({
    validate: (task) => {
      if (task.msg.length < 3) throw Error("Too short");
    },
  })
  msg: string = "";

  @Fields.createdAt()
  createdAt?: Date;
}
