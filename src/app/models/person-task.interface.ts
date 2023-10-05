import { Task } from "./task.interface";

export interface PersonTask {
    id: number;
    isCompleted: boolean;
    personId: bigint;
    readonly task: Task;
}