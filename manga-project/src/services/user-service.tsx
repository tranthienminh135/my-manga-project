import { UrlApiPaths } from '../core/constants/common';
import { get } from '../core/services/api-service';
import { DataResSuccess } from '../core/types/base';

export const getUserInfo = async () => {
    const res = await get(UrlApiPaths.USER_INFO, null);
    return res;
};
