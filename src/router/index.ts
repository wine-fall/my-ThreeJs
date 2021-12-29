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
        component: lazy(() => import('../views/Three'))
    },
    {
        key: 'carExhibition',
        path: '/carExhibition',
        component: lazy(() => import('../views/RotateSphere'))
    },
    {
        key: 'drawRectangle',
        path: '/webgl/drawRectangle',
        component: lazy(() => import('../views/WegGl/RrawRectangle'))
    },
    {
        key: 'hellowCavans',
        path: '/webgl/hellowCavans',
        component: lazy(() => import('../views/WegGl/HellowCavans'))
    },
    {
        key: 'hellowPoint1',
        path: '/webgl/hellowPoint1',
        component: lazy(() => import('../views/WegGl/HellowPoint1'))
    },
    {
        key: 'hellowPoint2',
        path: '/webgl/hellowPoint2',
        component: lazy(() => import('../views/WegGl/HellowPoint2'))
    },
    {
        key: 'clickedPoints',
        path: '/webgl/clickedPoints',
        component: lazy(() => import('../views/WegGl/ClickedPoints'))
    }
];
