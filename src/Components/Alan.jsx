import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import alanBtn from '@alan-ai/alan-sdk-web';

const useAlan = () => {
    useEffect(() => {
        alanBtn({
            key: '89d9952effdf8d7eb04fd4d7ae24ae7d2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command }) => {
                if (command === 'logout') {
                    localStorage.clear();
                    window.location.href = '/';
                    window.location.reload();
                }
            }
        });
    }, []);
};

export default useAlan;