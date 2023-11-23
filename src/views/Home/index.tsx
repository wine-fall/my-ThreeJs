import React from 'react';
import {routerConfig, CustomizeRouteProps} from '@/router';
import {useNavigate, NavigateFunction} from 'react-router';
import styles from './index.module.less';

const HomeBtn: React.FC<{
    idx: number,
    router: CustomizeRouteProps,
    navigate: NavigateFunction
}> = (props) => {
    const {idx, router, navigate} = props;

    const handleClickBtn = (router: CustomizeRouteProps) => () => {
        navigate(router.path);
    };

    return (
        <div
            className={styles.linkWrapper}
            onClick={handleClickBtn(router)}
        >
            <span className={styles.linkNo}>{idx.toString().padStart(3, '0')}</span>
            <span className={styles.linkName}>{router.key}</span>
        </div>
    );
};

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.topContainer}>
            <div className={styles.linkContainer}>
                {routerConfig.map((router, idx) => {
                    if (router.key === 'home') {
                        return null;
                    }
                    return (
                        <HomeBtn
                            key={router.key}
                            idx={idx}
                            router={router}
                            navigate={navigate}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Home;