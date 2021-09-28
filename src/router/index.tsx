import {lazy} from 'react';
import {RouteProps} from 'react-router';

export interface CustomizeRouteProps extends RouteProps {
    key: string;
    path?: string;
    exact?: boolean;
    component?: React.FC;
}

export const routerConfig: CustomizeRouteProps[] = [
    {
        key: 'three',
        path: '/three',
        component: lazy(() => import(/* webpackChunkName: 'Three' */ '../views/Three'))
    }
];
