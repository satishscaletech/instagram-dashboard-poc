import axios from 'axios';
import { FB_GRAPH_API_URL } from '../constants';
import { GraphAPIParams } from '../modules/auth/instagram/interface';

export const getInstaAct = async (params: GraphAPIParams) => {
    const response = await axios.get(`${FB_GRAPH_API_URL}/me/accounts`, {
        params: {
            access_token: params.access_token,
            fields: params.fields,
        },
    });
    return response ? response.data : null;
};

export const getInstaProfile = async (params: GraphAPIParams) => {
    const response = await axios.get(`${FB_GRAPH_API_URL}/${params.id}`, {
        params: {
            access_token: params.access_token,
            fields: params.fields,
        },
    });
    return response ? response.data : null;
};

export const getMediaInfo = async (params: GraphAPIParams) => {
    const response = await axios.get(`${FB_GRAPH_API_URL}/${params.id}/media`, {
        params: {
            ...params,
        },
    });
    return response ? response.data : null;
};
