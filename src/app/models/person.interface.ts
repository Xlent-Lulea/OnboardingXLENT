export interface Person {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    readonly mentee: Person | null;
}