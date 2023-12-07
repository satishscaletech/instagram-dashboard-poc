import { ReactNode } from 'react';
import './style.scss';
import Skeleton from 'react-loading-skeleton';

interface ICard {
    children: ReactNode;
    className?: string;
    loading?: boolean;
}

export default function Card({ children, className = '', loading = false }: ICard) {
    return (
        <div className={`card ${className}`}>
            {loading ? <Skeleton height={'180px'} /> : children}
        </div>
    );
}
