import { Entity, Fields, Relations } from "remult";
import { User } from "./User";

@Entity<Message>("messages", {
  // allowApiCrud: true,
  allowApiRead: true,
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
  who!: User;

  @Fields.string<Message>({
    validate: (task) => {
      if (task.msg.length < 3) throw Error("Too short");
    },
  })
  msg: string = "";

  @Fields.createdAt()
  createdAt: Date = new Date();
}
