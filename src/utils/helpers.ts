import { Message } from "@/types";

export function createMessage(message?: Partial<Message>): Message {
  return { id: 0, content: "", author: "", ...message };
}

export function sleep(time = 5000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}
