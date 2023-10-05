import { PersonTask } from "./person-task.interface";

export interface Person {
    id: number;
    name: string;
    email: string;
    personTasks: PersonTask[];
    active: boolean;
}