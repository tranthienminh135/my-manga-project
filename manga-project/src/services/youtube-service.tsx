import { API } from '../core/constants/common';
import { apiClient } from '../core/services/api-service';

export const getYoutubePlaylists = async (object: any) => {
    const res = await apiClient.get(
        `${API.YOUTUBE_PLAYLISTS}?part=${object.contentDetails},${object.id},${object.snippet},${object.status},${object.localizations}&channelId=${object.channelId}&maxResults=${object.maxResults}&key=${object.key}`,
    );
    return res.data;
};
