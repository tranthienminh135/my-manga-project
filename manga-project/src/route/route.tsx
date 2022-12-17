import { lazy } from 'react';
import { UrlFeApp } from '../core/constants/common';
import { RouteObject, useRoutes } from 'react-router-dom';
import HomeComponent from '../ui/login/home-component';

const Login = lazy(() => import('../ui/login/login'));
const MainApp = lazy(() => import('../components/main-app-component'));
const DashBoard = lazy(() => import('../ui/dashboard/dashboard'));
const Company = lazy(() => import('../ui/company/company'));

const listRouter: RouteObject[] = [
    {
        path: UrlFeApp.MAIN_APP,
        element: <MainApp />,
        children: [
            {
                path: UrlFeApp.DASH_BOARD,
                element: <DashBoard />,
            },
            {
                path: UrlFeApp.COMPANY,
                element: <Company />,
            },
        ],
    },
    {
        path: '/',
        element: <HomeComponent />,
        children: [],
    },
];
export default function RenderRouter() {
    let element = useRoutes(listRouter);
    return element;
}
