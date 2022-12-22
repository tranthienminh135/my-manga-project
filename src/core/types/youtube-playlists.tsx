export type YoutubePlaylistsItemThumbnailsItem = {
    url: string;
    width: number;
    height: number;
};

export type YoutubePlaylistsItemThumbnails = {
    default: YoutubePlaylistsItemThumbnailsItem;
    medium: YoutubePlaylistsItemThumbnailsItem;
    high: YoutubePlaylistsItemThumbnailsItem;
    standard: YoutubePlaylistsItemThumbnailsItem;
    maxres: YoutubePlaylistsItemThumbnailsItem;
};

export type YoutubePlaylistsItemSnippet = {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: YoutubePlaylistsItemThumbnails;
    channelTitle: string;
    localized: YoutubePlaylistsItemLocalized;
};

export type YoutubePlaylistsItemLocalized = {
    title: string;
    description: string;
};

export type YoutubePlaylistsItemStatus = {
    privacyStatus: string;
};

export type YoutubePlaylistsItemContentDetails = {
    itemCount: number;
};

export type YoutubePlaylistsItemPlayer = {
    embedHtml: string;
};

export type YoutubePlaylistsItem = {
    kind: string;
    tag: string;
    id: string;
    snippet: YoutubePlaylistsItemSnippet;
    status: YoutubePlaylistsItemStatus;
    contentDetails: YoutubePlaylistsItemContentDetails;
    player: YoutubePlaylistsItemPlayer;
};

export type YoutubePlaylistsPageInfo = {
    totalResults: number;
    resultsPerPage: number;
};

export type YoutubePlaylists = {
    kind: string;
    etag: string;
    nextPageToken: string;
    pageInfo: YoutubePlaylistsPageInfo;
    items: Array<YoutubePlaylistsItem>;
};

export type InitialYoutubePlaylists = {
    playlistsData: YoutubePlaylists;
};
