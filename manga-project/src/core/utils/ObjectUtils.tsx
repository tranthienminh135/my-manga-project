import { InitialResponseGoogle, ResponseGoogleLogin } from '../types/base';
import { InitialUserInfo } from '../types/user';

export const isEmpty = (object: any) => {
    if (object === undefined || object === null) {
        return false;
    }

    return true;
};

export const initialUserGoogleInfoState: InitialUserInfo = {
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

export const initialGoogleLoginDataState: InitialResponseGoogle = {
    responseGoogle: {
        clientId: '',
        credential: '',
        select_by: '',
    },
};
