import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { getInstaAct, getInstaProfile, getMediaInfo } from '../../../utils/instagram.util';
import {
    ACCOUNT_FIELDS,
    FB_LOGIN_URL,
    GRAPH_API_ENUM,
    INSTAGRAM_PROFILE_FIELDS,
    INSTAGRAM_SCOPE,
    INSTAGRAM_URL,
    MEDIA_FIELDS,
} from '../../../constants';
import { authResponseDto, InstaInfoResponseDto, MediaResponseDto } from './dto/response.dto';
import Firebase from '../../../utils/firebase';
import { AuthRequestDto, RegisterRequestDto } from './dto';
import { getEnv, loadEnv } from '../../../utils';
import { EngagementRate, MediaParams } from './interface';
import { MESSAGES } from '../../../lang/api-messages';
loadEnv();

@Injectable()
export class InstagramService {
    constructor() {}

    /**
     * Initiates the login process by constructing the Instagram login URL.
     * This function generates the URL required for users to authenticate with Instagram.
     * It creates the URL using predefined environment variables and constants for client ID,
     * redirect URI, and required scopes for authentication.
     *
     * @returns {Promise<{ url: string }>} A Promise containing the constructed Instagram login URL.
     * @throws {InternalServerErrorException} Throws an exception if an error occurs while constructing the URL.
     */
    public async login(): Promise<{ url: string }> {
        try {
            const url = `${FB_LOGIN_URL}?client_id=${getEnv(
                'INSTAGRAM_APP_ID',
            )}&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&display=page&redirect_uri=${getEnv(
                'INSTAGRAM_REDIRECT_URL',
            )}&response_type=token&scope=${INSTAGRAM_SCOPE}`;

            return { url };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    /**
     * Authorizes a user by fetching Instagram account details and generating a Firebase authentication token.
     * This function retrieves account information from Instagram using the provided access token,
     * then generates a Firebase authentication token associated with the Instagram account ID.
     *
     * @param {AuthRequestDto} data An object containing user authentication data, including an access token.
     * @returns {Promise<authResponseDto>} A Promise containing the authentication response data
     *                                     (including the provided data and Firebase authentication token).
     * @throws {InternalServerErrorException} Throws an exception if an error occurs during authorization.
     */
    public async authorize(data: AuthRequestDto): Promise<authResponseDto> {
        try {
            const account = await getInstaAct({
                access_token: data.access_token,
                fields: ACCOUNT_FIELDS,
            });

            if (!account && !account.data.lenth) {
                throw new BadRequestException(MESSAGES.connectedAccountNotFound);
            }

            const instagram_account_id = account.data[0].connected_instagram_account.id;
            const firebase_auth_token = await this.getFirebaseToken(`${instagram_account_id}`);

            return new authResponseDto(data, firebase_auth_token);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    /**
     * Registers a user by fetching and organizing Instagram-related data, calculating engagement rates,
     * and storing the information in Firebase associated with the user.
     * This function performs several steps:
     * 1. Retrieves Firebase user details using the provided ID token.
     * 2. Gathers Instagram account, profile, media, and engagement rate data based on the provided access token.
     * 3. Constructs a structured response containing user-specific Instagram information.
     * 4. Stores this information in Firebase under the user's node.
     *
     * @param {RegisterRequestDto} data An object containing user registration data, including access and ID tokens.
     * @returns {Promise<InstaInfoResponseDto>} A Promise containing structured Instagram information as a response.
     * @throws {InternalServerErrorException} Throws an exception if an error occurs during the registration process.
     */
    public async register(data: RegisterRequestDto): Promise<InstaInfoResponseDto> {
        try {
            const firebase_user = await Firebase.findUserByIdToken(data.id_token);

            const token = data.access_token;

            const account = await getInstaAct({
                access_token: token,
                fields: ACCOUNT_FIELDS,
            });

            const instagram_account_id = account.data[0].connected_instagram_account.id;

            const profile_data = await getInstaProfile({
                access_token: token,
                fields: INSTAGRAM_PROFILE_FIELDS,
                id: instagram_account_id,
            });

            const media = await this.getMedia({
                access_token: data.access_token,
                instagram_account_id,
            });

            console.log('media', media);

            const engagement_params = {
                instagram_account_id,
                access_token: data.access_token,
                followers_count: profile_data.followers_count,
            };

            const instagram_data = {
                username: profile_data.username,
                profile_url: `${INSTAGRAM_URL}/${profile_data.username}`,
                followers_count: profile_data.followers_count,
                media_count: profile_data.media_count,
                engagement_rates: {
                    day_30: await this.getEngementRate({ ...engagement_params, days: 30 }),
                    day_60: await this.getEngementRate({ ...engagement_params, days: 60 }),
                    day_90: await this.getEngementRate({ ...engagement_params, days: 90 }),
                    all: await this.getEngementRate({ ...engagement_params, days: null }),
                },
                media: media.data.map((media: any) => {
                    const views =
                        media.media_product_type === GRAPH_API_ENUM.REELS
                            ? media.insights.data.find(
                                  (insight: any) => insight.name === GRAPH_API_ENUM.PLAYS,
                              )
                            : media.insights.data.find(
                                  (insight: any) => insight.name === GRAPH_API_ENUM.VIDEO_VIEWS,
                              );
                    return new MediaResponseDto(media, views);
                }),
            };

            const instagram_info_res = new InstaInfoResponseDto(instagram_data);

            //Store data in firebase
            await Firebase.createUserNode({
                fid: firebase_user.uid,
                instagram_info: instagram_info_res,
                access_token: data.access_token,
                long_lived_token: data.long_lived_token,
            });

            return instagram_info_res;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    /**
     * Retrieves media information associated with a specific Instagram account based on provided parameters.
     * This function fetches media data such as posts, reels, or videos using the Instagram API,
     * considering optional parameters like time frame and limit.
     *
     * @param {MediaParams} data An object containing parameters required to fetch media information,
     *                            including access token, account ID, time frame, and limit.
     * @returns {Promise<any>} A Promise containing the fetched media information based on the provided parameters.
     * @throws {InternalServerErrorException} Throws an exception if an error occurs during the media retrieval process.
     */
    public async getMedia(data: MediaParams) {
        try {
            const params: {
                since?: number;
                until?: number;
                limit?: number;
            } = {};

            if (data.days) {
                const day = data.days ? data.days : 30;
                params.until = Math.floor(Date.now() / 1000);
                params.since = Math.floor(Date.now() / 1000 - day * 24 * 60 * 60);
            }

            if (data.limit) {
                params.limit = data.limit;
            }

            const media_info = await getMediaInfo({
                access_token: data.access_token,
                id: data.instagram_account_id,
                fields: MEDIA_FIELDS,
                ...params,
            });

            return media_info;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    /**
     * Calculates the engagement rate for a given Instagram account based on provided data.
     * This function computes the engagement rate by analyzing likes, comments, and views
     * from different types of media (photos, videos, reels) and their respective counts.
     *
     * @param {EngagementRate} data An object containing parameters required to compute engagement rates,
     *                              including access token, account ID, time frame, and followers count.
     * @returns {Promise<number>} A Promise containing the calculated engagement rate for the Instagram account.
     * @throws {InternalServerErrorException} Throws an exception if an error occurs during the engagement rate calculation.
     */
    private async getEngementRate(data: EngagementRate): Promise<number> {
        try {
            let photo_like = 0;
            let photo_comments = 0;
            let video_like = 0;
            let video_comments = 0;
            let video_views = 0;

            const media_info = await this.getMedia({
                access_token: data.access_token,
                instagram_account_id: data.instagram_account_id,
                days: data.days,
            });

            for (const item of media_info.data) {
                if (item.media_product_type === GRAPH_API_ENUM.FEED) {
                    photo_like += item.like_count;
                    photo_comments += item.comments_count;
                }

                if (item.media_product_type === GRAPH_API_ENUM.REELS) {
                    const views = item.insights.data.find(
                        (insight: any) => insight.name === GRAPH_API_ENUM.PLAYS,
                    );

                    video_like += item.like_count;
                    video_comments += item.comments_count;
                    video_views += views.values[0].value;
                }
            }

            const post_engagement_rate =
                (photo_like + photo_comments) / data.followers_count +
                (video_like + video_comments + video_views) / data.followers_count;

            return post_engagement_rate;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    /**
     * Retrieves a Firebase authentication token for a given user ID.
     * This function generates a Firebase custom token associated with the provided user ID.
     *
     * @param {string} id The unique identifier for the user.
     * @returns {Promise<any>} A Promise containing the Firebase authentication token for the specified user ID.
     */
    public async getFirebaseToken(id: string) {
        return await Firebase.firebaseCreateCustomToken(id, { email: '' });
    }
}
