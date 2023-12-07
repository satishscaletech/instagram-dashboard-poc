import { InternalServerErrorException } from '@nestjs/common';
import firebaseAdmin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { FIREBASE_ENUM } from '../../constants';
import { FirebaseUserNode } from '../../interface';
import { loadEnv, getEnv } from '../env.util';

loadEnv();
const serviceAccount = require(`../../data/firebase-development.json`);

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: getEnv('FIREBASE_DB_URL') || '',
});

export class FirebaseService {
    public findUserByFirebaseId = async (user: DecodedIdToken): Promise<any> => {
        const userRecord = await firebaseAdmin.auth().getUser(user.uid);
        return userRecord;
    };

    public createUserNode = async (data: FirebaseUserNode): Promise<any> => {
        try {
            await Promise.all([
                this.updateUserNode(data.fid, {
                    instagram_info: data.instagram_info,
                    access_token: data.access_token,
                    long_lived_token: data.long_lived_token,
                }),
            ]);
            return data;
        } catch (e) {
            console.log('Error Create user in firebase', e);
        }
    };

    public updateUserNode = async (fid: string, data: any) => {
        try {
            await firebaseAdmin
                .database()
                .ref()
                .child(FIREBASE_ENUM.USERS)
                .child(fid)
                .child(FIREBASE_ENUM.PROPERTIES)
                .update({ ...data });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    };

    public findUserByIdToken = async (idToken: string): Promise<any> => {
        try {
            const user = await firebaseAdmin.auth().verifyIdToken(idToken);
            return await this.findUserByFirebaseId(user);
        } catch (e) {}
    };

    public firebaseCreateCustomToken = async (
        id: string,
        payload: { email: string },
    ): Promise<string> => {
        try {
            return await firebaseAdmin
                .auth()
                .createCustomToken(id, payload)
                .then(async (customToken) => {
                    return customToken;
                });
        } catch (error) {
            console.log('ERR : firebaseCreateCustomToken - ', error);
            return '';
        }
    };
}

const Firebase = new FirebaseService();

export default Firebase;
