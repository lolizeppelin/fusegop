import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {ExampleConfig} from 'main/content/example/ExampleConfig';

import FlutterComicRoutes from 'main/content/fluttercomic/routes';
import PageRoutes from 'main/content/pages/routes';

const routeConfigs = [
    ...FlutterComicRoutes,
    ...PageRoutes,
    ExampleConfig
];

console.log(routeConfigs);

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
