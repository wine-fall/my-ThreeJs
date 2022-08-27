import {lazy} from 'react';
import {RouteProps} from 'react-router';

export interface CustomizeRouteProps extends RouteProps {
    key: string;
    path: string;
    component: React.FC;
    exact?: boolean;
}

export const routerConfig: CustomizeRouteProps[] = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('../views/Home'))
    },
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
        component: lazy(() => import('../views/WegGl/DrawRectangle'))
    },
    {
        key: 'hellowCavans',
        path: '/webgl/hellowCavans',
        component: lazy(() => import('../views/WegGl/HellowCanvas'))
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
    },
    {
        key: 'coloredPoints',
        path: '/webgl/coloredPoints',
        component: lazy(() => import('../views/WegGl/ColoredPoints'))
    },
    {
        key: 'multiPoints',
        path: '/webgl/multiPoints',
        component: lazy(() => import('../views/WegGl/MultiPoints'))
    },
    {
        key: 'circleProgress',
        path: '/canvas/circleProgress',
        component: lazy(() => import('../views/Canvas/CircleProgress'))
    },
    {
        key: 'shadowDog',
        path: '/canvas/shadowDog',
        component: lazy(() => import('../views/Canvas/ShadowDog'))
    },
    {
        key: 'parallaxBackgrounds',
        path: '/canvas/parallaxBackgrounds',
        component: lazy(() => import('../views/Canvas/ParallaxBackgrounds'))
    },
    {
        key: 'enemies',
        path: '/canvas/enemies',
        component: lazy(() => import('../views/Canvas/Enemies'))
    },
    {
        key: 'collision',
        path: '/canvas/collision',
        component: lazy(() => import('../views/Canvas/Explosion'))
    },
    {
        key: 'shootGame',
        path: '/canvas/shootGame',
        component: lazy(() => import('../views/Canvas/ShootGame'))
    },
    {
        key: 'sideScrollerGame',
        path: '/canvas/sideScrollerGame',
        component: lazy(() => import('../views/Canvas/SideScrollerGame'))
    }
];
