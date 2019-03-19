import React, {Component} from 'react';
import {withStyles, CircularProgress} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {FuseUtils, FuseAnimate} from '@fuse';

import {ROUTEPREFIX} from "../config";

import { indexLogs } from './http'

import SortableTables from '../components/sortAbleTables';
import green from "@material-ui/core/colors/green";
import {bindActionCreators} from "redux/index";
import connect from "react-redux/es/connect/connect";


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
        id            : 'id',
        numeric       : true,
        disablePadding: true,
        label         : '日志主键',
        sort          : false
    },
    {
        id            : 'IP',
        numeric       : false,
        disablePadding: false,
        label         : '访问IP',
        sort          : false
    },
    {
        id            : 'atime',
        numeric       : false,
        disablePadding: false,
        label         : '时间',
        sort          : false
    },
    {
        id            : 'path',
        numeric       : false,
        disablePadding: false,
        label         : '接口',
        sort          : false
    },
    {
        id            : 'code',
        numeric       : false,
        disablePadding: false,
        label         : 'HTTP码',
        sort          : false
    },
    {
        id            : '大小',
        numeric       : true,
        disablePadding: false,
        label         : '返回大小',
        sort          : false
    },
    {
        id            : 'host',
        numeric       : true,
        disablePadding: false,
        label         : '域名',
        sort          : false
    },
];


class LogsTable extends Component {
    state = {
        logs       : [],
        loading      : true,
    };



    componentDidMount()
    {
        // this.props.getOrders();
        indexLogs(
            this.props.user.token,
            (result) => {
                this.setState({ logs: result.data, loading: false })
            },
            (error) => {
                this.setState({ logs: [], loading:false })
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
            rawData={this.state.logs}
            url={`${ROUTEPREFIX}/logs`}
            switch={
                (orderBy, o) => {
                    return o[orderBy];
                }
            }

        />
    };


}



function mapStateToProps({auth})
{
    return {
        user: auth.user
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        showMessage: FuseActions.showMessage,
    }, dispatch);
}



export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(LogsTable)));
