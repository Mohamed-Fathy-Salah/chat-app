export interface Message {
  userId: number;
  userName: string;
  userPhoto: string;
  body: string;
  time: string;
}

export function formatMessage(message: Message): Message {
  return message;
}
