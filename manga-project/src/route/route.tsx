import { lazy } from 'react';
import { UrlFeApp } from '../core/constants/common';
import { RouteObject, useRoutes } from 'react-router-dom';
import HomeComponent from '../ui/home/home-component';

const DashBoard = lazy(() => import('../ui/dashboard/dashboard'));

const listRouter: RouteObject[] = [
    {
        path: '/',
        element: <HomeComponent />,
        children: [
            {
                path: UrlFeApp.DASH_BOARD,
                element: <DashBoard />,
            },
        ],
    },
];
export default function RenderRouter() {
    let element = useRoutes(listRouter);
    return element;
}
