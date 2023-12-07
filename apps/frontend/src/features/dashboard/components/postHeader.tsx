import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { auth } from 'firebase.config';
import { IconCheckCircle, IconExport, IconInstagramColouredFilled, IconLogOut } from 'shared/icons';
interface IProps {
    profileLink: string;
}
function PostHeader(props: IProps) {
    const { profileLink } = props;

    const navigate = useNavigate();

    const logOut = () => {
        auth.signOut()
            .then(() => {
                navigate('/dashboard');
                toast.success('You have been logged out successfully.');
                setTimeout(() => {
                    navigate('/');
                }, 500);
                // Sign-out successful.
            })
            .catch((error) => {
                console.log('error:', error);
                // An error happened.
            });
    };

    return (
        <div className="dashboard-header">
            <div className="heading">
                <IconInstagramColouredFilled />
                <h3>Instagram Overview</h3>
                <a href={profileLink} target="_blank" rel="noreferrer">
                    <IconExport />
                </a>
            </div>
            <div className="update-info-wrapper">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <IconCheckCircle />
                    <div>
                        <h5>DATA VERIFIED BY MEDIAKITS</h5>
                        <h5>Last updated: {dayjs().format('DD/M/YYYY')}</h5>
                    </div>
                </div>
                <div
                    onClick={logOut}
                    style={{ cursor: 'pointer', display: 'flex' }}
                    title="Log Out"
                >
                    <IconLogOut />
                </div>
            </div>
        </div>
    );
}

export default PostHeader;
