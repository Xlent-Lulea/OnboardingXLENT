import { TaskType } from "./task-type.interface";

export interface Task {
  id: number;
  title: string;
  type: TaskType;
  url: string;
  description: string;
}