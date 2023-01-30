import { Alert } from '@mui/material';
import { useState } from 'react';
import { adsList } from '../../core/utils/AdsStore';
import { useSelector } from 'react-redux';
import { getUserGoogleInfo } from '../../core/redux/slice/user-slice';
import { getRandom } from '../../core/constants/function';

export default function RightAds() {
    const userInfo = useSelector(getUserGoogleInfo);
    const [adsListState, setAdsListState] = useState(() => getRandom(adsList, 4));

    const handleClose = (i: number) => {
        setAdsListState(
            adsListState.map((ads: any, index: number) => {
                if (index === i) {
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
                            key={index}
                            onClose={() => handleClose(index)}
                            className="p-1 border float-end"
                            style={{
                                height: '25%',
                                overflow: 'hidden',
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
                                <div className="p-3 text-dark">{ads.name}</div>
                            </a>
                        </Alert>
                    )
                );
            })}
        </>
    );
}
