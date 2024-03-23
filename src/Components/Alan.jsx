import { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

const useAlan = (handleFoundGenre) => {
    useEffect(() => {
        alanBtn({
            key: 'a2e30ce08222ef4aac4b4ef40bbcd5ca2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, genres, genreOrCategory }) => {
                if (command === 'chooseGenre') {
                    const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());
                    console.log(foundGenre);
                    if (foundGenre) {
                        // window.location.href = '/';
                        handleFoundGenre(foundGenre.name);
                    }
                }
                else if (command === 'logout') {
                    localStorage.clear();
                    window.location.href = '/';
                    window.location.reload();
                }
            }
        });
    }, []);
};

export default useAlan;