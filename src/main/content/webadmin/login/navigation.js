export const WebAdminNavigationConfig = [
    {
        'id'      : 'webadmin',
        'title'   : '日志后台管理',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'webadmin-log-group',
                'title': '日志管理',
                'type' : 'item',
                'icon' : 'people',
                'url'  : '/gop/webadmin/logs',
            },
            {
                'id'   : 'webadmin-keyword-group',
                'title': '关键字管理',
                'type' : 'item',
                'icon' : 'photo',
                'url'  : '/gop/webadmin/keywords',
            },
        ]
    },
    {'id'  : 'divider-1', 'type': 'divider'},
];
