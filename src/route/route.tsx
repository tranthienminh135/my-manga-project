import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { RouteObject, useRoutes } from 'react-router-dom';
import { ADMIN_PATH, UrlFeApp } from '../core/constants/common';
import { getUserGoogleInfo } from '../core/redux/slice/user-slice';
import NavComponent from '../ui/app-bar/nav-component';
import Page404NotFound from '../ui/error/page-404-component';
import Home from '../ui/home/home-component';

const DashBoard = lazy(() => import('../ui/dashboard/dashboard'));
const Content = lazy(() => import('../ui/content/content-component'));
const VideoDetail = lazy(() => import('../ui/video/video-detail'));

const currentListRouter: RouteObject[] = [
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

let listRouter: RouteObject[] = [
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
    const userInfo = useSelector(getUserGoogleInfo);

    if (userInfo.isAdmin) {
        listRouter.map((data: any, index: number) => {
            if (index === 0) {
                data.children = [...data.children, ...ADMIN_PATH];
            }
            return data;
        });
    } else {
        listRouter = currentListRouter;
    }

    let element = useRoutes(listRouter);
    return element;
}
