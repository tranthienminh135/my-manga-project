import { lazy } from 'react';
import { UrlFeApp } from '../core/constants/common';
import { RouteObject, useRoutes } from 'react-router-dom';
import NavComponent from '../ui/app-bar/nav-component';
import Home from '../ui/home/home-component';
import Page404NotFound from '../ui/error/page-404-component';

const DashBoard = lazy(() => import('../ui/dashboard/dashboard'));
const Content = lazy(() => import('../ui/content/content-component'));
const VideoDetail = lazy(() => import('../ui/video/video-detail'));

const listRouter: RouteObject[] = [
    {
        path: UrlFeApp.DEFAULT,
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
            {
                path: `${UrlFeApp.DETAIL}/:index`,
                element: <VideoDetail />,
            },
        ],
    },
    {
        path: UrlFeApp.ALL,
        element: <Page404NotFound />,
    },
];
export default function RenderRouter() {
    let element = useRoutes(listRouter);
    return element;
}
