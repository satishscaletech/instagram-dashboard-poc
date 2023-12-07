import { Test, TestingModule } from '@nestjs/testing';
import { InstagramService } from './instagram.service';
import { mockInstagramService } from './moke/instagram.fixtures';
import { getEnv } from '../../../utils';
import { FB_LOGIN_URL } from '../../../constants';
import {
    authorizeRequest,
    mokeInstaData,
    mokeInstaMedia,
    registerRequest,
    registerResponse,
} from './moke/instagram.moke';

jest.mock('../../../utils/instagram.util', () => ({
    getInstaAct: jest.fn().mockResolvedValue({
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
    }),

    getInstaProfile: jest.fn().mockResolvedValue({
        name: 'Test',
        id: '110501098332205',
    }),

    getMediaInfo: jest.fn().mockResolvedValue({
        data: [
            {
                media_url:
                    'https://scontent.cdninstagram.com/o1/v/t16/f1/m82/AE4AC079FC5222BF377B0FA1CC906687_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=107&vs=189908367530276_4124113679&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9BRTRBQzA3OUZDNTIyMkJGMzc3QjBGQTFDQzkwNjY4N192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dDcDNFQmkyRS10QjhEd1lBTXI0TDg1eHk0d0picV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJtLQ8svG%2Bu1AFQIoAkMzLBdAGA5WBBiTdRgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfAGE9KOoWWiWIOeDVbNF97eiVhX6L7K_DGZSuxVe-TUdA&oe=656B782D&_nc_sid=1d576d&_nc_rid=47aa17ac54',
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
    }),
}));

describe('InstagramService', () => {
    let instagramService: InstagramService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [InstagramService],
            providers: [
                {
                    provide: InstagramService,
                    useValue: mockInstagramService,
                },
            ],
        }).compile();

        instagramService = module.get<InstagramService>(InstagramService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('instagramService should be defined', () => {
        expect(instagramService).toBeDefined();
    });

    describe('login', () => {
        it('should generate a valid URL', async () => {
            const generatedUrl = await instagramService.login();
            const expectedClientId = getEnv('INSTAGRAM_APP_ID');
            const expectedRedirectUri = getEnv('INSTAGRAM_REDIRECT_URL');
            const expectedScope =
                'email,instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement,business_management,read_insights,pages_manage_posts,pages_manage_engagement,pages_manage_metadata,pages_read_user_content'; // Replace with your expected scope

            // Add your URL format validation here, ensuring it contains expected parameters
            expect(generatedUrl.url).toMatch(FB_LOGIN_URL);
            expect(generatedUrl.url).toContain(`client_id=${expectedClientId}`);
            expect(generatedUrl.url).toContain(`redirect_uri=${expectedRedirectUri}`);
            expect(generatedUrl.url).toContain(`scope=${expectedScope}`);
        });

        // it('should throw InternalServerErrorException if environment variables are missing', async () => {
        //     // Mock getEnv function to simulate missing environment variables
        //     jest.spyOn(global, 'getEnv').mockReturnValue(undefined); // Replace with appropriate mocking

        //     await expect(instagramService.login()).rejects.toThrow(InternalServerErrorException);

        //     // Ensure that the mock is restored after the test
        //     jest.restoreAllMocks();
        // });
    });

    describe('authorize', () => {
        it('should authorize and return auth1ResponseDto on success', async () => {
            await instagramService.authorize(authorizeRequest);
        });
    });

    describe('register', () => {
        it('should register and return InstaInfoResponseDto on success', async () => {
            // Call the register method and expect a successful response

            instagramService.getMedia = jest.fn().mockResolvedValueOnce(mokeInstaMedia);

            instagramService['getEngementRate'] = jest.fn().mockResolvedValueOnce(mokeInstaData);

            const result = await instagramService.register(registerRequest);

            // Assert that the result is of type InstaInfoResponseDto and has the expected properties
            expect(result).toBeInstanceOf(registerResponse);
            expect(result.followers_count).toBe(1000);
        });
    });
});
