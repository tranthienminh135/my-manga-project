import { Button, Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
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
import CommentFacebook from '../facebook/comment-facebook-component';

const initialChangeVideoModalData = {
    okBtn: '',
    closeBtn: '',
    content: '',
    status: '',
    isOpenChangeVideoModal: false,
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

    return (
        <>
            <div style={{ overflow: 'auto', height: window.innerHeight - 100 }} className="border">
                <Container maxWidth="lg" className="border">
                    <Grid container>
                        <Grid item xs={12} className="text-center">
                            <FormControl sx={{ width: '100%' }} className="p-4 m-0">
                                <Select
                                    value={playlistItemDetailState.snippet.resourceId.videoId}
                                    onChange={handleVideoChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    name="video"
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
                                                        <Typography className="w-100">{item.snippet.title}</Typography>
                                                    </MenuItem>
                                                );
                                            },
                                        )}
                                </Select>
                            </FormControl>
                            <YouTube
                                key={playlistItemDetailState.snippet.resourceId.videoId}
                                videoId={playlistItemDetailState.snippet.resourceId.videoId}
                                opts={{
                                    height: window.innerHeight - 300,
                                    width: '100%',
                                    playerVars: {
                                        autoplay: 0,
                                    },
                                }}
                                onEnd={handleEndVideo}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonGroup size="small" aria-label="large button group">
                                <Button
                                    key="one"
                                    variant="contained"
                                    size="medium"
                                    color="secondary"
                                    onClick={handleBeforeVideo}
                                    disabled={currentIndex === 0}
                                >
                                    Tập trước
                                </Button>
                                <Button
                                    key="two"
                                    variant="contained"
                                    size="medium"
                                    color="warning"
                                    onClick={handleNextVideo}
                                    disabled={
                                        playListItemsDetail && playListItemsDetail.items.length <= currentIndex + 1
                                    }
                                >
                                    Tập sau
                                </Button>
                                <Button
                                    key="three"
                                    variant="contained"
                                    size="medium"
                                    color="primary"
                                    onClick={handleBackToPlaylist}
                                >
                                    Quay lại
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 3 }}>
                        {
                            <CommentFacebook
                                currentHref={`${window.location.href}/${playlistItemDetailState.snippet.resourceId.videoId}`}
                            />
                        }
                    </Grid>
                </Container>
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
