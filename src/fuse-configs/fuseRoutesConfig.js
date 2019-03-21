import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';

import FlutterComicRoutes from 'main/content/fluttercomic/routes';
import WebadminRoutes from 'main/content/webadmin/routes';
import PageRoutes from 'main/content/pages/routes';

const routeConfigs = [
    ...FlutterComicRoutes,
    ...WebadminRoutes,
    ...PageRoutes,

];


export const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/gop/pages/errors/error-404"/>
        // component: () => <Redirect to="/gop/pages/errors/error-404"/>
    },
    {
        component: () => <Redirect to="/gop/pages/errors/error-404"/>
    }
];
