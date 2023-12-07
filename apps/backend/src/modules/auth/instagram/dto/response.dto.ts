import { ApiProperty } from '@nestjs/swagger';
import { GRAPH_API_ENUM, INSTAGRAM_URL } from '../../../../constants';
import { Engagement } from '../interface';

export class AuthResponseDto {
    profile_url?: string;
    followers_count!: number;
    media_count!: number;
    engagement_per!: number;
    media!: MediaResponseDto[];

    constructor(data: { media_info: any; profile_res: any; post_engagement_rate: number }) {
        if (data.profile_res.username) {
            this.profile_url = `${INSTAGRAM_URL}/${data.profile_res.username}`;
        }
        this.followers_count = data.profile_res.followers_count;
        this.media_count = data.profile_res.media_count;
        this.engagement_per = data.post_engagement_rate;
        this.media = data.media_info.data.map((media: any) => {
            const views =
                media.media_product_type === GRAPH_API_ENUM.REELS
                    ? media.insights.data.find(
                          (insight: any) => insight.name === GRAPH_API_ENUM.PLAYS,
                      )
                    : media.insights.data.find(
                          (insight: any) => insight.name === GRAPH_API_ENUM.VIDEO_VIEWS,
                      );
            return new MediaResponseDto(media, views);
        });
    }
}

export class MediaResponseDto {
    @ApiProperty({ default: '' })
    id!: string;

    @ApiProperty({ default: 0 })
    comments_count!: number;

    @ApiProperty({ default: 0 })
    like_count!: number;

    @ApiProperty({ default: 0 })
    view_count!: number;

    @ApiProperty({ default: '' })
    media_type!: string;

    @ApiProperty({ default: '' })
    timestamp!: number;

    @ApiProperty({ default: '' })
    media_product_type!: string;

    @ApiProperty({ default: '' })
    media_url!: string;

    @ApiProperty({ default: '' })
    post_url!: string;

    @ApiProperty({ default: '' })
    thumbnail_url!: string | null;

    constructor(media: any, views: any) {
        this.id = media.id;
        this.comments_count = media?.comments_count;
        this.like_count = media.like_count;
        this.view_count = views?.values[0]?.value;
        this.media_type = media.media_type;
        this.timestamp = new Date(media.timestamp).getTime();
        this.media_product_type = media?.media_product_type;
        this.media_url = media?.media_url || '';
        this.post_url = media.permalink;
        this.thumbnail_url = media?.thumbnail_url ?? null;
    }
}

export class authResponseDto {
    @ApiProperty({ default: '' })
    access_token!: string;

    @ApiProperty({ default: '' })
    firebase_auth_token!: string;

    @ApiProperty({ default: '' })
    long_lived_token!: string;

    constructor(data: any, firebase_auth_token: string) {
        this.access_token = data.access_token;
        this.firebase_auth_token = firebase_auth_token;
        this.long_lived_token = data.long_lived_token;
    }
}

export class EngagementPer {
    @ApiProperty({ default: 0 })
    day_30!: number;

    @ApiProperty({ default: 0 })
    day_60!: number;

    @ApiProperty({ default: 0 })
    day_90!: number;

    @ApiProperty({ default: 0 })
    all!: number;

    constructor(engagement: Engagement) {
        this.day_30 = Number(engagement.day_30.toFixed(2));
        this.day_60 = Number(engagement.day_60.toFixed(2));
        this.day_90 = Number(engagement.day_90.toFixed(2));
        this.all = Number(engagement.all.toFixed(2));
    }
}
export class InstaInfoResponseDto {
    @ApiProperty({ default: '' })
    profile_url?: string;

    @ApiProperty({ default: '' })
    followers_count!: number;

    @ApiProperty({ default: '' })
    media_count!: number;

    @ApiProperty({ default: EngagementPer })
    engagement_rates!: EngagementPer;

    @ApiProperty({ default: '' })
    media!: MediaResponseDto;

    constructor(data: any) {
        if (data.username) {
            this.profile_url = `${INSTAGRAM_URL}/${data.username}`;
        }
        this.followers_count = data.followers_count;
        this.media_count = data.media_count;
        this.engagement_rates = new EngagementPer(data.engagement_rates);
        this.media = data.media;
    }
}
