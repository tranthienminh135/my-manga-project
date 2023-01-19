import { Alert, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Background from '../../assets/background.png';
import { getPlaylistsData } from '../../core/redux/slice/playlists-slice';
import { getUserGoogleInfo } from '../../core/redux/slice/user-slice';
import CommentFacebook from '../facebook/comment-facebook-component';
import MainFeaturedPost from '../main-featured-post/main-featured-post';
import Main from '../main/main-component';
import Sidebar from '../side-bar/side-bar';

const adsListInit = [
    {
        id: 0,
        image: 'https://cf.shopee.vn/file/6c8fc3c9636ecb550fa40dfbcc4a13b1',
        isClose: true,
        url: 'https://shope.ee/5ztGui68zA',
        name: 'Tai Nghe Mèo Bluetooth Chụp Tai STN28, Có Micro, Âm Thanh Siêu Bass. Headphone Con Mèo Chơi Game, Học Online',
    },
    {
        id: 1,
        image: 'https://cf.shopee.vn/file/sg-11134201-22120-i402ii025xkvea',
        isClose: true,
        url: 'https://shope.ee/9emZI8WPq4',
        name: 'Loa thông minh Divoom Ditoo Plus 10W - Hình dáng máy tính cổ, màn hình LED 256 Full RGB',
    },
    {
        id: 2,
        image: 'https://cf.shopee.vn/file/68f314fab5b78aea54c44f04d2e84a3d',
        isClose: true,
        url: 'https://shope.ee/2pwFAQxQor',
        name: '[BH 1 đổi 1] Loa bluetooth Q5 bản cao cấp nhất hiện tại, kiêm đồng hồ, báo thức,nghe nhạc, nghe đài FM, hiển thị đèn led',
    },
    {
        id: 3,
        image: 'https://cf.shopee.vn/file/1b9af62237660a437794e0aaeb4f3d50',
        isClose: true,
        url: 'https://shope.ee/5AK9wyD9Mm',
        name: 'Loa Máy Tính ROBOT RS200 Hiệu Ứng RGB LED Đổi Màu - Âm Thanh HD Sống Động Chất Lượng Cao',
    },
    {
        id: 4,
        image: 'https://cf.shopee.vn/file/a3dfc45a9b4bc69caefd51a73abe5241',
        isClose: true,
        url: 'https://shope.ee/1L7RORastB',
        name: 'Đèn hoàng hôn 16 màu kèm điều khiển chuyển đổi 16 màu khác nhau RGB - Rabbi HCM',
    },
];
export default function Home() {
    const youtubePlaylistsRedux = useSelector(getPlaylistsData);
    const [youtubePlaylistsState, setYoutubePlaylistsState] = useState<any>();
    const [adsList, setAdsList] = useState(adsListInit);
    const userInfo = useSelector(getUserGoogleInfo);

    useEffect(() => {
        if (youtubePlaylistsRedux && youtubePlaylistsRedux.items.length > 0) {
            setYoutubePlaylistsState(youtubePlaylistsRedux);
        }
    }, [youtubePlaylistsRedux]);

    const handleClose = (id: number) => {
        setAdsList(
            adsList.map((ads: any) => {
                if (ads.id === id) {
                    ads.isClose = false;
                }
                return ads;
            }),
        );
    };

    return (
        <div style={{ overflow: 'auto', height: window.innerHeight - 100 }} className="border">
            <Grid container spacing={3} className="p-0">
                <Grid item md={12} lg={2} className="d-none d-xl-block">
                    {adsList.map((ads: any, index: number) => {
                        return (
                            index >= 0 &&
                            index <= 3 &&
                            !userInfo.isAdmin &&
                            ads.isClose && (
                                <Alert
                                    key={ads.id}
                                    onClose={() => handleClose(ads.id)}
                                    className="p-1 border"
                                    style={{
                                        height: '25%',
                                        overflow: 'hidden',
                                    }}
                                    severity="info"
                                    icon={false}
                                >
                                    <a href={ads.url} target="_blank" rel="noreferrer">
                                        <img
                                            src={ads.image}
                                            alt=""
                                            width="100%"
                                            style={{
                                                maxHeight: '100%',
                                            }}
                                        />
                                    </a>
                                    <a href={ads.url} target="_blank" rel="noreferrer">
                                        <div className="p-3 text-dark">{ads.name}</div>
                                    </a>
                                </Alert>
                            )
                        );
                    })}
                </Grid>
                <Grid item md={12} lg={8} className="border p-3">
                    <MainFeaturedPost
                        post={{
                            description: 'Truyện tranh siêu cấp hệ thống',
                            image: Background,
                            imageText: 'imageText',
                            linkText: 'Xem thêm',
                            title: 'Trần Thiên Minh',
                        }}
                    />
                    <Grid container sx={{ mt: 3 }} className="p-3">
                        <Main />
                        <Sidebar archives={youtubePlaylistsState ? youtubePlaylistsState.items : []} />
                    </Grid>
                    <Grid container sx={{ mt: 3 }}>
                        <CommentFacebook currentHref={window.location.href} />
                    </Grid>
                </Grid>
                <Grid item md={12} lg={2} className="d-none d-xl-block">
                    {adsList.map((ads: any, index: number) => {
                        return (
                            index > 3 &&
                            index <= 7 &&
                            !userInfo.isAdmin &&
                            ads.isClose && (
                                <Alert
                                    key={ads.id}
                                    onClose={() => handleClose(ads.id)}
                                    className="p-2 border"
                                    style={{
                                        height: '25%',
                                    }}
                                    severity="info"
                                    icon={false}
                                >
                                    <a href={ads.url} target="_blank" rel="noreferrer">
                                        <img
                                            src={ads.image}
                                            alt=""
                                            width="100%"
                                            style={{
                                                maxHeight: '100%',
                                            }}
                                        />
                                    </a>
                                    <a href={ads.url} target="_blank" rel="noreferrer">
                                        <div className="p-3 text-dark">{ads.name}</div>
                                    </a>
                                </Alert>
                            )
                        );
                    })}
                </Grid>
            </Grid>
        </div>
    );
}
