import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { LoginModalProps, ResponseGoogleLogin } from '../../core/types/base';
import Login from '../../ui/login/google-login';
import AlertBar from '../alert/alert-bar';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginModal(props: LoginModalProps) {
    const { isOpen, closeFunc, callBackSuccessLogin, callBackErrorLogin } = props;
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        closeFunc();
    };

    useEffect(() => {
        if (isOpen) {
            setOpen(isOpen);
        }
    }, [isOpen]);

    const handleLoginSuccess = (successData: ResponseGoogleLogin) => {
        callBackSuccessLogin(successData);
        handleClose();
    };

    const handleLoginFailed = () => {
        callBackErrorLogin();
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className="text-uppercase fw-bold">Đăng nhập</DialogTitle>
                <DialogContent>
                    <Login callBackSuccessFn={handleLoginSuccess} callBackErrorFn={handleLoginFailed} />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
