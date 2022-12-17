export interface DataResSuccess<T> {
    code: string;
    message: string;
    data: T | null | undefined;
    status: 'ERROR' | 'OK';
}

export type ResponseGoogleLogin = {
    clientId: string;
    credential: string;
    select_by: string;
};

export type LoginModalProps = {
    isOpen: boolean;
    closeFunc: Function;
    callBackSuccessLogin: Function;
    callBackErrorLogin: Function;
};

export type AlertBarProps = {
    message: string;
    isOpen: boolean;
    closeFunc: Function;
};
