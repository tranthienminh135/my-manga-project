import { useEffect } from 'react';

export type CommentFacebookProps = {
    currentHref: string;
};

export default function CommentFacebook(props: CommentFacebookProps) {
    const { currentHref } = props;

    console.log(currentHref);

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
