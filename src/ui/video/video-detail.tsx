import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayDisabledIcon from '@mui/icons-material/PlayDisabled';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import UpdateIcon from '@mui/icons-material/Update';
import UpdateDisabledIcon from '@mui/icons-material/UpdateDisabled';
import { Chip, Tooltip, Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { UrlFeApp } from '../../core/constants/common';
import { getPlaylistItemDetail } from '../../core/redux/slice/playlist-item-detail-slice';
import { getPlaylistItemsData } from '../../core/redux/slice/playlist-items-slice';
import { YoutubePlaylistItems, YoutubePlaylistItemsItems } from '../../core/types/youtube-playlist-items';
import { initialPlaylistItemDetailState } from '../../core/utils/ObjectUtils';
import ChangeVideoModal from '../../shared-components/modal/change-video-modal';
import BottomAds from '../ads/bottom-ads';
import LeftAds from '../ads/left-ads';
import RightAds from '../ads/right-ads';
import TopAds from '../ads/top-ads';
import CommentFacebook from '../facebook/comment-facebook-component';

const initialChangeVideoModalData = {
    okBtn: '',
    closeBtn: '',
    content: '',
    status: '',
    isOpenChangeVideoModal: false,
};

type AutoColor = 'inherit' | 'error' | 'secondary' | 'primary' | 'success' | 'info' | 'warning' | undefined;

type AutoNext = {
    status: boolean;
    name: string;
    color: AutoColor;
};

const initAutoNext: AutoNext = {
    status: true,
    name: 'Đang bật',
    color: 'success',
};

const initAutoPlay: AutoNext = {
    status: true,
    name: 'Đang bật',
    color: 'success',
};

export default function VideoDetail() {
    const playlistItemDetailRedux = useSelector(getPlaylistItemDetail);
    const [playlistItemDetailState, setPlaylistItemDetailState] = useState<YoutubePlaylistItemsItems>(
        initialPlaylistItemDetailState.playlistItemDetail,
    );
    const navigate = useNavigate();
    const params = useParams();
    const [currentIndex, setCurrentIndex] = useState(-1);
    const playlistItemsRedux = useSelector(getPlaylistItemsData);
    const [playlistItemsReference, setPlaylistItemsReference] = useState<Array<YoutubePlaylistItems>>();
    const [playListItemsDetail, setPlaylistItemsDetail] = useState<YoutubePlaylistItems>();
    const [changeVideoModalData, setChangeVideoModalData] = useState(initialChangeVideoModalData);
    const [eventVideo, setEventVideo] = useState<any>();
    const [autoNextState, setAutoNextState] = useState(initAutoNext);
    const [autoPlayState, setAutoPlayState] = useState(initAutoPlay);

    useEffect(() => {
        if (playlistItemsRedux && playlistItemsRedux.length > 0) {
            setPlaylistItemsReference(playlistItemsRedux);
        }
    }, [playlistItemsRedux]);

    useEffect(() => {
        if (params.index) {
            setCurrentIndex(+params.index);
        }
    }, [params, params.index, params.id]);

    useEffect(() => {
        if (playlistItemDetailRedux.id !== '') {
            setPlaylistItemDetailState(playlistItemDetailRedux);
        } else {
            navigate(UrlFeApp.HOME);
        }
    }, [playlistItemDetailRedux, navigate]);

    const handleEndVideo = (event: any) => {
        if (!autoNextState.status) {
            setEventVideo(event);
            if (playListItemsDetail && playListItemsDetail.items && playListItemsDetail.items.length > 0) {
                if (playListItemsDetail.items.length > currentIndex + 1) {
                    setChangeVideoModalData({
                        okBtn: 'Xem tập mới',
                        closeBtn: 'Xem lại tập này',
                        content: 'Video đã kết thúc bạn có muốn xem tập tiếp theo không?',
                        status: 'NEXT',
                        isOpenChangeVideoModal: true,
                    });
                } else if (playListItemsDetail.items.length === currentIndex + 1) {
                    setChangeVideoModalData({
                        okBtn: 'Xem truyện khác',
                        closeBtn: 'Xem lại bộ này',
                        content: 'Bộ này đã tạm thời kết thúc hãy đón chờ tập mới trong thời gian tới.',
                        status: 'END',
                        isOpenChangeVideoModal: true,
                    });
                } else {
                    console.log('nho hon');
                }
            }
        } else {
            if (playListItemsDetail && playListItemsDetail.items && playListItemsDetail.items.length > 0) {
                setPlaylistItemDetailState(() => {
                    setCurrentIndex(currentIndex + 1);
                    return playListItemsDetail.items[currentIndex + 1];
                });
            }
        }
    };

    useEffect(() => {
        const filterYoutubeList = () => {
            if (playlistItemsReference) {
                for (let index = 0; index < playlistItemsReference.length; index++) {
                    const element = playlistItemsReference[index];
                    if (element && element.items && element.items.length > 0) {
                        for (let i = 0; i < element.items.length; i++) {
                            const e = element.items[i];
                            if (e.snippet.playlistId === playlistItemDetailState.snippet.playlistId) {
                                return element;
                            }
                        }
                    }
                }
            }
        };
        setPlaylistItemsDetail(filterYoutubeList());
    }, [playlistItemsReference, playlistItemDetailState]);

    const handleOkFunc = (status: string) => {
        switch (status) {
            case 'NEXT':
                if (playListItemsDetail && playListItemsDetail.items && playListItemsDetail.items.length > 0) {
                    setPlaylistItemDetailState(() => {
                        setCurrentIndex(currentIndex + 1);
                        return playListItemsDetail.items[currentIndex + 1];
                    });
                }
                break;
            case 'END':
                navigate(UrlFeApp.HOME);
                break;
            default:
                break;
        }
        setChangeVideoModalData(initialChangeVideoModalData);
    };

    const handleCloseFunc = (status: string) => {
        switch (status) {
            case 'NEXT':
                eventVideo.target.playVideo();
                break;
            case 'END':
                navigate(UrlFeApp.CONTENT);
                break;
            default:
                break;
        }
        setChangeVideoModalData(initialChangeVideoModalData);
    };

    const handleNextVideo = () => {
        if (playListItemsDetail && playListItemsDetail.items && playListItemsDetail.items.length > 0) {
            if (playListItemsDetail.items.length > currentIndex + 1) {
                setPlaylistItemDetailState(() => {
                    setCurrentIndex(currentIndex + 1);
                    return playListItemsDetail.items[currentIndex + 1];
                });
            }
        }
    };

    const handleBeforeVideo = () => {
        if (playListItemsDetail && playListItemsDetail.items && playListItemsDetail.items.length > 0) {
            if (currentIndex > 0) {
                setPlaylistItemDetailState(() => {
                    setCurrentIndex(currentIndex - 1);
                    return playListItemsDetail.items[currentIndex - 1];
                });
            }
        }
    };

    const handleVideoChange = (event: any) => {
        const { value } = event.target;
        if (playListItemsDetail && playListItemsDetail.items && playListItemsDetail.items.length > 0) {
            for (let i = 0; i < playListItemsDetail.items.length; i++) {
                const element = playListItemsDetail.items[i];
                if (element.snippet.resourceId.videoId === value) {
                    setPlaylistItemDetailState(() => {
                        setCurrentIndex(i);
                        return element;
                    });
                }
            }
        }
    };

    const handleBackToPlaylist = () => {
        navigate(UrlFeApp.CONTENT);
    };

    const handleAutoNext = () => {
        if (autoNextState.status) {
            setAutoNextState({
                status: false,
                name: 'Đang tắt',
                color: 'inherit',
            });
        } else {
            setAutoNextState({
                status: true,
                name: 'Đang bật',
                color: 'success',
            });
        }
    };

    const handleAutoPlay = () => {
        if (autoPlayState.status) {
            setAutoPlayState({
                status: false,
                name: 'Đang tắt',
                color: 'inherit',
            });
        } else {
            setAutoPlayState({
                status: true,
                name: 'Đang bật',
                color: 'success',
            });
        }
    };

    return (
        <>
            <div style={{ overflow: 'auto', height: window.innerHeight - 100 }} className="border">
                <Grid container spacing={3} className="p-0">
                    <Grid item md={12} lg={2} className="d-none d-xl-block">
                        <LeftAds />
                    </Grid>
                    <Grid item md={12} lg={8} className="border w-100 p-0">
                        <Grid container sx={{ mt: 3 }} className="ps-3 d-block d-xl-none">
                            <TopAds />
                        </Grid>
                        <Grid container sx={{ mt: 3 }}>
                            <Grid item xs={12} className="text-center m-auto ">
                                <YouTube
                                    key={playlistItemDetailState.snippet.resourceId.videoId}
                                    videoId={playlistItemDetailState.snippet.resourceId.videoId}
                                    opts={{
                                        height: window.innerHeight - 300,
                                        width: '100%',
                                        playerVars: {
                                            autoplay: autoPlayState.status ? 1 : 0,
                                        },
                                    }}
                                    style={{
                                        minWidth: '0',
                                    }}
                                    className="ms-2"
                                    onEnd={handleEndVideo}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonGroup
                                    size="small"
                                    aria-label="large button group"
                                    className="border p-2 ms-3 btn"
                                >
                                    <Tooltip title="Tập trước" placement="top">
                                        <IconButton
                                            key="one"
                                            size="large"
                                            color="secondary"
                                            onClick={handleBeforeVideo}
                                            disabled={currentIndex === 0}
                                        >
                                            <SkipPreviousIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Tập sau" placement="top">
                                        <IconButton
                                            key="two"
                                            size="large"
                                            color="warning"
                                            onClick={handleNextVideo}
                                            disabled={
                                                playListItemsDetail &&
                                                playListItemsDetail.items.length <= currentIndex + 1
                                            }
                                        >
                                            <SkipNextIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Trở lại" placement="top">
                                        <IconButton
                                            key="three"
                                            size="large"
                                            color="primary"
                                            onClick={handleBackToPlaylist}
                                        >
                                            <ArrowBackIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={`Tự động chuyển tập [${autoNextState.name}]`} placement="top">
                                        <IconButton
                                            key="three"
                                            size="large"
                                            color={autoNextState.color}
                                            onClick={handleAutoNext}
                                        >
                                            {autoNextState.status ? <UpdateIcon /> : <UpdateDisabledIcon />}
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={`Tự động phát [${autoPlayState.name}]`} placement="top">
                                        <IconButton
                                            key="three"
                                            size="large"
                                            color={autoPlayState.color}
                                            onClick={handleAutoPlay}
                                        >
                                            {autoPlayState.status ? <PlayArrowIcon /> : <PlayDisabledIcon />}
                                        </IconButton>
                                    </Tooltip>
                                </ButtonGroup>
                                <FormControl className="ms-2 border-0">
                                    <Select
                                        value={playlistItemDetailState.snippet.resourceId.videoId}
                                        onChange={handleVideoChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        name="video"
                                        className="p-0"
                                    >
                                        {playListItemsDetail &&
                                            playListItemsDetail.items &&
                                            playListItemsDetail.items.length > 0 &&
                                            playListItemsDetail.items.map(
                                                (item: YoutubePlaylistItemsItems, index: number) => {
                                                    return (
                                                        <MenuItem
                                                            key={item.snippet.resourceId.videoId}
                                                            value={item.snippet.resourceId.videoId}
                                                        >
                                                            <Chip
                                                                variant="outlined"
                                                                color="primary"
                                                                label={`Tập ${index + 1}`}
                                                                className="btn"
                                                            />
                                                            <Typography className="w-100"></Typography>
                                                        </MenuItem>
                                                    );
                                                },
                                            )}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ mt: 3 }} className="ps-3 d-block d-xl-none">
                            <BottomAds />
                        </Grid>
                        <Grid container sx={{ mt: 3 }} className="ps-4">
                            <CommentFacebook
                                currentHref={`${window.location.href}/${playlistItemDetailState.snippet.resourceId.videoId}`}
                            />
                        </Grid>
                    </Grid>
                    <Grid item md={12} lg={2} className="d-none d-xl-block ps-0">
                        <RightAds />
                    </Grid>
                </Grid>
            </div>
            <ChangeVideoModal
                isOpen={changeVideoModalData.isOpenChangeVideoModal}
                closeFunc={handleCloseFunc}
                okFunc={handleOkFunc}
                okBtn={changeVideoModalData.okBtn}
                closeBtn={changeVideoModalData.closeBtn}
                content={changeVideoModalData.content}
                status={changeVideoModalData.status}
            />
        </>
    );
}
