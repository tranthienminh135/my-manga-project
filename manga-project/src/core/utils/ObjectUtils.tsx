import { ResponseGoogleLogin } from '../types/base';
import { InitialUserInfo, UserGoogleInfo } from '../types/user';

export const isEmpty = (object: any) => {
    if (object === undefined || object === null) {
        return false;
    }

    return true;
};

export const initialState: InitialUserInfo = {
    userGoogleInfo: {
        aud: '',
        azp: '',
        email: '',
        email_verified: false,
        exp: -1,
        given_name: '',
        iat: -1,
        iss: '',
        jti: '',
        name: '',
        nbf: -1,
        picture: '',
        sub: '',
        isAdmin: false,
    },
};

export const initialGoogleLoginDataState: ResponseGoogleLogin = {
    clientId: '',
    credential: '',
    select_by: '',
};
