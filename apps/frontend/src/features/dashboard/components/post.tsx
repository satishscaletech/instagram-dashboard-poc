// components
import Skeleton from 'react-loading-skeleton';
import Image from 'shared/components/image/image';
import Card from 'shared/components/card/card';
import Video from 'shared/components/video/video';
// plugins
import dayjs from 'dayjs';
import PostFooter from './postFooter';

interface IPostProps {
    igResponseData: any;
    loading: boolean;
}

function Post(props: IPostProps) {
    const { igResponseData, loading } = props;

    return (
        <div className="posts-wrapper">
            <h3>Latest Instagram Posts</h3>
            {loading ? (
                <Skeleton className="loading" height={'calc(100vh - 408px)'} />
            ) : (
                <div className="posts">
                    {(igResponseData.media || []).map((media: any) => (
                        <Card key={media.id}>
                            {['CAROUSEL_ALBUM', 'IMAGE'].includes(media.media_type) ? (
                                <Image
                                    className="post-asset cover"
                                    alt="post-asset"
                                    src={media.media_url || media.thumbnail_url}
                                    width={'100%'}
                                />
                            ) : (
                                <>
                                    {media.media_url ? (
                                        <Video
                                            className="post-asset"
                                            src={media.media_url}
                                            width={'100%'}
                                            controls
                                        />
                                    ) : (
                                        <Image
                                            className="post-asset cover"
                                            alt="post-asset"
                                            src={media.thumbnail_url}
                                            width={'100%'}
                                        />
                                    )}
                                </>
                            )}
                            <PostFooter
                                like_count={media.like_count}
                                comments_count={media.comments_count}
                            />
                            <p className="date-of-post">{dayjs(media.timestamp).fromNow()}</p>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Post;
