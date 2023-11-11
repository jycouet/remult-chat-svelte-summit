import { Allow, BackendMethod, remult } from "remult";
import { Message } from "./Message";

export class MessageController {
  @BackendMethod({ allowed: Allow.authenticated })
  static async send(msg: string) {
    // insert the message of the user
    await remult.repo(Message).insert({ msg, whoId: remult.user?.id });
  }
}
