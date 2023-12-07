import {
    AuthRequestDto,
    InstaInfoResponseDto,
    MediaResponseDto,
    RegisterRequestDto,
    authResponseDto,
} from '../dto';

export const loginResponse: { url: string } = {
    url: `http://localhost?client_id=123456&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&display=page&redirect_uri=http://localhost&response_type=token&scope='email,instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement,business_management,read_insights,pages_manage_posts,pages_manage_engagement,pages_manage_metadata,pages_read_user_content'`,
};

export const authorizeResponse: authResponseDto = {
    access_token: 'EAADoFkfCofc',
    firebase_auth_token:
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTcwMTQzMDIwNywiZXhwIjoxNzAxNDMzODA3LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1zdHJzNEBpbnN0YWdyYW0tZGFzaGJvYXJkLWYwN2EzLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstc3RyczRAaW5zdGFncmFtLWRhc2hib2FyZC1mMDdhMy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6IjE3ODQxNDU2ODU2OTA3Njc0IiwiY2xhaW1zIjp7ImVtYWlsIjoiIn19.bHBkqGZZ58WYrl42k7x7-Vm4WS52cVQ3jM-xXK01euWfjQPZ490fnIfYdP2pXccfjoA6tXLJMy41YMpRQ9O4CV-7nkcUSeOlqlKuTNlCEYlRzyA9lbI64acG3hc168VB_6q824SvDWNObwvY3W9GBoP3IHUGq0ITIW9UfY5rdY59ce3CKs-7Nv3YgYozChlQIKumkcx57BXqE3TDQxT5Q9bv0iMiIf6jtW2jyg8NLQzVSIvxnEdhdnHY8OQb-SjPXa7upLB0aP0JustlY0fo_3iMwJ_XlwPBYWCS2ah0gMR8fsOYCJQw_7yFfHhDYxoAqSknbPJMsVxSRBQBYqrrEg',
    long_lived_token: 'EAADoFkfCo',
};

export const mokeInstaMedia: MediaResponseDto[] = [
    {
        id: '18028668481619916',
        comments_count: 1,
        like_count: 1,
        view_count: 0,
        media_type: 'IMAGE',
        timestamp: 1700469206000,
        media_product_type: 'REEL',
        media_url: '',
        post_url: '',
        thumbnail_url: '',
    },
];

export const registerResponse: InstaInfoResponseDto = {
    followers_count: 0,
    media_count: 0,
    engagement_rates: {
        day_30: 2.5,
        day_60: 2.5,
        day_90: 2.5,
        all: 2.5,
    },
    media: {
        id: '18028668481619916',
        comments_count: 1,
        like_count: 1,
        view_count: 0,
        media_type: 'IMAGE',
        timestamp: 1700469206000,
        media_product_type: 'REEL',
        media_url: '',
        post_url: '',
        thumbnail_url: '',
    },
};

export const authorizeRequest: AuthRequestDto = {
    access_token: 'EAADoFkfCofc',
    long_lived_token: 'EAADoFkfCo',
};

export const registerRequest: RegisterRequestDto = {
    access_token: 'EAADoFkfCofc',
    long_lived_token: 'EAADoFkfCo',
    id_token:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE2YzYzNTNmMmEzZWMxMjg2NTA1MzBkMTVmNmM0Y2Y0NTcxYTQ1NTciLCJ0eXAiOiJKV1QifQ.eyJlbWFpbCI6IiIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9pbnN0YWdyYW0tZGFzaGJvYXJkLWYwN2EzIiwiYXVkIjoiaW5zdGFncmFtLWRhc2hib2FyZC1mMDdhMyIsImF1dGhfdGltZSI6MTcwMDY0OTE5NSwidXNlcl9pZCI6IjE3ODQxNDU2ODU2OTA3Njc0Iiwic3ViIjoiMTc4NDE0NTY4NTY5MDc2NzQiLCJpYXQiOjE3MDA2NDkxOTUsImV4cCI6MTcwMDY1Mjc5NSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6e30sInNpZ25faW5fcHJvdmlkZXIiOiJjdXN0b20ifX0.JBGJmqJADNLQGpmJkMEb19p362vVIIqR7LOLBB3ZiFAh8fhVwqbJjkID6McSB2apH-BZgzUQ7yABUeDDDoMkZq1ubJcGFnHzDCIfuewa8a5a3f0bj8-jBeZqxVD7VEdxc8tDhN8BJGuWW-hQcsUkRpX2oSOdhG6aq7ST2fhbt1IdZmsE7dhexKkIuZf6igJ9UOw8Fzr4AXj1qV3CPaKc-hZRqc_FlmNbkGVrMcuTTYf0OoXAkZNWwQJjNmBq2xXZEemjyFct_we5s62NGeHeQjx0wnGcz7liMDYSQK8YFqiHnRTpkCcjPaD98JlLkDvGXk1Oim4kkyLr49MMwFsenw',
};

