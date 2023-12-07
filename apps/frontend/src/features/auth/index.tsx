import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// plugins
import axios from 'axios';
import Lottie from 'react-lottie';
import toast from 'react-hot-toast';
// utils
import { API_BASE_URL } from 'shared/constants';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from 'firebase.config';
// assets
import * as animationData from 'assets/lottieAnimations/instagramLogoBouncing.json';
import './style.scss';

const defaultAuthOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

// This is the loading page while we authenticating with facebook and firebase.
export default function Auth() {
    const navigate = useNavigate();

    const { state = {} } = useLocation();

    const handleAuthFail = () => {
        toast.error('Something went wrong. Please try again.', { id: 'fail' });
        setTimeout(() => {
            navigate('/');
        }, 500);
    };

    useEffect(() => {
        // Redirect url sends hashed parameters with access token of facebook and other parameters like expire time.
        if (state && 'token' in state && state.token) {
            const params: any = {};
            // Splitting above hashed string parameters and creating an object to pass into login API.
            state.token.split('&').forEach((element: string) => {
                const [key, value] = element.split('=');
                params[key as string] = value;
            });
            login(params); // params will be { access_token: <access_token>, etc...}
        } else {
            handleAuthFail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    // Storing the access token and other parameters coming from facebook into db and generating firebase custom token.
    const login = (params: any) => {
        axios
            .post(`${API_BASE_URL}/api/v1/auth/instagram/authorize`, params)
            .then((res) => {
                const { firebase_auth_token } = res.data.data;
                firebaseLogin(firebase_auth_token, params);
            })
            .catch((err) => {
                console.log('err', err);
                setTimeout(() => {
                    handleAuthFail();
                }, 500);
            });
    };

    // Logging into firebase using custom token
    const firebaseLogin = (token: string, params: any) => {
        signInWithCustomToken(auth, token)
            .then((userCredential: any) => {
                const dataParams = {
                    ...params,
                    long_lived_token: '',
                    id_token: userCredential._tokenResponse.idToken,
                };
                const user = userCredential.user;
                if (user) {
                    register(dataParams, user)
                } else {
                    handleAuthFail()
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                console.log('errorCode:', errorCode);
                const errorMessage = error.message;
                console.log('errorMessage:', errorMessage);
                handleAuthFail()
            });
    };

    // Now registering the logged in user and fetching latest data from instagram.
    const register = (params: any, user: any) => {
        axios
            .post(`${API_BASE_URL}/api/v1/auth/instagram/register`, params)
            .then(() => {
                navigate('/dashboard', {
                    state: { userId: user.uid }
                });
            })
            .catch((err) => {
                console.log('err', err);
                handleAuthFail()
            });
    };

    return (
        <div className="loading-wrapper">
            <Lottie options={defaultAuthOptions} height={400} width={400} />
        </div>
    );
}
