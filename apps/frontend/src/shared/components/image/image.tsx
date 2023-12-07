import { DetailedHTMLProps, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

interface IImageProps
    extends DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> { }

export default function Image(props: IImageProps) {
    const { alt = 'post-assets', ...rest } = props;
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
            <img {...rest} className="" onLoad={onLoad} alt={alt} />
        </div>
    );
}
