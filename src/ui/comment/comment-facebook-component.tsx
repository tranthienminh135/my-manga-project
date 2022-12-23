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
    }, []);

    return (
        <div
            className="fb-comments"
            data-href={currentHref}
            data-width="100%"
            data-lazy
            data-mobile
            data-order-by="reverse_time"
            data-numposts="5"
        ></div>
    );
}