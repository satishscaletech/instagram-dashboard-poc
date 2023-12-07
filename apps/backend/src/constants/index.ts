export const FB_LOGIN_URL = 'https://www.facebook.com/dialog/oauth';

export const FB_GRAPH_API_URL = 'https://graph.facebook.com/v18.0';

export const INSTAGRAM_URL = 'https://www.instagram.com';

export const INSTAGRAM_SCOPE =
    'email,instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement,business_management,read_insights,pages_manage_posts,pages_manage_engagement,pages_manage_metadata,pages_read_user_content';

export const EXTRAS = { setup: { channel: 'IG_API_ONBOARDING' } };
export const MEDIA_FIELDS =
    'comments_count,like_count,media_type,permalink,thumbnail_url,timestamp,id,media_product_type,media_url,insights.metric(reach,saved,video_views,plays)';

export const ACCOUNT_FIELDS = 'email,connected_instagram_account';

export const INSTAGRAM_PROFILE_FIELDS = 'username,followers_count,media_count';

export const GRAPH_API_ENUM = {
    REELS: 'REELS',
    PLAYS: 'plays',
    VIDEO_VIEWS: 'video_views',
    FEED: 'FEED',
};

export const FIREBASE_ENUM = {
    USERS: 'Users',
    PROPERTIES: 'properties',
};
