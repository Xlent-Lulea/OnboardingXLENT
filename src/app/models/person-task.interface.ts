import { Task } from "./task.interface";

export interface PersonTask {
    id: number;
    isCompleted: boolean;
    personId: number;
    readonly task: Task;
}