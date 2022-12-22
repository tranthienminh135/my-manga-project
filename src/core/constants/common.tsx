export const COMMON = {
    COMMA: ',',
};

export const UrlFeApp = {
    DEFAULT: '/',
    DASH_BOARD: '/dashboard',
    HOME: '/home',
};

export type YoutubeParams = {
    CHANNEL_ID: string;
    KEY: Array<string>;
    STATUS: string;
    LOCALIZATIONS: string;
    SNIPPET: string;
    ID: string;
    CONTENT_DETAILS: string;
};

export const YOUTUBE_PARAMS: YoutubeParams = {
    CHANNEL_ID: process.env.REACT_APP_YOUTUBE_CHANNEL_ID as string,
    KEY: process.env.REACT_APP_YOUTUBE_KEY?.split(COMMON.COMMA) as Array<string>,
    STATUS: 'status',
    LOCALIZATIONS: 'localizations',
    SNIPPET: 'snippet',
    ID: 'id',
    CONTENT_DETAILS: 'contentDetails',
};

export const API = {
    YOUTUBE_PLAYLISTS: `https://youtube.googleapis.com/youtube/v3/playlists`,
    YOUTUBE_PLAYLIST_ITEMS: `https://youtube.googleapis.com/youtube/v3/playlistItems`,
};

export const PERMISSION = {
    ADMIN_EMAIL: process.env.REACT_APP_YOUTUBE_ADMIN_EMAIL?.split(COMMON.COMMA),
};

export const ALERT_INFO = {
    LOGIN: {
        SUCCESS: 'Đăng nhập thành công!',
        FAILED: 'Đăng nhập thất bại!',
    },
    LOGOUT: {
        SUCCESS: 'Đăng xuất thành công!',
        FAILED: 'Đăng xuất thất bại!',
    },
};
