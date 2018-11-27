import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {withStyles, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {FuseScrollbars, FuseUtils} from '@fuse';
import connect from 'react-redux/es/connect/connect';
import UsersTableHead from './UsersTableHead';
import _ from 'lodash';

import * as FlutterComic from "store/actions";

import {ROUTEPREFIX} from "../../config";
import { indexUsers } from '../http'

import reducer from "../../store/reducers";
import withReducer from 'store/withReducer';




const styles = theme => ({
    root: {}
});

class UsersTable extends Component {
    state = {
        order      : 'asc',
        orderBy    : 'id',
        selected   : [],
        data       : [],
        users      : [],
        page       : 0,
        rowsPerPage: 10,
    };



    componentDidMount()
    {
        // this.props.getOrders();
        indexUsers(this.props.manager.token,
            (result) => {
                console.log(result);
                this.setState({ users: result.data })
            },
            (error) => {
                this.props.showMessage({ message: error.message });
                this.setState({ users: [] })
            });
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.state.users, prevState.users) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.state.users, this.props.searchText);
            this.setState({data})
        }
    }

    getFilteredArray = (data, searchText) => {
        if ( searchText.length === 0 )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, searchText);
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if ( this.state.orderBy === property && this.state.order === 'desc' )
        {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy
        });
    };

    handleSelectAllClick = event => {
        if ( event.target.checked )
        {
            this.setState(state => ({selected: this.state.data.map(n => n.uid)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (item) => {
        this.props.history.push(`${ROUTEPREFIX}/users/${item.uid}`);
        // this.props.history.goBack();
    };

    handleCheck = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if ( selectedIndex === -1 )
        {
            newSelected = newSelected.concat(selected, id);
        }
        else if ( selectedIndex === 0 )
        {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if ( selectedIndex === selected.length - 1 )
        {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if ( selectedIndex > 0 )
        {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data} = this.state;

        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <UsersTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />

                        <TableBody>
                            {
                                _.orderBy(data, [
                                    (o) => {
                                        switch ( orderBy )
                                        {
                                            case 'id':
                                            {
                                                return parseInt(o.uid, 10);
                                            }
                                            case 'name':
                                            {
                                                return o.name
                                            }
                                            case 'coins':
                                            {
                                                return parseInt(o.coins, 10);
                                            }
                                            case 'gifts':
                                            {
                                                return parseInt(o.gifts, 10);
                                            }
                                            case 'status':
                                            {
                                                return parseInt(o.status, 10);
                                            }

                                            default:
                                            {
                                                return o[orderBy];
                                            }
                                        }
                                    }
                                ], [order])
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(n => {
                                        const isSelected = this.isSelected(n.uid);
                                        return (
                                            <TableRow
                                                className="h-64 cursor-pointer"
                                                hover
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.uid}
                                                selected={isSelected}
                                                onClick={event => this.handleClick(n)}
                                            >
                                                <TableCell className="w-48" padding="checkbox">
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onClick={event => event.stopPropagation()}
                                                        onChange={event => this.handleCheck(event, n.uid)}
                                                    />
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {n.uid}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {n.name}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    <span>$</span>
                                                    {n.coins}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {n.gifts}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {n.status}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {n.regtime}
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
}





function mapStateToProps({auth, searchComponents})
{
    return {
        manager     : auth.user,
        searchText  : searchComponents.search.text,
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        showMessage: FlutterComic.showMessage,
    }, dispatch);
}


export default withReducer('searchComponents', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersTable))));
