import AdbIcon from '@mui/icons-material/Adb';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { googleLogout } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ALERT_INFO, ERROR_CODE, PERMISSION, UrlFeApp, YOUTUBE_PARAMS } from '../../core/constants/common';
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
import BasicSpeedDial from '../../shared-components/speed-dial/basic-speed-dial';
import './app-bar.scss';

const pages = ['Home', 'Pricing', 'Blog'];

export default function NavComponent() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState<UserGoogleInfo>(initialUserGoogleInfoState.userGoogleInfo);
    const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
    const [messageGoogleLogin, setMessageGoogleLogin] = useState<string>('');
    const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const navigate = useNavigate();
    const location = useLocation();
    const youtubePlaylistsRedux: YoutubePlaylists = useSelector(getPlaylistsData);
    const [randomNumber, setRandomNumber] = useState<number>(Math.floor(Math.random() * YOUTUBE_PARAMS.KEY.length));

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
        if (youtubePlaylistsRedux.items.length > 1) {
            filterAllYoutubePlaylistItems(youtubePlaylistsRedux);
        }
    }, [youtubePlaylistsRedux, dispatch, randomNumber]);

    const fetchGetYoutubePlaylistItems = async (params: any) => {
        return await getYoutubePlaylistItems(params);
    };

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
        if (location.pathname === UrlFeApp.DEFAULT) {
            navigate(UrlFeApp.HOME);
        }
    }, [location, location.pathname, navigate]);

    const handleSearchInput = () => {
        console.log({ searchInputValue });
    };

    const handleSearchInputChange = (e: any) => {
        setSearchInputValue(e.target.value);
    };

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        navigate(UrlFeApp.HOME);
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
                            LOGO
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
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
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
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <FormControl
                            sx={{ m: 1, width: '30ch', display: { xs: 'none', md: 'flex' } }}
                            variant="outlined"
                        >
                            <OutlinedInput
                                sx={{ color: 'white', maxHeight: '40px' }}
                                id="outlined-adornment-password"
                                className="border"
                                type="text"
                                placeholder="Tìm kiếm..."
                                onChange={handleSearchInputChange}
                                name="search"
                                value={searchInputValue}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleSearchInput}
                                            edge="end"
                                        >
                                            <SearchIcon sx={{ color: 'white' }} />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        {userInfo.email_verified ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Menu item">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={userInfo.name} src={userInfo.picture} />
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
                                            label={`${userInfo.name} - ${userInfo.isAdmin ? 'Võ Đế' : 'Võ Thần Quân'}`}
                                            icon={<PersonIcon />}
                                        />
                                    </MenuItem>
                                    <MenuItem onClick={handleGoogleLogout}>
                                        <Button color="primary" startIcon={<LogoutIcon fontSize="small" />}>
                                            Đăng xuất
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
                                Đăng nhập
                            </Button>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
            <BasicSpeedDial />
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
