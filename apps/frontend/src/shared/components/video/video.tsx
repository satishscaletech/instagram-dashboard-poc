import { DetailedHTMLProps, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

interface IVideoProps
    extends DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> {}
export default function Video(props: IVideoProps) {
    const [loading, setLoading] = useState(true);

    const onLoad = () => {
        setLoading(false);
    };

    return (
        <div className={`image-wrapper ${props.className}`}>
            {loading && (
                <div className="overlay">
                    <SkeletonTheme width={'100%'} height={'100%'}>
                        <Skeleton />
                    </SkeletonTheme>
                </div>
            )}
            <video {...props} className="" onLoadedData={onLoad} />
        </div>
    );
}
