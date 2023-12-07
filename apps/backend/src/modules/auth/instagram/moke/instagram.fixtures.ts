import { MockType } from '../../../../utils/type.util';
import { InstagramService } from '../instagram.service';
import { authorizeResponse, loginResponse, registerResponse } from './instagram.moke';

export const mockInstagramService: MockType<InstagramService> = {
    login: jest.fn().mockResolvedValue(loginResponse),
    authorize: jest.fn().mockResolvedValue(authorizeResponse),
    register: jest.fn().mockResolvedValue(registerResponse),
};
