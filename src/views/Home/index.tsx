import React from 'react';
import {routerConfig, CustomizeRouteProps} from '@/router';
import {useHistory} from 'react-router';

const Home: React.FC = () => {

    const history = useHistory();

    const handleClickBtn = (router: CustomizeRouteProps) => () => {
        history.push(router.path);
    };

    return (
        <div>{routerConfig.map((router) => {
            if (router.key === 'home') {
                return null;
            }
            return <button key={router.key} onClick={handleClickBtn(router)}>{router.key}</button>;
        })}</div>
    );
};

export default Home;