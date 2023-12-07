import { useEffect, useState } from 'react';
// plugins
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
// components
import DetailCard from './components/postDetailCard';
import DetailHeader from './components/postHeader';
import Post from './components/post';
// utils
import { IResponseData } from './interface/interface';
// assets
import { IconFollowers, IconImage, IconPin, IconThumbsUp } from 'shared/icons';
import './style.scss';
import { onValue, ref } from 'firebase/database';
import { db } from 'firebase.config';

dayjs.extend(relativeTime);

export default function Dashboard() {
    const [igResponseData, setIgResponseData] = useState<IResponseData>({} as IResponseData);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { state = {} } = useLocation();

    const handleAuthFail = () => {
        setTimeout(() => {
            navigate('/');
        }, 500);
    };

    const fetchUserDataFromFirebase = (userId: string) => {
        setLoading(true)
        const starCountRef = ref(db, 'Users/' + userId);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setIgResponseData(data.properties.instagram_info)
            setLoading(false)
        });
    }

    useEffect(() => {
        if (state && state.userId) {
            fetchUserDataFromFirebase(state.userId)
        } else {
            handleAuthFail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);



    const cardDetails = [
        {
            label: 'Followers',
            value: igResponseData.followers_count,
            loading: loading,
            icon: <IconFollowers />,
        },
        {
            label: 'Total Posts',
            value: igResponseData.media_count,
            loading: loading,
            icon: <IconImage />,
        },
        {
            label: 'Avg. Engagement Rate',
            value: igResponseData.engagement_rates,
            loading: loading,
            icon: <IconThumbsUp />,
            appendingString: '%',
            avgRate: true,
        },
        {
            label: 'Location',
            value: null,
            loading: loading,
            icon: <IconPin />,
        },
    ];

    return (
        <div className="container" style={{ minHeight: 'calc(100vh - 40px)' }}>
            <DetailHeader profileLink={igResponseData.profile_url} />
            <div className="cards-wrapper">
                {cardDetails.map((card, index) => (
                    <DetailCard
                        key={index}
                        label={card.label}
                        value={card.value}
                        loading={card.loading}
                        icon={card.icon}
                        appendingString={card.appendingString || ''}
                        avgRate={card.avgRate || false}
                    />
                ))}
            </div>
            <Post loading={loading} igResponseData={igResponseData} />
        </div>
    );
}
