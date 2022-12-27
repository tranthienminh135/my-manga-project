import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { formatDateTimeResList } from '../../../core/constants/function';
import { YoutubePlaylistItems, YoutubePlaylistItemsItems } from '../../../core/types/youtube-playlist-items';

type MainContentProps = {
    playlistItems: YoutubePlaylistItems;
};

export default function MainContent(props: MainContentProps) {
    const { playlistItems } = props;

    const handleTargetItem = (item: YoutubePlaylistItemsItems) => {
        console.log(item);
    };

    return (
        <Grid
            item
            xs={12}
            md={8}
            sx={{
                '& .markdown': {
                    py: 3,
                },
                padding: '12px !important',
                maxHeight: '1380px',
                marginBottom: '24px !important',
                paddingTop: '0px !important',
            }}
        >
            <Typography variant="subtitle1" color="text.secondary">
                <strong className="d-block ">Danh sách tập: </strong>
            </Typography>
            <div style={{ maxHeight: '885px', overflowY: 'scroll', overflowX: 'hidden' }} className="w-100 border">
                {playlistItems &&
                    playlistItems.items &&
                    playlistItems.items.length > 0 &&
                    playlistItems.items.map((archive: YoutubePlaylistItemsItems) => (
                        <Button
                            size="small"
                            className="d-flex m-2 w-100 border border-2 shadow"
                            onClick={() => handleTargetItem(archive)}
                            key={archive.id}
                        >
                            <img
                                src={archive.snippet.thumbnails.default.url}
                                alt={archive.snippet.title}
                                className="d-inline-block  rounded"
                                loading="lazy"
                            />
                            <span className="d-inline-block text-start w-100 p-2" key={archive.id}>
                                {archive.snippet.title} - {formatDateTimeResList(archive.snippet.publishedAt)}
                            </span>
                        </Button>
                    ))}
            </div>
            <Divider />
        </Grid>
    );
}
