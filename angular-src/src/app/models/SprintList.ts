export interface ISprintList {
    _id?: string;
    name: string;
    duration: string;
    status: string;
    progress: string;
    description: string;
    notify: boolean;
    user: string;
    createdAt: Date
    startedAt: string;
    finishedAt: string;

}