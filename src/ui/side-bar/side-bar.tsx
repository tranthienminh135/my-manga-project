import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Button, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { FACEBOOK, UrlFeApp, YOUTUBE_PARAMS } from '../../core/constants/common';
import { targetUrl } from '../../core/constants/function';
import { playlistsDetailActions } from '../../core/redux/slice/playlists-detail-slice';
import { YoutubePlaylistsItem } from '../../core/types/youtube-playlists';

interface SidebarProps {
    archives: ReadonlyArray<YoutubePlaylistsItem>;
}

export default function Sidebar(props: SidebarProps) {
    const { archives } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTargetYoutubeItem = (playlistsDetail: YoutubePlaylistsItem) => {
        dispatch(playlistsDetailActions.setPlaylistsDetail(playlistsDetail));
        navigate(UrlFeApp.CONTENT);
    };

    const handleTargetYoutubeChannel = () => {
        targetUrl(`https://www.youtube.com/channel/${YOUTUBE_PARAMS.CHANNEL_ID}`);
    };

    const handleTargetFacebookChannel = () => {
        targetUrl(`https://www.facebook.com/profile.php?id=${FACEBOOK.PAGE_ID}`);
    };

    const handleCopyText = (e: any, text: string) => {
        e.preventDefault();
        navigator.clipboard.writeText(text);
        alert(`Đã sao chép số tài khoản ${text} vào bộ nhớ đệm.`);
    };

    return (
        <Grid item xs={12} md={4} className="p-3">
            <div style={{ maxHeight: '1515px' }}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
                    <Typography variant="h6" gutterBottom>
                        Giới thiệu
                    </Typography>
                    <Typography>
                        🌐{' '}
                        {
                            <a
                                className="text-danger"
                                href="https://tranthienminh.online/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Tranthienminh.online
                            </a>
                        }{' '}
                        là trang web chuyên review truyện tranh manhua.
                    </Typography>
                    <Typography>
                        🔍 Hãy ghé thăm kênh Youtube chính thức tại{' '}
                        {
                            <a
                                className="text-danger"
                                href="https://www.youtube.com/@tranthienminh135"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Youtube.com/@tranthienminh135
                            </a>
                        }{' '}
                        và fanpage{' '}
                        {
                            <a
                                className="text-danger"
                                href="https://www.facebook.com/tranthienminh135/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Facebook.com/tranthienminh135/
                            </a>
                        }{' '}
                        để cập nhật thông tin mới nhất.
                    </Typography>
                    <Typography>
                        💵 Ủng hộ nhóm 1 ly cafe sáng bằng cách chuyển khoản qua kênh Momo (
                        {
                            <a
                                className="text-danger"
                                href="https://me.momo.vn/AEI9TgsDuyC9i2IDIbsKsP"
                                onClick={(e) => handleCopyText(e, '0395800661')}
                                target="_blank"
                                rel="noreferrer"
                            >
                                0395800661
                            </a>
                        }
                        ) hoặc Vietcombank (
                        {
                            <a
                                href="https://me.momo.vn/AEI9TgsDuyC9i2IDIbsKsP"
                                className="text-danger"
                                onClick={(e) => handleCopyText(e, '0041000339850')}
                                target="_blank"
                                rel="noreferrer"
                            >
                                0041000339850
                            </a>
                        }
                        ).
                    </Typography>
                    <Typography>
                        🆘 Liên hệ quảng cáo hay khiếu nại về vấn đề bản quyền vui lòng thông qua email{' '}
                        {
                            <a
                                className="text-danger"
                                href="mailto:tranthienminh135@gmail.com?subject=Xin chào Trần Thiên Minh"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Tranthienminh135@gmail.com
                            </a>
                        }
                        .
                    </Typography>
                </Paper>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Mới nhất
                </Typography>
                <div className="w-100">
                    {archives.map((archive: YoutubePlaylistsItem, index: number) => {
                        if (index <= 6) {
                            return (
                                <Button
                                    size="small"
                                    className="d-flex p-2 w-100 border border-2 shadow"
                                    onClick={() => handleTargetYoutubeItem(archive)}
                                    key={archive.id}
                                >
                                    <img
                                        src={archive.snippet.thumbnails.default.url}
                                        alt={archive.snippet.title}
                                        className="d-inline-block  rounded"
                                        loading="lazy"
                                    />
                                    <span className="d-inline-block text-start w-100 p-2" key={archive.id}>
                                        {archive.snippet.title}
                                    </span>
                                </Button>
                            );
                        } else return <div key={archive.id}></div>;
                    })}
                </div>

                <Divider />
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Liên hệ
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<FacebookIcon />} onClick={handleTargetFacebookChannel}>
                        Facebook
                    </Button>
                    <Button variant="outlined" startIcon={<YouTubeIcon />} onClick={handleTargetYoutubeChannel}>
                        Youtube
                    </Button>
                </Stack>
            </div>
        </Grid>
    );
}
