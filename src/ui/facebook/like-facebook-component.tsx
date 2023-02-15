import { useEffect } from 'react';

export type LikeFacebookProps = {
    currentHref: string;
};

export default function LikeFacebook(props: LikeFacebookProps) {
    const { currentHref } = props;

    useEffect(() => {
        const dom: any = window;
        if (dom.FB) {
            dom.FB.XFBML.parse();

            dom.fbAsyncInit = function () {
                dom.FB.init({
                    appId: '699076034884083',
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v15.0',
                });
            };

            // Load the SDK asynchronously
            (function (d, s, id) {
                var js: any,
                    fjs: any = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src =
                    'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v15.0&appId=699076034884083&autoLogAppEvents=1';
                fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'facebook-jssdk');
        }
    }, [currentHref]);

    return (
        <>
            <div
                className="fb-like"
                data-href={currentHref}
                data-width=""
                data-layout="standard"
                data-action="like"
                data-size="large"
                data-share="true"
            ></div>
        </>
    );
}
