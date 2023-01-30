import { Alert, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getRandom } from '../../core/constants/function';
import { getUserGoogleInfo } from '../../core/redux/slice/user-slice';
import { adsList } from '../../core/utils/AdsStore';

export default function BottomAds() {
    const [adsListState, setAdsListState] = useState(() => getRandom(adsList, 4));
    const userInfo = useSelector(getUserGoogleInfo);

    const handleClose = (id: number) => {
        setAdsListState(
            adsListState.map((ads: any) => {
                if (ads.id === id) {
                    ads.isClose = false;
                }
                return ads;
            }),
        );
    };

    return (
        <>
            {adsListState.map((ads: any, index: number) => {
                return (
                    !userInfo.isAdmin &&
                    ads.isClose && (
                        <Alert
                            key={ads.id}
                            onClose={() => handleClose(ads.id)}
                            className="p-1 border float-end"
                            style={{
                                height: '25%',
                                overflow: 'hidden',
                                width: '25%',
                            }}
                            severity="info"
                            icon={false}
                        >
                            <a href={ads.url} target="_blank" rel="noreferrer">
                                <img
                                    src={ads.image}
                                    alt=""
                                    width="100%"
                                    style={{
                                        maxHeight: '100%',
                                    }}
                                />
                            </a>
                            <a href={ads.url} target="_blank" rel="noreferrer" className="d-none d-md-block">
                                <Tooltip title={ads.name} placement="top">
                                    <div className="p-3 text-dark overflow-hidden" style={{ maxHeight: '100px' }}>
                                        {ads.name}
                                    </div>
                                </Tooltip>
                            </a>
                        </Alert>
                    )
                );
            })}
        </>
    );
}
