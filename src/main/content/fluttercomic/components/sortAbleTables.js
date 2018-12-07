import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {withStyles, Table, TableBody, TableCell,
    TablePagination, TableRow, Checkbox,
} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {FuseScrollbars, FuseAnimate} from '@fuse';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';

import * as FlutterComicActions from "store/actions";

import SortTableHead from './sortTableHead'
import searchUtil from './searchUtil'

const styles = theme => ({
    root               : {},
});



class SortableTables extends Component {

    state = {
        order       : this.props.order,
        orderBy     : this.props.orderBy,
        selected    : [],
        data        : Object.assign(this.props.rawData, []),
        page        : 0,
        rowsPerPage : this.props.rowsPerPage,
        primaryKey  : this.props.columns[0].id,
    };



    componentDidUpdate(prevProps, prevState)
    {
        if (!_.isEqual(this.props.searchText, prevProps.searchText))
        {
            const data = this.getFilteredArray(this.props.rawData, this.props.searchText);
            this.setState({data})
        }
    }

    getFilteredArray = (data, searchText) => {
        if ( searchText.length === 0 )
        {
            return data;
        }
        return searchUtil.filterArrayByString(data, searchText);
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
            this.setState(state => ({selected: this.state.data.map(n => n[this.state.primaryKey])}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (item) => {
        this.props.history.push(`${this.props.url}/${item[this.state.primaryKey]}`);
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

                    <Table className="min-w-xl" aria-labelledby="tableTitle" selectable={this.props.selectable}>
                        <SortTableHead
                            selectable={this.props.selectable}
                            columns={this.props.columns}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />

                        <TableBody>
                            {
                                _.orderBy(data, [(o) => this.props.switch(orderBy, o)], [order])
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(n => {
                                        const isSelected = this.isSelected(n[this.state.primaryKey]);
                                        return (
                                            <TableRow
                                                className="h-64 cursor-pointer"
                                                hover
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n[this.state.primaryKey]}
                                                selected={isSelected}
                                                onClick={event => this.handleClick(n)}
                                            >
                                                {
                                                    this.props.selectable &&
                                                    <TableCell className="w-48" padding="checkbox">
                                                        <Checkbox
                                                            checked={isSelected}
                                                            onClick={event => event.stopPropagation()}
                                                            onChange={event => this.handleCheck(event, n[this.state.primaryKey])}
                                                        />
                                                    </TableCell>
                                                }
                                                {this.props.columns.map(
                                                    (c, index) =>
                                                        <TableCell
                                                            key={`cell-${index}`}
                                                            numeric={c.numeric}
                                                            padding={c.disablePadding ? 'none' : 'default'}
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {c.view ? c.view(n[c.id]) : n[c.id]}
                                                        </TableCell>
                                                )}
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


function mapStateToProps({flutterComic})
{
    return {
        searchText  : flutterComic.search.text,
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        showMessage: FlutterComicActions.showMessage,
    }, dispatch);
}


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(SortableTables)));
