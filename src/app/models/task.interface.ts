//task.interface.ts
export interface Task {
    urltitle?: string;
    id?:number;
    taskType: string;
    url?: string;
    completed: boolean;
    description: string; 
    active: boolean;
    person_id?: BigInt;
}   

export enum TaskType {
    WELCOME = 'Välkommen', 
    BUDDY = 'Buddy/Coach', 
    START = 'Startklar',
    ADMIN = 'Anställning och admin',
    DIGITAL_SETUP = 'Digital Setup',
    CONSULTANT = 'Konsultrollen',
    FINISH = 'Avslut!',
  }

  export interface Person {
    id: number;
    name: string;
    email: string;
    tasks: Task[];
    active: boolean;
  
  }

  export interface TaskEmail {
    to: string;
    title: string;
    description: string;
    url: string;
    additionalInfo: string;
  }
  
  
  