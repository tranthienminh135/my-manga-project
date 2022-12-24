import { InitialResponseGoogle } from '../types/base';
import { initialLoadingFacebookState as initialLoadingFacebook } from '../types/loading-facebook';
import { initialPlaylistsDetail } from '../types/playlists-detail';
import { InitialUserInfo } from '../types/user';
import { InitialYoutubePlaylistItems } from '../types/youtube-playlist-items';
import { InitialYoutubePlaylists } from '../types/youtube-playlists';

export const isEmpty = (object: any) => {
    if (object === undefined || object === null) {
        return false;
    }

    return true;
};

export const initialUserGoogleInfoState: InitialUserInfo = {
    userGoogleInfo: {
        aud: '',
        azp: '',
        email: '',
        email_verified: false,
        exp: -1,
        given_name: '',
        iat: -1,
        iss: '',
        jti: '',
        name: '',
        nbf: -1,
        picture: '',
        sub: '',
        isAdmin: false,
    },
};

export const initialGoogleLoginDataState: InitialResponseGoogle = {
    responseGoogle: {
        clientId: '',
        credential: '',
        select_by: '',
    },
};

export const initialPlaylistsDataState: InitialYoutubePlaylists = {
    playlistsData: {
        kind: '',
        etag: '',
        nextPageToken: '',
        pageInfo: {
            totalResults: -1,
            resultsPerPage: -1,
        },
        items: [
            {
                kind: '',
                tag: '',
                id: '',
                snippet: {
                    publishedAt: '',
                    channelId: '',
                    title: '',
                    description: '',
                    thumbnails: {
                        default: {
                            url: '',
                            width: -1,
                            height: -1,
                        },
                        medium: {
                            url: '',
                            width: -1,
                            height: -1,
                        },
                        high: {
                            url: '',
                            width: -1,
                            height: -1,
                        },
                        standard: {
                            url: '',
                            width: -1,
                            height: -1,
                        },
                        maxres: {
                            url: '',
                            width: -1,
                            height: -1,
                        },
                    },
                    channelTitle: '',
                    localized: {
                        title: '',
                        description: '',
                    },
                },
                status: {
                    privacyStatus: '',
                },
                contentDetails: {
                    itemCount: -1,
                },
                player: {
                    embedHtml: '',
                },
            },
        ],
    },
};

export const initialPlaylistItemsDataState: InitialYoutubePlaylistItems = {
    playlistItemsData: [
        {
            kind: '',
            etag: '',
            items: [
                {
                    kind: '',
                    etag: '',
                    id: '',
                    snippet: {
                        publishedAt: '',
                        channelId: '',
                        title: '',
                        description: '',
                        thumbnails: {
                            default: {
                                url: '',
                                width: -1,
                                height: -1,
                            },
                            medium: {
                                url: '',
                                width: -1,
                                height: -1,
                            },
                            high: {
                                url: '',
                                width: -1,
                                height: -1,
                            },
                            standard: {
                                url: '',
                                width: -1,
                                height: -1,
                            },
                            maxres: {
                                url: '',
                                width: -1,
                                height: -1,
                            },
                        },
                        channelTitle: '',
                        playlistId: '',
                        position: -1,
                        resourceId: {
                            kind: '',
                            videoId: '',
                        },
                        videoOwnerChannelTitle: '',
                        videoOwnerChannelId: '',
                    },
                    contentDetails: {
                        videoId: '',
                        videoPublishedAt: '',
                    },
                    status: {
                        privacyStatus: '',
                    },
                },
            ],
            pageInfo: {
                totalResults: -1,
                resultsPerPage: -1,
            },
        },
    ],
};

export const initialPlaylistsDetailState: initialPlaylistsDetail = {
    playlistDetail: {
        kind: '',
        tag: '',
        id: '',
        snippet: {
            publishedAt: '',
            channelId: '',
            title: '',
            description: '',
            thumbnails: {
                default: {
                    url: '',
                    width: -1,
                    height: -1,
                },
                medium: {
                    url: '',
                    width: -1,
                    height: -1,
                },
                high: {
                    url: '',
                    width: -1,
                    height: -1,
                },
                standard: {
                    url: '',
                    width: -1,
                    height: -1,
                },
                maxres: {
                    url: '',
                    width: -1,
                    height: -1,
                },
            },
            channelTitle: '',
            localized: {
                title: '',
                description: '',
            },
        },
        status: {
            privacyStatus: '',
        },
        contentDetails: {
            itemCount: -1,
        },
        player: {
            embedHtml: '',
        },
    },
};

export const initialLoadingFacebookState: initialLoadingFacebook = {
    isLoading: false,
};
