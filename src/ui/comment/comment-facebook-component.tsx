import { useEffect } from 'react';

export type CommentFacebookProps = {
    currentHref: string;
};

export default function CommentFacebook(props: CommentFacebookProps) {
    const { currentHref } = props;

    useEffect(() => {
        const dom: any = window;
        if (dom.FB) {
            dom.FB.XFBML.parse();
        }

        dom.fbAsyncInit = function () {
            dom.FB.init({
                appId: 'vi_VN',
                cookie: true,
                xfbml: true,
                version: 'v2.5',
            });
        };
        (function (d, s, id) {
            var js: any,
                fjs: any = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = `//connect.facebook.net/vi_VN/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }, []);

    return (
        <>
            <div>{currentHref}</div>
            <div
                className="fb-comments"
                data-href={currentHref}
                data-width="100%"
                data-lazy
                data-mobile
                data-order-by="reverse_time"
                data-numposts="5"
            ></div>
        </>
    );
}
