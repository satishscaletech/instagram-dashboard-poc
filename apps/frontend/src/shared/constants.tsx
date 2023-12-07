import { IEngagementRateOption } from 'features/dashboard/interface/interface';
import { IconFollowers, IconImage, IconPin, IconThumbsUp } from './icons';

export const API_BASE_URL = process.env['REACT_APP_BACKEND']; //process.env['REACT_APP_REDIRECTED_URL'];

export const GRANT_TYPE = 'authorization_code';
export const IG_URL = 'https://api.instagram.com/oauth/access_token';

export const detailCards = [
    { label: 'Followers', icon: <IconFollowers />, value: 32934689 },
    { label: 'Total Posts', icon: <IconImage />, value: 1377 },
    { label: 'Avg. Engagement Rate', icon: <IconThumbsUp />, value: 5, appendingString: '%' },
    { label: 'Location', icon: <IconPin />, value: 'Ahmedabad' },
];

export const engagementOptions: IEngagementRateOption[] = [
    { value: 'all', label: 'All Time' },
    { value: 'day_30', label: '30 Days' },
    { value: 'day_60', label: '60 Days' },
    { value: 'day_90', label: '90 Days' },
];
