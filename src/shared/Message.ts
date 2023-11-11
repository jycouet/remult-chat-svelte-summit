import { Entity, Fields } from "remult";

@Entity("messages", {
  allowApiCrud: true,
})
export class Message {
  @Fields.cuid()
  id!: string;

  @Fields.string<Message>({
    validate: (task) => {
      if (task.who.length < 3) throw Error("Too short");
    },
  })
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
