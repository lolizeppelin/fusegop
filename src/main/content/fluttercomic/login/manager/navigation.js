export const FlutterComicManagerNavigationConfig = [
    {
        'id'      : 'fluttercomic',
        'title'   : 'Flutter漫画后台',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'fluttercomic-user-group',
                'title': '用户管理',
                'type' : 'item',
                'icon' : 'people',
                'url'  : '/gop/fluttercomic/users',
            },
            {
                'id'   : 'fluttercomic-comic-group',
                'title': '漫画管理',
                'type' : 'item',
                'icon' : 'photo',
                'url'  : '/gop/fluttercomic/comics',
            },
            {
                'id'   : 'fluttercomic-order-group',
                'title': '订单管理',
                'type' : 'collapse',
                'icon' : 'shopping_cart',
                'children': [
                    {
                        'id'   : 'fluttercomic-orders',
                        'title': '预备订单',
                        'type' : 'item',
                        'url'  : '/gop/example'
                    },
                    {
                        'id'   : 'fluttercomic-recharges',
                        'title': '已支付票据',
                        'type' : 'item',
                        'url'  : '/gop/example'
                    },
                    {
                        'id'   : 'fluttercomic-duplicate-recharges',
                        'title': '重复票据',
                        'type' : 'item',
                        'url'  : '/gop/example'
                    },

                ]
            },
            {
                'id'   : 'fluttercomic-statistics-group',
                'title': '统计',
                'type' : 'collapse',
                'icon' : 'dashboard',
                'children': []
            }
        ]
    },
    {'id'  : 'divider-1', 'type': 'divider'},
];
