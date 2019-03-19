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

class SortTableHead extends React.Component {
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
                    {
                        this.props.selectable &&
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
                    }
                    {this.props.columns.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement="bottom-end"
                                    // placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={column.sort ? this.createSortHandler(column.id) : null}
                                    >
                                        {column.label}
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

export default withStyles(styles, {withTheme: true})(SortTableHead);
