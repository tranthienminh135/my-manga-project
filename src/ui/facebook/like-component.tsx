import { FacebookProvider, Like } from 'react-facebook';
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
            <FacebookProvider appId="699076034884083">
                <Like href={currentHref} colorScheme="dark" showFaces share />
            </FacebookProvider>
        </>
    );
}
