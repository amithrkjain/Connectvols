import { UserTypes } from "./user.types";

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ProjectChatTypes {
  id: string;
  sender: string;
  to: string;
  message: string;
  timestamp: string;
}
interface ProjectTypes {
  name: string;
  description: string;
  required_skills: { label: string; value: string }[];
  location: string;
  time_required: string;
  id: string;
  owner: UserTypes;
  volunteers?: UserTypes[];
  chats?: ProjectChatTypes[];
}

export type { ProjectTypes };
