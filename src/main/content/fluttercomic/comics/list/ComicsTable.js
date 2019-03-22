import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {withStyles, CircularProgress} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {FuseUtils, FuseAnimate} from '@fuse';
import connect from 'react-redux/es/connect/connect';

import * as FuseActions from "store/actions";

import {ROUTEPREFIX} from "../../config";

import { indexComics } from '../http'

import SortableTables from '../../components/sortAbleTables';
import green from "@material-ui/core/colors/green";


const styles = theme => ({
    root          : {
        display   : 'flex',
        alignItems: 'center'
    },
    fabProgress   : {
        color   : green[500],
        position: 'absolute',
        top     : '50%',
        left    : '50%',
        zIndex  : 1
    },
});

const columns = [
    {
        id            : 'cid',
        numeric       : true,
        disablePadding: true,
        label         : '漫画ID',
        sort          : true
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
        numeric       : true,
        disablePadding: false,
        label         : '最后章节',
        sort          : false
    },
    {
        id            : 'lastup',
        numeric       : true,
        disablePadding: false,
        label         : '最近更新',
        sort          : true
    }
];


class ComicsTable extends Component {
    state = {
        comics       : [],
        loading      : true,
    };



    componentDidMount()
    {
        // this.props.getOrders();
        indexComics(
            (result) => {
                this.setState({ comics: result.data, loading: false })
            },
            (error) => {
                this.props.showMessage({ message: error.message });
                this.setState({ comics: [], loading:false })
            });
    }


    render() {

        const {classes} = this.props;

        if (this.state.loading) return (
            <div className={classes.root}>
                <CircularProgress size={68} className={classes.fabProgress}/>
            </div>
        );


        return <SortableTables
            columns={columns}
            // selectable
            order={"asc"}
            orderBy={columns[0].id}
            rowsPerPage={100}
            rawData={this.state.comics}
            url={`${ROUTEPREFIX}/comics`}
            switch={
                (orderBy, o) => {
                    switch ( orderBy )
                    {
                        case 'cid': return parseInt(o.cid, 10);
                        case 'name': return o.name;
                        case 'author': return o.author;
                        case 'type': return o.type;
                        case 'region': return o.region;
                        case 'point': return parseInt(o.point, 10);
                        case 'last': return parseInt(o.last, 10);
                        case 'lastup': return parseInt(o.lastup, 10);
                        default: return o[orderBy];
                    }
                }
            }


        />
    };

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
        showMessage: FuseActions.showMessage,
    }, dispatch);
}


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ComicsTable)));
