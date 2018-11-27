import React from 'react';
import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Checkbox,
    Tooltip,
    IconButton,
    Icon,
    Menu,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    withStyles
} from '@material-ui/core';

const rows = [
    {
        id            : 'cid',
        numeric       : false,
        disablePadding: false,
        label         : '漫画ID',
        sort          : false
    },
    {
        id            : 'name',
        numeric       : false,
        disablePadding: false,
        label         : '漫画名',
        sort          : false
    },
    {
        id            : 'author',
        numeric       : false,
        disablePadding: false,
        label         : '作者',
        sort          : true
    },
    {
        id            : 'type',
        numeric       : false,
        disablePadding: false,
        label         : '类型',
        sort          : true
    },
    {
        id            : 'region',
        numeric       : false,
        disablePadding: false,
        label         : '地区',
        sort          : true
    },
    {
        id            : 'point',
        numeric       : false,
        disablePadding: false,
        label         : '收费章节',
        sort          : true
    },
    {
        id            : 'last',
        numeric       : false,
        disablePadding: false,
        label         : '最后章节',
        sort          : false
    },
    {
        id            : 'lastup',
        numeric       : false,
        disablePadding: false,
        label         : '最近更新',
        sort          : true
    }
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

class ComicsTableHead extends React.Component {
    state = {
        selectedActionsMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedActionsMenu = (event) => {
        this.setState({selectedActionsMenu: event.currentTarget});
    };

    closeSelectedActionsMenu = () => {
        this.setState({selectedActionsMenu: null});
    };

    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes} = this.props;
        const {selectedActionsMenu} = this.state;

        return (
            <TableHead>
                <TableRow className="h-64">
                    <TableCell padding="checkbox" className="relative">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                        {numSelected > 0 && (
                            <div className={classes.actionsButtonWrapper}>
                                <IconButton
                                    aria-owns={selectedActionsMenu ? 'selectedActionsMenu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelectedActionsMenu}
                                >
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selectedActionsMenu"
                                    anchorEl={selectedActionsMenu}
                                    open={Boolean(selectedActionsMenu)}
                                    onClose={this.closeSelectedActionsMenu}
                                >
                                    <MenuList>
                                        <MenuItem
                                            onClick={() => {
                                                this.closeSelectedActionsMenu();
                                            }}
                                        >
                                            <ListItemIcon className={classes.icon}>
                                                <Icon>delete</Icon>
                                            </ListItemIcon>
                                            <ListItemText inset primary="Remove"/>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>
                        )}
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                // numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    // placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    placement="bottom-end"
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={row.sort ? this.createSortHandler(row.id) : null}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ComicsTableHead);