export const mockGetInstaAct = {
    data: [
        {
            connected_instagram_account: {
                id: '17841456856907674',
            },
            id: '110501098332205',
        },
    ],
    paging: {
        cursors: {
            before: 'QVFIUk55d3V4ZAkVMbjU4TFloay1NTGNLRjkxLWx4TFR1UUZA3TGllbkhQcE9GOExVWVc1azZAzVkk2bFY1X1dTRlhuNko5Nmx5eFYtMmRNdGJ1OVJXb0h2S3Nn',
            after: 'QVFIUk55d3V4ZAkVMbjU4TFloay1NTGNLRjkxLWx4TFR1UUZA3TGllbkhQcE9GOExVWVc1azZAzVkk2bFY1X1dTRlhuNko5Nmx5eFYtMmRNdGJ1OVJXb0h2S3Nn',
        },
    },
};

export const mockGetInstaProfile = {
    name: 'Test',
    id: '110501098332205',
};

export const mockGetMediaInfo = {
    data: [
        {
            media_url:
                'https://scontent.cdninstagram.com/o1/v/t16/f1/m82/AE4AC079FC5222BF377B0FA1CC906687_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=107&vs=189908367530276_4124113679&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9BRTRBQzA3OUZDNTIyMkJGMzc3QjBGQTFDQzkwNjY4N192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dDcDNFQmkyRS10QjhEd1lBTXI0TDg1eHk0d0picV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJtLQ8svG%2Bu1AFQIoAkMzLBdAGA5WBBiTdRgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfAGE9KOoWWiWIOeDVbNF97eiVhX6L7K_DGZSuxVe-TUdA&oe=656B782D&_nc_sid=1d576d&_nc_rid=a705680c6a',
            like_count: 1,
            comments_count: 0,
            timestamp: '2023-11-20T11:33:35+0000',
            permalink: 'https://www.instagram.com/reel/Cz3cca0qz4h/',
            id: '18026144563782894',
        },
    ],
    paging: {
        cursors: {
            before: 'QVFIUklFY0UxVHMwQkl5b1RrWFYyYkRCQS0wdW9VVHdVU3VQcTlvUHRSdXVVdDgtSndROWZArRkFOa1Bya29Ic1hJZAU9FR1REaFRkbDJkUHVHWTVnbzhhRlJn',
            after: 'QVFIUk1TTFVuM0RVZAjJMM25QZA0NvRXpsTVNEenZAORjFUOXphSGo3eEttSDdVUlk5aGRKdmtXMEs1RGQzb0RuenB2MUNaYkNvcVN3QU5acVlOWnFBRW1qZA2V3',
        },
        next: 'https://graph.facebook.com/v18.0/17841456856907674/media?access_token=EAADoFkfCofcBO6ho7eSs21vKt7n6wr2Qwd2NkNt23ZA725RUS6wzt09DDTDZCDlRY7M08IbidBN9LyFm44n8zNAtaylMJdnLC2uHnmwJRJe7vTLZBGUg686zt9MJXwlPKLNIdyuZB23QWo5AtZADKkBkD451xI8IgMHSl8SaQoqZCPZB0yzOZCQYNSuaEV7LTzWbZCZBYZD&since=1700279100&until=1700502360&limit=2&fields=media_url,like_count,comments_count,timestamp,caption,permalink&after=QVFIUk1TTFVuM0RVZAjJMM25QZA0NvRXpsTVNEenZAORjFUOXphSGo3eEttSDdVUlk5aGRKdmtXMEs1RGQzb0RuenB2MUNaYkNvcVN3QU5acVlOWnFBRW1qZA2V3',
    },
};

export const mokeInstaData = {
    username: 'undefined',
    profile_url: 'https://www.instagram.com/undefined',
    followers_count: 0,
    media_count: 0,
    engagement_rates: { day_30: 2.5, day_60: 2.5, day_90: 2.5, all: 2.5 },
    media: mokeInstaMedia,
};
