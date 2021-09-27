import {lazy} from 'react';

export interface CustomizeRouteProps {
    key: string;
    path?: string;
    exact?: boolean;
    component?: any;
}

export const routerConfig: CustomizeRouteProps[] = [
    {
        key: 'three',
        path: '/three',
        component: lazy(() => import(/* webpackChunkName: 'Three' */ '../views/Three'))
    }
];
