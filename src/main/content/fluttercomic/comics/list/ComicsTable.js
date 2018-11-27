import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {withStyles, Table, TableBody, TableCell,
    TablePagination, TableRow, Checkbox,
    Button, Icon
} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import {FuseScrollbars, FuseUtils, FuseAnimate} from '@fuse';
import connect from 'react-redux/es/connect/connect';
import ComicsTableHead from './ComicsTableHead';
import _ from 'lodash';

import * as FlutterComicActions from "store/actions";

import {ROUTEPREFIX} from "../../config";

import { indexComics } from '../http'



const styles = theme => ({
    root               : {},
    addButton          : {
        position: 'absolute',
        top  : 31,
        left    : 170,
        zIndex  : 999
    }
});

class ComicsTable extends Component {
    state = {
        order      : 'asc',
        orderBy    : 'id',
        selected   : [],
        data       : [],
        comics      : [],
        page       : 0,
        rowsPerPage: 10,
    };



    componentDidMount()
    {
        // this.props.getOrders();
        indexComics(
            (result) => {
                console.log(result);
                this.setState({ comics: result.data })
            },
            (error) => {
                this.props.showMessage({ message: error.message });
                this.setState({ comics: [] })
            });
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.state.comics, prevState.comics) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.state.comics, this.props.searchText);
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
            this.setState(state => ({selected: this.state.data.map(n => n.cid)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (item) => {
        this.props.history.push(`${ROUTEPREFIX}/comics/${item.cid}`);
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
        const {classes} = this.props;
        const {order, orderBy, selected, rowsPerPage, page, data} = this.state;

        return (
            <div className="w-full flex flex-col">

                <FuseAnimate animation="transition.expandIn" delay={600}>
                    <Button
                        variant="fab"
                        color="secondary"
                        aria-label="add"
                        className={classes.addButton}
                        component={Link} to={`${ROUTEPREFIX}/comic`}
                    >
                        <Icon>add</Icon>
                    </Button>
                </FuseAnimate>

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <ComicsTableHead
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
                                            case 'cid': return parseInt(o.cid, 10);
                                            case 'name': return o.name;
                                            case 'author': return o.author;
                                            case 'type': return o.type;
                                            case 'region': return o.region;
                                            case 'point': return parseInt(o.cid, 10);
                                            case 'last': return parseInt(o.last, 10);
                                            case 'lastup': return parseInt(o.lastup, 10);
                                            default: return o[orderBy];
                                        }
                                    }
                                ], [order])
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(n => {
                                        const isSelected = this.isSelected(n.cid);
                                        return (
                                            <TableRow
                                                className="h-64 cursor-pointer"
                                                hover
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.cid}
                                                selected={isSelected}
                                                onClick={event => this.handleClick(n)}
                                            >
                                                <TableCell className="w-48" padding="checkbox">
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onClick={event => event.stopPropagation()}
                                                        onChange={event => this.handleCheck(event, n.cid)}
                                                    />
                                                </TableCell>

                                                <TableCell component="th" scope="row">{n.cid}</TableCell>
                                                <TableCell component="th" scope="row">{n.name}</TableCell>
                                                <TableCell component="th" scope="row">{n.author}</TableCell>
                                                <TableCell component="th" scope="row">{n.type}</TableCell>
                                                <TableCell component="th" scope="row">{n.region}</TableCell>
                                                <TableCell component="th" scope="row">{n.point}</TableCell>
                                                <TableCell component="th" scope="row">{n.last}</TableCell>
                                                <TableCell component="th" scope="row">{n.lastup}</TableCell>

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


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ComicsTable)));
