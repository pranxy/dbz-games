export interface Game {
    id: string;
    name: string;
    year: string;
    consoles: Console[];
    img_url: string;
    is_acquired: boolean;
    inserted_at: Date;
}

export interface Console {
    id: string;
    name: string;
}
