export interface Game {
    id: string;
    user_id: string;
    task: string;
    is_complete: boolean;
    inserted_at: Date;
}