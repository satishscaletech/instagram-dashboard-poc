export interface GraphAPIParams {
    access_token: string;
    fields: string;
    id?: string;
    since?: number;
    until?: number;
    limit?: number;
}
export interface Engagement {
    day_30: number;
    day_60: number;
    day_90: number;
    all: number;
}

export interface MediaParams {
    access_token: string;
    instagram_account_id: string;
    days?: number | null | undefined;
    limit?: number;
}

export interface EngagementRate {
    access_token: string;
    instagram_account_id: string;
    days?: number | null;
    followers_count: number;
}
