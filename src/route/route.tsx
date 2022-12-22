import { lazy } from 'react';
import { UrlFeApp } from '../core/constants/common';
import { RouteObject, useRoutes } from 'react-router-dom';
import NavComponent from '../ui/app-bar/nav-component';
import Home from '../ui/home/home-component';

const DashBoard = lazy(() => import('../ui/dashboard/dashboard'));
const Content = lazy(() => import('../ui/content/content-component'));

const listRouter: RouteObject[] = [
    {
        path: '/',
        element: <NavComponent />,
        children: [
            {
                path: UrlFeApp.HOME,
                element: <Home />,
            },
            {
                path: UrlFeApp.DASH_BOARD,
                element: <DashBoard />,
            },
            {
                path: UrlFeApp.CONTENT,
                element: <Content />,
            },
        ],
    },
];
export default function RenderRouter() {
    let element = useRoutes(listRouter);
    return element;
}
