import { InstaInfoResponseDto } from '../modules/auth/instagram/dto';

export interface FirebaseUserNode {
    fid: string;
    instagram_info: InstaInfoResponseDto;
    access_token: string;
    long_lived_token: string;
}
