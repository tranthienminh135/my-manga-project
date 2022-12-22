export type YoutubePlaylistItemsThumbnailItems = {
    url: string;
    width: number;
    height: number;
};

export type YoutubePlaylistItemsThumbnails = {
    default: YoutubePlaylistItemsThumbnailItems;
    medium: YoutubePlaylistItemsThumbnailItems;
    high: YoutubePlaylistItemsThumbnailItems;
    standard: YoutubePlaylistItemsThumbnailItems;
    maxres: YoutubePlaylistItemsThumbnailItems;
};

export type YoutubePlaylistItemsResourceId = {
    kind: string;
    videoId: string;
};

export type YoutubePlaylistItemsSnippet = {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: YoutubePlaylistItemsThumbnails;
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: YoutubePlaylistItemsResourceId;
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
};

export type YoutubePlaylistItemsContentDetails = {
    videoId: string;
    videoPublishedAt: string;
};

export type YoutubePlaylistItemsStatus = {
    privacyStatus: string;
};

export type YoutubePlaylistItemsItems = {
    kind: string;
    etag: string;
    id: string;
    snippet: YoutubePlaylistItemsSnippet;
    contentDetails: YoutubePlaylistItemsContentDetails;
    status: YoutubePlaylistItemsStatus;
};

export type YoutubePlaylistItemsPageInfo = {
    totalResults: number;
    resultsPerPage: number;
};

export type YoutubePlaylistItems = {
    kind: string;
    etag: string;
    items: Array<YoutubePlaylistItemsItems>;
    pageInfo: YoutubePlaylistItemsPageInfo;
};

export type InitialYoutubePlaylistItems = {
    playlistItemsData: Array<YoutubePlaylistItems>;
};
