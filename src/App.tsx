import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate} from 'react-router-dom';
import {routerConfig, CustomizeRouteProps, HomeRoute} from './router';
import styles from './App.module.less';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.Dashboard}>
            <div className={styles.backBtn} onClick={() => {
                navigate(-1);
            }}>go back</div>
            <Outlet />
        </div>
    );
};

function App() {
    return (
        <Suspense fallback={null}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={<Navigate to="/home" replace/>}
                    />
                    <Route
                        {...HomeRoute}
                        element={React.createElement(HomeRoute.component)}
                    />
                    <Route path="/" element={<Dashboard />}>
                        {
                            routerConfig.map(
                                (router: CustomizeRouteProps) => {
                                    return (
                                        <Route
                                            {...router}
                                            element={React.createElement(router.component)}
                                            key={router.key}
                                        ></Route>
                                    );
                                }
                            )
                        }
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
