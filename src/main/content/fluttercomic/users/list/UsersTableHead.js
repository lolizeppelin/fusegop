import React from 'react';
import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Checkbox,
    Tooltip,
    withStyles
} from '@material-ui/core';

const rows = [
    {
        id            : 'id',
        numeric       : true,
        disablePadding: false,
        label         : '用户ID',
        sort          : true
    },
    {
        id            : 'name',
        numeric       : false,
        disablePadding: false,
        label         : '用户名',
        sort          : true
    },
    {
        id            : 'coins',
        numeric       : true,
        disablePadding: false,
        label         : '购币',
        sort          : true
    },
    {
        id            : 'gifts',
        numeric       : true,
        disablePadding: false,
        label         : '赠币',
        sort          : true
    },
    {
        id            : 'status',
        numeric       : false,
        disablePadding: false,
        label         : '状态',
        sort          : true
    },
    {
        id            : 'regtime',
        numeric       : false,
        disablePadding: false,
        label         : '注册时间',
        sort          : true
    },
];

const styles = theme => ({
    root                : {},
    actionsButtonWrapper: {
        position      : 'absolute',
        top           : 0,
        left          : 64,
        width         : 64,
        height        : 63,
        zIndex        : 10,
        background    : theme.palette.background.paper,
        alignItems    : 'center',
        display       : 'flex',
        justifyContent: 'center'
    }
});

class UsersTableHead extends React.Component {
    state = {
        selectedOrdersMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };


    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount} = this.props;

        return (
            <TableHead>
                <TableRow className="h-64">
                    <TableCell padding="checkbox" className="relative">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                // numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                {row.sort && (
                                    <Tooltip
                                        title="Sort"
                                        // placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                        placement="bottom-end"
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={this.createSortHandler(row.id)}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                )}
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles, {withTheme: true})(UsersTableHead);
