import AdbIcon from '@mui/icons-material/Adb';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { googleLogout } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    ADMIN_PATH_LIST,
    ALERT_INFO,
    ERROR_CODE,
    PERMISSION,
    UrlFeApp,
    YOUTUBE_PARAMS,
} from '../../core/constants/common';
import { googleLoginActions } from '../../core/redux/slice/login-google-slice';
import { playlistItemsActions } from '../../core/redux/slice/playlist-items-slice';
import { getPlaylistsData, playlistsActions } from '../../core/redux/slice/playlists-slice';
import { userActions } from '../../core/redux/slice/user-slice';
import { ResponseGoogleLogin } from '../../core/types/base';
import { UserGoogleInfo } from '../../core/types/user';
import { YoutubePlaylistItems } from '../../core/types/youtube-playlist-items';
import { YoutubePlaylists } from '../../core/types/youtube-playlists';
import { initialGoogleLoginDataState, initialUserGoogleInfoState } from '../../core/utils/ObjectUtils';
import { getYoutubePlaylistItems, getYoutubePlaylists } from '../../services/youtube-service';
import AlertBar from '../../shared-components/alert/alert-bar';
import LoginModal from '../../shared-components/modal/login-modal';
import './app-bar.scss';

const pages = [
    {
        id: 0,
        name: 'Trang ch???',
        url: UrlFeApp.HOME,
        isAdmin: false,
    },
];
const adminPages = [
    {
        id: 1,
        name: 'Excel',
        url: UrlFeApp.EXCEL,
        isAdmin: true,
    },
];

