export enum RoleUser {
    SYS_ADMIN = 'SYS_ADMIN',
    ORG_ADMIN = 'ADMIN',
    ORG_USER = 'USER',
}

export type UserGoogleInfo = {
    aud: string;
    azp: string;
    email: string;
    email_verified: boolean;
    exp: number;
    given_name: string;
    iat: number;
    iss: string;
    jti: string;
    name: string;
    nbf: number;
    picture: string;
    sub: string;
    isAdmin: boolean;
};

export type InitialUserInfo = {
    userGoogleInfo: UserGoogleInfo;
};
