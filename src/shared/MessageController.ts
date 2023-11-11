import { Allow, BackendMethod, remult } from "remult";
import { Message } from "./Message";

export class MessageController {
  @BackendMethod({ allowed: Allow.authenticated })
  static async send(msg: string) {
    await remult.repo(Message).insert({ msg, who: remult.user?.id });
  }
}
