export interface IEngagementRate {
    [key: string]: number;
}
export interface IEngagementRateOption {
    value: string;
    label: string;
}

export interface IResponseData {
    profile_url: string;
    followers_count: number;
    media_count: number;
    engagement_rates: IEngagementRate;
    media?: IMediaEntity[] | null;
}
export interface IMediaEntity {
    id: string;
    comments_count: number;
    like_count: number;
    view_count: number;
    media_type: string;
    timestamp: number;
    media_product_type: string;
    media_url: string;
    post_url: string;
    thumbnail_url?: string | null;
}
