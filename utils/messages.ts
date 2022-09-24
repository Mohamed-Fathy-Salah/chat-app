export interface Message {
  from: number;
  to: number;
  isGroup: boolean;
  body: string;
  time: string;
}