const handleRenderPages = (isAdmin: boolean) => {
    if (isAdmin) {
        return [...pages, ...adminPages];
    } else {
        return [...pages];
    }
};

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export default function NavComponent() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState<UserGoogleInfo>(initialUserGoogleInfoState.userGoogleInfo);
    const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
    const [messageGoogleLogin, setMessageGoogleLogin] = useState<string>('');
    const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const youtubePlaylistsRedux: YoutubePlaylists = useSelector(getPlaylistsData);
    const [randomNumber, setRandomNumber] = useState<number>(Math.floor(Math.random() * YOUTUBE_PARAMS.KEY.length));

    useEffect(() => {
        const requestYoutubePlaylistsData = {
            contentDetails: YOUTUBE_PARAMS.CONTENT_DETAILS,
            id: YOUTUBE_PARAMS.ID,
            snippet: YOUTUBE_PARAMS.SNIPPET,
            localizations: YOUTUBE_PARAMS.LOCALIZATIONS,
            maxResults: YOUTUBE_PARAMS.MAX_RESULTS,
            status: YOUTUBE_PARAMS.STATUS,
            channelId: YOUTUBE_PARAMS.CHANNEL_ID,
            key: YOUTUBE_PARAMS.KEY[randomNumber],
        };
        getYoutubePlaylists(requestYoutubePlaylistsData)
            .then((youtubePlaylistsResponse: YoutubePlaylists) => {
                dispatch(playlistsActions.setPlaylistsData(youtubePlaylistsResponse));
            })
            .catch((err: any) => {
                if (+err.response.status === ERROR_CODE.ERROR_403) {
                    setRandomNumber(Math.floor(Math.random() * YOUTUBE_PARAMS.KEY.length));
                }
            });
    }, [dispatch, randomNumber]);

    useEffect(() => {
        const filterAllYoutubePlaylistItems = async (youtubePlaylistsParam: YoutubePlaylists) => {
            const youtubePlaylistItemsResponse: Array<YoutubePlaylistItems> = await Promise.all(
                youtubePlaylistsParam.items.map(async (data: any) => {
                    const requestYoutubePlaylistItemData = {
                        contentDetails: YOUTUBE_PARAMS.CONTENT_DETAILS,
                        id: YOUTUBE_PARAMS.ID,
                        snippet: YOUTUBE_PARAMS.SNIPPET,
                        maxResults: YOUTUBE_PARAMS.MAX_RESULTS,
                        status: YOUTUBE_PARAMS.STATUS,
                        playlistId: data.id,
                        key: YOUTUBE_PARAMS.KEY[randomNumber],
                    };
                    return await fetchGetYoutubePlaylistItems(requestYoutubePlaylistItemData);
                }),
            );
            dispatch(playlistItemsActions.setPlaylistItemsData(youtubePlaylistItemsResponse));
        };
        if (youtubePlaylistsRedux.items.length > 0 && youtubePlaylistsRedux.etag) {
            filterAllYoutubePlaylistItems(youtubePlaylistsRedux);
        }
    }, [youtubePlaylistsRedux, dispatch, randomNumber]);

    const fetchGetYoutubePlaylistItems = async (params: any) => {
        return await getYoutubePlaylistItems(params);
    };

    useEffect(() => {
        if (location.pathname === UrlFeApp.DEFAULT) {
            navigate(UrlFeApp.HOME);
        }
    }, [location, location.pathname, navigate]);

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLoginSuccess = (successData: ResponseGoogleLogin) => {
        if (successData) {
            dispatch(googleLoginActions.setGoogleLoginData(successData));
            if (successData.credential) {
                const respData: UserGoogleInfo = jwtDecode(successData.credential);
                respData.isAdmin = PERMISSION.ADMIN_EMAIL?.some((data: string) => data === respData.email)
                    ? true
                    : false;
                dispatch(userActions.setUserInfo(respData));
                setUserInfo(respData);
                setAnchorElUser(null);
                setMessageGoogleLogin(ALERT_INFO.LOGIN.SUCCESS);
                setIsOpenAlert(true);
            }
        }
    };

    const handleLoginFailed = () => {
        setMessageGoogleLogin(ALERT_INFO.LOGIN.FAILED);
    };

    const handleGoogleLogout = () => {
        googleLogout();
        dispatch(googleLoginActions.setGoogleLoginData(initialGoogleLoginDataState.responseGoogle));
        dispatch(userActions.setUserInfo(initialUserGoogleInfoState.userGoogleInfo));
        setUserInfo(initialUserGoogleInfoState.userGoogleInfo);
        setMessageGoogleLogin(ALERT_INFO.LOGOUT.SUCCESS);
        setIsOpenAlert(true);
        if (ADMIN_PATH_LIST.some((data: any) => data === location.pathname)) {
            navigate(UrlFeApp.HOME);
        }
    };

    const handleCloseModal = () => {
        setIsOpenLoginModal(false);
    };

    const handleOpenLoginModal = () => {
        setIsOpenLoginModal(true);
    };

    const handleCloseAlert = () => {
        setIsOpenAlert(false);
    };

    const handleTargetNav = (url: string) => {
        navigate(url);
    };

    const handleSearchVideo = () => {
        console.log('name', 'value');
    };

    return (
        <>
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TTM
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {handleRenderPages(userInfo.isAdmin).map((page) => (
                                    <MenuItem key={page.id} onClick={() => handleTargetNav(page.url)}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {handleRenderPages(userInfo.isAdmin).map((page) => (
                                <Button
                                    key={page.id}
                                    onClick={() => handleTargetNav(page.url)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                        <IconButton onClick={handleSearchVideo}>
                            <SearchIcon sx={{ color: 'white' }} />
                        </IconButton>

                        {userInfo.email_verified ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Menu item">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar alt={userInfo.name} src={userInfo.picture} />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu} className="fw-bold">
                                        <Chip
                                            color={`${userInfo.isAdmin ? 'error' : 'success'}`}
                                            label={`${userInfo.name} - ${
                                                userInfo.isAdmin ? '[Ch??n ti??n]' : '[Luy???n kh?? k???]'
                                            }`}
                                            icon={<PersonIcon />}
                                        />
                                    </MenuItem>
                                    <MenuItem onClick={handleGoogleLogout}>
                                        <Button color="primary" startIcon={<LogoutIcon fontSize="small" />}>
                                            ????ng xu???t
                                        </Button>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            <Button
                                color="inherit"
                                startIcon={<LoginIcon fontSize="small" />}
                                onClick={handleOpenLoginModal}
                            >
                                ????ng nh???p
                            </Button>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
            <LoginModal
                callBackSuccessLogin={handleLoginSuccess}
                callBackErrorLogin={handleLoginFailed}
                isOpen={isOpenLoginModal}
                closeFunc={handleCloseModal}
            />
            <AlertBar message={messageGoogleLogin} isOpen={isOpenAlert} closeFunc={handleCloseAlert} />
        </>
    );
}
