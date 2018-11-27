const GOPCONFIG = window.GOPCONFIG;


const children = GOPCONFIG.endpoints.map(
    (e) => {
        return {
            'id'   : `fuse-endpoint-${e}`,
            'title': e,
            'type' : 'item',
            'icon' : 'apps',
            'url'  : `/gop/pages/endpoints/${e}`,
        };
    }

);

children.push(
    {
        'id'   : 'icons',
        'title': 'Icons',
        'type' : 'item',
        'icon' : 'photo',
        'url'  : '/ui/icons'
    }
);


export const fuseNavigationConfig = [
    {
        'id'      : 'FuseMain',
        'title'   : 'Fuse框架',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': children
    },
];
