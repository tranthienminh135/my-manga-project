export type CommentFacebookProps = {
    currentHref: string;
};

export default function LikeComponent(props: CommentFacebookProps) {
    const { currentHref } = props;

    const dom: any = window;
    if (dom.FB) {
        dom.FB.XFBML.parse();
    }

    return (
        <>
            <div
                className="fb-like"
                data-href={currentHref}
                data-width=""
                data-layout="standard"
                data-action="like"
                data-size="small"
                data-share="true"
            ></div>
        </>
    );
}
