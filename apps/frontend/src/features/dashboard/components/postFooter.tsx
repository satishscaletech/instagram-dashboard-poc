import { IconComment, IconHeart } from 'shared/icons';

interface IPostFooterProps {
    like_count: number;
    comments_count: number;
}
function PostFooter(props: IPostFooterProps) {
    return (
        <div className="post-footer">
            <div className="likes-and-comments">
                <div className="likes">
                    <IconHeart />
                    <p>{props.like_count}</p>
                </div>
                <div className="comments">
                    <IconComment />
                    <p>{props.comments_count}</p>
                </div>
            </div>
        </div>
    );
}

export default PostFooter;
