import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoadingRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 800);

        return () => clearTimeout(timer);
    }, [navigate]);

    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
}
export default LoadingRedirect;