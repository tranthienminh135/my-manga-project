import { ExcelComponent } from '../../ui/excel/excel-component';
import { YoutubeParams } from '../types/youtube';

export const COMMON = {
    COMMA: ',',
};

export const ERROR_CODE = {
    ERROR_403: 403,
};

export const UrlFeApp = {
    DEFAULT: '/',
    ALL: '/*',
    DASH_BOARD: '/dashboard',
    HOME: '/home',
    CONTENT: '/content',
    DETAIL: '/detail',
    EXCEL: '/excel',
};

export const YOUTUBE_PARAMS: YoutubeParams = {
    CHANNEL_ID: process.env.REACT_APP_YOUTUBE_CHANNEL_ID as string,
    KEY: process.env.REACT_APP_YOUTUBE_KEY?.split(COMMON.COMMA) as Array<string>,
    STATUS: 'status',
    LOCALIZATIONS: 'localizations',
    SNIPPET: 'snippet',
    ID: 'id',
    CONTENT_DETAILS: 'contentDetails',
    MAX_RESULTS: 50,
};

export const YOUTUBE_URL = {
    CHANNEL: 'https://www.youtube.com/channel',
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

export const FACEBOOK = {
    PAGE_ID: process.env.REACT_APP_FACEBOOK_PAGE_ID ? process.env.REACT_APP_FACEBOOK_PAGE_ID : '',
};

export const ADMIN_PATH = [
    {
        path: `${UrlFeApp.EXCEL}`,
        element: <ExcelComponent />,
    },
];

export const ADMIN_PATH_LIST = [UrlFeApp.EXCEL];
