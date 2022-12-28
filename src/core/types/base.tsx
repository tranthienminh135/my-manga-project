export type ResponseGoogleLogin = {
    clientId: string;
    credential: string;
    select_by: string;
};

export type InitialResponseGoogle = {
    responseGoogle: ResponseGoogleLogin;
};

export type LoginModalProps = {
    isOpen: boolean;
    closeFunc: Function;
    callBackSuccessLogin: Function;
    callBackErrorLogin: Function;
};

export type ChangeVideoModalProps = {
    isOpen: boolean;
    closeFunc: Function;
    okFunc: Function;
    okBtn: string;
    closeBtn: string;
    content: string;
    status: string;
};

export type AlertBarProps = {
    message: string;
    isOpen: boolean;
    closeFunc: Function;
};
