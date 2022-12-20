export type YoutubePlaylists = {
    etag: string;
    items: Array<Item>;
    kind: string;
    pageInfo: PageInfo;
};
export type PageInfo = {
    resultsPerPage: number;
    totalResults: number;
};

export type Item = {
    etag: string;
    id: string;
    kind: string;
    snippet: {
        channelId: string;
        channelTitle: string;
        description: string;
        localized: {
            description: string;
            title: string;
        };
        publishedAt: string;
        thumbnails: {
            default: {
                height: number;
                url: string;
                width: string;
            };
            high: {
                height: number;
                url: string;
                width: string;
            };
            medium: {
                height: number;
                url: string;
                width: string;
            };
            standard: {
                height: number;
                url: string;
                width: string;
            };
        };
        title: string;
    };
};
