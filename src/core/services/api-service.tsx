import axios from 'axios';
import { stringify } from 'qs';

export const apiClient = axios.create({
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer(params: any) {
        return stringify(params);
    },
});
