import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { ChangeVideoModalProps } from '../../core/types/base';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChangeVideoModal(props: ChangeVideoModalProps) {
    const { isOpen, closeFunc, okFunc, okBtn, closeBtn, content, status } = props;
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        closeFunc(status);
    };

    const handleOk = () => {
        okFunc(status);
        setOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            setOpen(isOpen);
        }
    }, [isOpen]);

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className="text-uppercase fw-bold">Thông báo</DialogTitle>
                <DialogContent>{content}</DialogContent>
                <DialogActions>
                    <Button variant="outlined" size="small" color="primary" onClick={handleClose}>
                        {closeBtn}
                    </Button>
                    <Button variant="outlined" size="small" color="secondary" onClick={handleOk}>
                        {okBtn}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
