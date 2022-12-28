import ReportIcon from '@mui/icons-material/Report';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { UrlFeApp } from '../../core/constants/common';
import './error.scss';

export default function Page404NotFound() {
    return (
        <div className="page-not-found">
            <div className="error-wrapper">
                <div className="error-box">
                    <h1>404</h1>
                    <h2 className="h2 mb-3">
                        <ReportIcon style={{ fontSize: '2em' }} />
                        Oops! Trang không tồn tại!
                    </h2>
                    <p className="h4 font-weight-normal"> Trang của bạn yêu cầu không tìm thấy. </p>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={UrlFeApp.HOME}
                        sx={{ textTransform: 'uppercase', mt: 2 }}
                    >
                        Trở lại trang chủ
                    </Button>
                </div>
            </div>
        </div>
    );
}
