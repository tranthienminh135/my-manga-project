import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Button, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { YOUTUBE_URL } from '../../core/constants/common';
import { formatDateTimeResList, targetUrl } from '../../core/constants/function';

interface FeaturedPostProps {
    post: {
        date: string;
        description: string;
        image: string;
        imageLabel: string;
        title: string;
        author: string;
        channelId: string;
    };
}

export default function FeaturedPost(props: FeaturedPostProps) {
    const { post } = props;

    const handleClickChannel = () => {
        targetUrl(`${YOUTUBE_URL.CHANNEL}/${post.channelId}`);
    };

    return (
        <Grid item xs={12} md={6}>
            <Card sx={{ display: 'flex' }}>
                <Grid container className="shadow rounded">
                    <Grid item sm={12} lg={6} className="w-100 p-1">
                        <CardMedia component="img" image={post.image} alt={post.imageLabel} />
                    </Grid>
                    <Grid item sm={12} lg={6} className="w-100 p-1">
                        <CardContent sx={{ flex: 1 }} className="pb-2">
                            <Typography component="h2" variant="h5" className="fw-bold text-uppercase">
                                {post.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                <strong className="fw-bold">Xem nhiều hơn tại:</strong>
                                <Button variant="text" color="warning" onClick={handleClickChannel}>
                                    {post.author}
                                </Button>
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                <strong className="fw-bold">Cập nhật lúc:</strong> {formatDateTimeResList(post.date)}
                            </Typography>
                            <hr />
                            <Typography variant="subtitle1" color="text.secondary">
                                <strong className="d-block ">Nội dung: </strong>
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                paragraph
                                style={{
                                    maxHeight: '140px',
                                    overflowY: 'auto',
                                }}
                            >
                                {post.description}
                                Võ đạo đỉnh phong, là cô độc, là tịch mịch, là dài đằng đẵng cầu tác, là cao xử bất
                                thắng hàn Phát triển trong nghịch cảnh, cầu sinh nơi tuyệt địa, bất khuất không buông
                                tha, mới có thể có thể phá võ chi cực đạo. Lăng Tiêu các thí luyện đệ tử kiêm quét rác
                                gã sai vặt Dương Khai ngẫu lấy được một bản vô tự hắc thư, từ nay về sau đạp vào dài
                                đằng đẵng võ đạo.Võ đạo đỉnh phong, là cô độc, là tịch mịch, là dài đằng đẵng cầu tác,
                                là cao xử bất thắng hàn Phát triển trong nghịch cảnh, cầu sinh nơi tuyệt địa, bất khuất
                                không buông tha, mới có thể có thể phá võ chi cực đạo. Lăng Tiêu các thí luyện đệ tử
                                kiêm quét rác gã sai vặt Dương Khai ngẫu lấy được một bản vô tự hắc thư, từ nay về sau
                                đạp vào dài đằng đẵng võ đạo.
                            </Typography>
                            <hr />
                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<FirstPageIcon fontSize="small" />}
                                    color="secondary"
                                >
                                    Xem Từ Đầu
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<LastPageIcon fontSize="small" />}
                                    color="warning"
                                >
                                    Xem Mới Nhất
                                </Button>
                            </Stack>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
}
