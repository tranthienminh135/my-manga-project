import { GoogleLogin } from '@react-oauth/google';
import './login.scss';

interface LoginPropsType {
    callBackSuccessFn: Function;
    callBackErrorFn: Function;
}

export default function Login(props: LoginPropsType) {
    const { callBackSuccessFn, callBackErrorFn } = props;
    const handleLoginSuccess = (credentialResponse: any) => {
        callBackSuccessFn(credentialResponse);
    };
    const handleLoginError = () => {
        callBackErrorFn();
    };
    return (
        <GoogleLogin
            size="large"
            theme="filled_blue"
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            useOneTap
            auto_select={true}
        />
    );
}
